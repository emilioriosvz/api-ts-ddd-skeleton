import { DomainEvent } from "../../Contexts/Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../Contexts/Shared/domain/DomainEventSubscriber";
import { EventBus } from "../../Contexts/Shared/domain/EventBus";
import { Server } from "./server";
import { InMemoryAsyncEventBus } from "../../Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus";
import { DomainEventSubscribers } from "../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers";

export class BackofficeApp {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.PORT ?? "5139";
    this.server = new Server(port);
    await this.configureEventBus();
    return this.server.listen();
  }

  get httpServer(): Server["httpServer"] | undefined {
    return this.server?.getHTTPServer();
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = new InMemoryAsyncEventBus() as EventBus;
    eventBus.addSubscribers(this.findSubscribers());
  }

  private findSubscribers(): Array<DomainEventSubscriber<DomainEvent>> {
    const domainEventSubscribers =
      DomainEventSubscribers.fromDomainEventSubscribers().items;
    return domainEventSubscribers;
  }
}
