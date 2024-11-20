import { Video } from "../../../../../src/Contexts/Backoffice/Videos/domain/Video";
import { VideoRepository } from "../../../../../src/Contexts/Backoffice/Videos/domain/VideoRepository";

export class VideoRepositoryMock implements VideoRepository {
  private readonly mockSave = jest.fn();

  async save(video: Video): Promise<void> {
    await this.mockSave(video);
  }

  assertLastSavedVideoIs(expected: Video): void {
    const mock = this.mockSave.mock;
    const lastSavedVideo = (mock.calls[mock.calls.length - 1] as Video[])[0];
    expect(lastSavedVideo).toBeInstanceOf(Video);
    expect(lastSavedVideo.id).toEqual(expected.id);
  }
}
