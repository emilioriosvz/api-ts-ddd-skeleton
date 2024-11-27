import { VideosCounterIncrementedDomainEventMother } from "../../domain/VideosCounterIncrementedDomainEventMother";
import { VideosCounterMother } from "../../domain/VideoCounterMother";
import { VideosCounterRepositoryMock } from "../../__mocks__/VideosCounterRepositoryMock";
import { VideosCounterIncrementer } from "../../../../../../src/Contexts/Backoffice/VideosCounter/application/Increment/VideosCounterIncrementer";
import { VideosCounter } from "../../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounter";
import EventBusMock from "../../../Videos/__mocks__/EventBusMock";
import { VideoIdMother } from "../../../Videos/domain/VideoIdMother";

describe("VideosCounter Incrementer", () => {
  let incrementer: VideosCounterIncrementer;
  let eventBus: EventBusMock;
  let repository: VideosCounterRepositoryMock;

  beforeEach(() => {
    eventBus = new EventBusMock();
    repository = new VideosCounterRepositoryMock();
    incrementer = new VideosCounterIncrementer(repository, eventBus);
  });

  it("should initialize a new counter", async () => {
    const videoId = VideoIdMother.random();
    const counter = VideosCounterMother.withOne(videoId);

    await incrementer.run(videoId);

    repository.assertLastVideosCounterSaved(counter);
  });

  it("should increment an existing counter", async () => {
    const existingCounter = VideosCounterMother.random();
    repository.returnOnSearch(existingCounter);
    const videoId = VideoIdMother.random();
    const expected = VideosCounter.fromPrimitives(
      existingCounter.toPrimitives(),
    );
    expected.increment(videoId);
    const expectedEvent =
      VideosCounterIncrementedDomainEventMother.fromVideoCounter(expected);

    await incrementer.run(videoId);

    repository.assertLastVideosCounterSaved(expected);
    eventBus.assertLastPublishedEventIs(expectedEvent);
  });

  it("should not increment an already incremented counter", async () => {
    const existingCounter = VideosCounterMother.random();
    repository.returnOnSearch(existingCounter);
    const videoId = existingCounter.existingVideos[0];

    await incrementer.run(videoId);

    repository.assertNotSave();
  });
});
