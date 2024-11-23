import { Video } from "../../../../../src/Contexts/Backoffice/Videos/domain/Video";
import { VideoCreatedDomainEvent } from "../../../../../src/Contexts/Backoffice/Videos/domain/VideoCreatedDomainEvent";

export class VideoCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    duration,
    name,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }): VideoCreatedDomainEvent {
    return new VideoCreatedDomainEvent({
      aggregateId,
      eventId,
      duration,
      name,
      occurredOn,
    });
  }

  static fromVideo(video: Video): VideoCreatedDomainEvent {
    return new VideoCreatedDomainEvent({
      aggregateId: video.id,
      duration: video.duration,
      name: video.name,
    });
  }
}
