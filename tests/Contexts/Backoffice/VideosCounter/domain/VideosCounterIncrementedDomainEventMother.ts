import { VideosCounter } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounter";
import { VideosCounterIncrementedDomainEvent } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounterIncrementedDomainEvent";

export class VideosCounterIncrementedDomainEventMother {
  static fromVideoCounter(
    counter: VideosCounter,
  ): VideosCounterIncrementedDomainEvent {
    return new VideosCounterIncrementedDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value,
    });
  }
}
