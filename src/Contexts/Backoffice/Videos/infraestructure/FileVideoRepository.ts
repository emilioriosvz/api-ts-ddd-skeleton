import { Video } from "../domain/Video";
import { VideoRepository } from "../domain/VideoRepository";
import { InMemoryDatabaseClient } from "../../Shared/infrastructure/persistence/InMemory/InMemoryDatabaseClient";

export default class InMemoryVideoRepository implements VideoRepository {
  private readonly COLLECTION_NAME = "videos";

  constructor(private readonly client: InMemoryDatabaseClient) {}

  async save(video: Video): Promise<void> {
    await this.client.save(this.COLLECTION_NAME, {
      id: video.id,
      name: video.name,
      duration: video.duration,
    });
  }

  async search(id: string): Promise<Video | null> {
    try {
      const results = await this.client.search(this.COLLECTION_NAME, { id });

      if (!results.length) {
        return null;
      }

      const video = results[0] as {
        id: string;
        name: string;
        duration: string;
      };
      return new Video(video.id, video.name, video.duration);
    } catch {
      return null;
    }
  }
}
