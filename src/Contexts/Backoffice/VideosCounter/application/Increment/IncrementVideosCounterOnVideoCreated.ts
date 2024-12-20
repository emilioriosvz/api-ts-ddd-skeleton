import { DomainEventClass } from "../../../../Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../../Shared/domain/DomainEventSubscriber";
import { VideoCreatedDomainEvent } from "../../../Videos/domain/VideoCreatedDomainEvent";
import { VideosCounterIncrementer } from "./VideosCounterIncrementer";

export class IncrementVideosCounterOnVideoCreated
  implements DomainEventSubscriber<VideoCreatedDomainEvent>
{
  constructor(private incrementer: VideosCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [VideoCreatedDomainEvent];
  }

  async on(domainEvent: VideoCreatedDomainEvent) {
    await this.incrementer.run(domainEvent.aggregateId);
  }
}
