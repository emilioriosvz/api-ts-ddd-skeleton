import path from "path";
import fs from "fs";
import { Video } from "../domain/Video";
import { VideoRepository } from "../domain/VideoRepository";

export default class MemoryVideoRepository implements VideoRepository {
  async save(video: Video): Promise<void> {
    fs.writeFileSync(
      path.resolve(__dirname, "../../../../../", ".tmp", `${video.id}.json`),
      JSON.stringify(video),
    );
  }

  search(id: string): Promise<Video | null> {
    const filePath = path.resolve(
      __dirname,
      "../../../../../",
      ".tmp",
      `${id}.json`,
    );
    try {
      const file = fs.readFileSync(filePath).toString();
      const video = JSON.parse(file);
      return Promise.resolve(new Video(video));
    } catch {
      return Promise.resolve(null);
    }
  }
}
