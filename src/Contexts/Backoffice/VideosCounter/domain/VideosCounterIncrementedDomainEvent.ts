import { DomainEvent } from "../../../Shared/domain/DomainEvent";

type VideosCounterIncrementedAttributes = { total: number };

export class VideosCounterIncrementedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "videos_counter.incremented";
  readonly total: number;

  constructor(data: {
    aggregateId: string;
    total: number;
    eventId?: string;
    occurredOn?: Date;
  }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({
      eventName: VideosCounterIncrementedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.total = data.total;
  }

  toPrimitives() {
    return {
      total: this.total,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: VideosCounterIncrementedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new VideosCounterIncrementedDomainEvent({
      aggregateId,
      total: attributes.total,
      eventId,
      occurredOn,
    });
  }
}
