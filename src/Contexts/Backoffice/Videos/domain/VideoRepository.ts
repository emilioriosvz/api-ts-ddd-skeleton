import { Video } from "./Video";

export interface VideoRepository {
  save(video: Video): Promise<void>;
  search(id: string): Promise<Video | null>;
}
