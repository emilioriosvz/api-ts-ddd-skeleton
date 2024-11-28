import { VideosCounter } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounter";
import { VideosCounterIncrementedDomainEvent } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounterIncrementedDomainEvent";
import { DomainEvent } from "../../../../../src/Contexts/Shared/domain/DomainEvent";
import { VideosCounterMother } from "./VideoCounterMother";

export class VideosCounterIncrementedDomainEventMother {
  static create(): DomainEvent {
    return VideosCounterIncrementedDomainEventMother.fromVideoCounter(
      VideosCounterMother.random(),
    );
  }

  static fromVideoCounter(
    counter: VideosCounter,
  ): VideosCounterIncrementedDomainEvent {
    return new VideosCounterIncrementedDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value,
    });
  }
}
