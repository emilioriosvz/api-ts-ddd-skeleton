import { DomainEvent } from "../../../../../src/Contexts/Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../../../src/Contexts/Shared/domain/DomainEventSubscriber";
import { EventBus } from "../../../../../src/Contexts/Shared/domain/EventBus";

export default class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  async publish(events: DomainEvent[]) {
    this.publishSpy(events);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0][0];

    const expected = this.getDataFromDomainEvent(expectedEvent);
    const published = this.getDataFromDomainEvent(lastPublishedEvent);

    expect(expected).toMatchObject(published);
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { eventId, occurredOn, ...attributes } = event;

    return attributes;
  }
}
