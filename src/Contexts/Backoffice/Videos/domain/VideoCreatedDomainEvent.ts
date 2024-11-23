import { DomainEvent } from "../../../Shared/domain/DomainEvent";

type CreateVideoDomainEventAttributes = {
  readonly duration: string;
  readonly name: string;
};

export class VideoCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "video.created";

  readonly duration: string;
  readonly name: string;

  constructor({
    aggregateId,
    name,
    duration,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: VideoCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.duration = duration;
    this.name = name;
  }

  toPrimitives(): CreateVideoDomainEventAttributes {
    const { name, duration } = this;
    return {
      name,
      duration,
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CreateVideoDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new VideoCreatedDomainEvent({
      aggregateId,
      duration: attributes.duration,
      name: attributes.name,
      eventId,
      occurredOn,
    });
  }
}
