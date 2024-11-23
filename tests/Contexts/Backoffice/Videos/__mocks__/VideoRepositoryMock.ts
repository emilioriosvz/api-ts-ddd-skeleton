import { Video } from "../../../../../src/Contexts/Backoffice/Videos/domain/Video";
import { VideoRepository } from "../../../../../src/Contexts/Backoffice/Videos/domain/VideoRepository";

export class VideoRepositoryMock implements VideoRepository {
  private readonly mockSave = jest.fn();
  private readonly mockSearch = jest.fn();

  async save(video: Video): Promise<void> {
    await this.mockSave(video);
  }

  async search(id: string): Promise<Video | null> {
    const video = new Video(id, "some-name", "some-duration");

    return await this.mockSearch(video);
  }

  assertLastSavedVideoIs(expected: Video): void {
    const mock = this.mockSave.mock;
    const lastSavedVideo = (mock.calls[mock.calls.length - 1] as Video[])[0];
    expect(lastSavedVideo).toBeInstanceOf(Video);
    expect(lastSavedVideo.id).toEqual(expected.id);
  }

  assertSaveHasBeenCalled(video: Video): void {
    expect(this.mockSave).toHaveBeenCalledWith(video);
  }
}
