import { Video } from "../domain/Video";
import { VideoRepository } from "../domain/VideoRepository";

export class VideoCreator {
  private readonly repository: VideoRepository;

  constructor(repository: VideoRepository) {
    this.repository = repository;
  }

  async run(id: string, name: string, duration: string): Promise<void> {
    const video = new Video({ id, name, duration });

    return this.repository.save(video);
  }
}
