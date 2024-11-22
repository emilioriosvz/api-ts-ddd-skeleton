import { EventBus } from "../../../Shared/domain/EventBus";
import { Video } from "../domain/Video";
import { VideoRepository } from "../domain/VideoRepository";

export class VideoCreator {
  private readonly repository: VideoRepository;

  constructor(
    repository: VideoRepository,
    private eventBus: EventBus,
  ) {
    this.repository = repository;
  }

  async run(id: string, name: string, duration: string): Promise<void> {
    const video = Video.create(id, name, duration);
    await this.repository.save(video);
    const event = video.pullDomainEvents();
    await this.eventBus.publish(event);
  }
}
