import { VideoCreator } from "../../../../../src/Contexts/Backoffice/Videos/application/VideoCreator";
import { Video } from "../../../../../src/Contexts/Backoffice/Videos/domain/Video";
import { VideoRepositoryMock } from "../__mocks__/VideoRepositoryMock";

let repository: VideoRepositoryMock;
let creator: VideoCreator;

beforeEach(() => {
  repository = new VideoRepositoryMock();
  creator = new VideoCreator(repository);
});

describe("VideoCreator", () => {
  it("should create a valid video", async () => {
    const id = "some-id";
    const name = "some-name";
    const duration = "some-duration";

    const video = new Video({ id, name, duration });

    await creator.run(id, name, duration);

    repository.assertLastSavedVideoIs(video);
    repository.assertSaveHasBeenCalled({ id, name, duration });
  });
});
