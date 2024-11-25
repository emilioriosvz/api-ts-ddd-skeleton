import { VideosCounterRepository } from "../domain/VideosCounterRepository";
import { VideosCounter } from "../domain/VideosCounter";
import { VideosCounterId } from "../domain/VideosCounterId";
import { VideosCounterTotal } from "../domain/VideosCounterTotal";
import { InMemoryDatabaseClient } from "../../Shared/infrastructure/persistence/InMemory/InMemoryDatabaseClient";

export class InMemoryVideosCounterRepository
  implements VideosCounterRepository
{
  private readonly COLLECTION_NAME = "videos_counter";

  constructor(private readonly client: InMemoryDatabaseClient) {}

  async search(): Promise<VideosCounter> {
    const counters = await this.client.search(this.COLLECTION_NAME, {});
    if (counters.length === 0) {
      return new VideosCounter(
        VideosCounterId.random(),
        new VideosCounterTotal(0),
        [],
      );
    }

    return VideosCounter.fromPrimitives(
      counters[0] as { id: string; total: number; existingVideos: string[] },
    );
  }

  async save(counter: VideosCounter): Promise<void> {
    const existingCounters = await this.client.search(this.COLLECTION_NAME, {});

    if (existingCounters.length === 0) {
      await this.client.save(this.COLLECTION_NAME, counter.toPrimitives());
    } else {
      await this.client.update(
        this.COLLECTION_NAME,
        { id: counter.id.value },
        counter.toPrimitives(),
      );
    }
  }
}
