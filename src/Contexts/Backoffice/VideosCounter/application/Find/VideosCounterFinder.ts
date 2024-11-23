import { VideosCounterNotExist } from "../../domain/VideosCounterNotExist";
import { VideosCounterRepository } from "../../domain/VideosCounterRepository";

export class VideosCounterFinder {
  constructor(private repository: VideosCounterRepository) {}

  async run() {
    const counter = await this.repository.search();
    if (!counter) {
      throw new VideosCounterNotExist();
    }

    return counter.total.value;
  }
}
