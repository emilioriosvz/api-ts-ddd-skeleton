import { Video } from "../../../../../../src/Contexts/Backoffice/Videos/domain/Video";
import FileVideoRepository from "../../../../../../src/Contexts/Backoffice/Videos/infraestructure/FileVideoRepository";

describe("FileVideoRepository", () => {
  it("should save a video", async () => {
    const videoMock: Video = new Video({
      id: "10",
      name: "video10",
      duration: "10",
    });
    const repository = new FileVideoRepository();
    await repository.save(videoMock);
    const video = await repository.search(videoMock.id);
    expect(video).toEqual(videoMock);
  });

  it("should return null if video is not found", async () => {
    const repository = new FileVideoRepository();
    const video = await repository.search("100");
    expect(video).toBeNull();
  });
});
