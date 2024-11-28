import { DomainEventSubscribers } from "../infrastructure/EventBus/DomainEventSubscribers";
import { DomainEvent } from "./DomainEvent";
// import { DomainEventSubscriber } from "./DomainEventSubscriber";

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: DomainEventSubscribers): void; // FIXME: circular dependency
}
