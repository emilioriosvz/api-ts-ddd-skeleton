import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { VideoCreatedDomainEvent } from "./VideoCreatedDomainEvent";

export class Video extends AggregateRoot {
  readonly id: string;
  readonly name: string;
  readonly duration: string;

  constructor(id: string, name: string, duration: string) {
    super();
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

  static create(id: string, name: string, duration: string): Video {
    const video = new Video(id, name, duration);

    video.record(
      new VideoCreatedDomainEvent({
        aggregateId: video.id,
        duration: video.duration,
        name: video.name,
      }),
    );

    return video;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    duration: string;
  }): Video {
    return new Video(plainData.id, plainData.name, plainData.duration);
  }

  toPrimitives(): {
    id: string;
    name: string;
    duration: string;
  } {
    return {
      id: this.id,
      name: this.name,
      duration: this.duration,
    };
  }
}
