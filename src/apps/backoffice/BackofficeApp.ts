import { DomainEvent } from "../../Contexts/Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../Contexts/Shared/domain/DomainEventSubscriber";
import { Server } from "./server";
import inMemoryAsyncEventBus from "../../Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus";
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
    inMemoryAsyncEventBus.addSubscribers(this.findSubscribers());
  }

  private findSubscribers(): Array<DomainEventSubscriber<DomainEvent>> {
    const domainEventSubscribers =
      DomainEventSubscribers.fromDomainEventSubscribers().items;
    return domainEventSubscribers;
  }
}
