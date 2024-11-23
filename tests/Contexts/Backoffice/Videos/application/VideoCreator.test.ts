import { VideoCreator } from "../../../../../src/Contexts/Backoffice/Videos/application/VideoCreator";
import { Video } from "../../../../../src/Contexts/Backoffice/Videos/domain/Video";
import EventBusMock from "../__mocks__/EventBusMock";
import { VideoRepositoryMock } from "../__mocks__/VideoRepositoryMock";
import { VideoCreatedDomainEventMother } from "../domain/VideoCreatedDomainEventMother";

let repository: VideoRepositoryMock;
let creator: VideoCreator;
let eventBus: EventBusMock;
beforeEach(() => {
  repository = new VideoRepositoryMock();
  eventBus = new EventBusMock();
  creator = new VideoCreator(repository, eventBus);
});

describe("VideoCreator", () => {
  it("should create a valid video", async () => {
    const id = "some-id";
    const name = "some-name";
    const duration = "some-duration";
    const video = new Video(id, name, duration);

    const domainEvent = VideoCreatedDomainEventMother.fromVideo(video);

    await creator.run(id, name, duration);

    repository.assertLastSavedVideoIs(video);
    repository.assertSaveHasBeenCalled(video);
    eventBus.assertLastPublishedEventIs(domainEvent);
  });
});
