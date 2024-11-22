import { EventBus } from "../../../../Shared/domain/EventBus";
import { VideosCounterRepository } from "../../domain/VideosCounterRepository";
import { VideosCounter } from "../../domain/VideosCounter";
import { VideosCounterId } from "../../domain/VideosCounterId";

export class VideosCounterIncrementer {
  constructor(
    private repository: VideosCounterRepository,
    private bus: EventBus,
  ) {}

  async run(videoId: string) {
    const counter =
      (await this.repository.search()) || this.initializeCounter();

    counter.increment(videoId);

    await this.repository.save(counter);
    await this.bus.publish(counter.pullDomainEvents());
  }

  private initializeCounter(): VideosCounter {
    return VideosCounter.initialize(VideosCounterId.random());
  }
}
