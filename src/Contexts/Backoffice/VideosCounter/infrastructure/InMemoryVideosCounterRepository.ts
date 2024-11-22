import { VideosCounterRepository } from "../domain/VideosCounterRepository";
import { VideosCounter } from "../domain/VideosCounter";
import { VideosCounterId } from "../domain/VideosCounterId";
import { VideosCounterTotal } from "../domain/VideosCounterTotal";

export class InMemoryVideosCounterRepository
  implements VideosCounterRepository
{
  private counter: VideosCounter;
  constructor() {
    this.counter = new VideosCounter(
      VideosCounterId.random(),
      new VideosCounterTotal(0),
      [],
    );
  }

  async search(): Promise<VideosCounter> {
    return this.counter;
  }

  async save(counter: VideosCounter): Promise<void> {
    this.counter = counter;
  }
}
