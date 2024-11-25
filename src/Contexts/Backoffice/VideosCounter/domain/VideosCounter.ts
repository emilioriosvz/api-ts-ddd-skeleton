import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { VideosCounterTotal } from "./VideosCounterTotal";
import { VideosCounterId } from "./VideosCounterId";
import { VideosCounterIncrementedDomainEvent } from "./VideosCounterIncrementedDomainEvent";
import { Uuid } from "../../../Shared/domain/value-object/Uuid";

export class VideosCounter extends AggregateRoot {
  readonly id: VideosCounterId;
  private _total: VideosCounterTotal;
  readonly existingVideos: Array<string>;

  constructor(
    id: VideosCounterId,
    total: VideosCounterTotal,
    existingVideos?: Array<string>,
  ) {
    super();
    this.id = id;
    this._total = total;
    this.existingVideos = existingVideos || [];
  }

  public get total(): VideosCounterTotal {
    return this._total;
  }

  static initialize(id: Uuid): VideosCounter {
    return new VideosCounter(id, VideosCounterTotal.initialize());
  }

  increment(videoId: string) {
    this._total = this.total.increment();
    this.existingVideos.push(videoId);
    this.record(
      new VideosCounterIncrementedDomainEvent({
        aggregateId: this.id.value,
        total: this.total.value,
      }),
    );
  }

  hasIncremented(videoId: string): boolean {
    const exists = this.existingVideos.find((entry) => entry === videoId);
    return exists !== undefined;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      existingVideos: this.existingVideos.map((videoId) => videoId),
    };
  }

  static fromPrimitives(data: {
    id: string;
    total: number;
    existingVideos: string[];
  }): VideosCounter {
    return new VideosCounter(
      new VideosCounterId(data.id),
      new VideosCounterTotal(data.total),
      data.existingVideos.map((entry) => entry),
    );
  }
}
