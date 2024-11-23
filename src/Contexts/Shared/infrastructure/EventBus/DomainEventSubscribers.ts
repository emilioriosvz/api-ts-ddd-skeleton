import { IncrementVideosCounterOnVideoCreated } from "../../../Backoffice/VideosCounter/application/Increment/IncrementVideosCounterOnVideoCreated";
import { VideosCounterIncrementer } from "../../../Backoffice/VideosCounter/application/Increment/VideosCounterIncrementer";
import { InMemoryVideosCounterRepository } from "../../../Backoffice/VideosCounter/infrastructure/InMemoryVideosCounterRepository";
import { DomainEvent } from "../../domain/DomainEvent";
import { DomainEventSubscriber } from "../../domain/DomainEventSubscriber";
import inMemoryAsyncEventBus from "./InMemory/InMemoryAsyncEventBus";

export class DomainEventSubscribers {
  public items: Array<DomainEventSubscriber<DomainEvent>>;

  private constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.items = subscribers;
  }

  static fromDomainEventSubscribers(): DomainEventSubscribers {
    const videosCounterIncrementer = new VideosCounterIncrementer(
      new InMemoryVideosCounterRepository(),
      inMemoryAsyncEventBus,
    );
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [
      new IncrementVideosCounterOnVideoCreated(videosCounterIncrementer),
    ];

    return new DomainEventSubscribers(subscribers);
  }
}
