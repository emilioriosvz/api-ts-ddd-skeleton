import { VideosCounter } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounter";
import { VideosCounterRepository } from "../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounterRepository";
import { Nullable } from "../../../../../src/Contexts/Shared/domain/Nullable";

export class VideosCounterRepositoryMock implements VideosCounterRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private videosCounter: Nullable<VideosCounter> = null;

  async search(): Promise<Nullable<VideosCounter>> {
    this.mockSearch();
    return this.videosCounter;
  }

  async save(counter: VideosCounter): Promise<void> {
    this.mockSave(counter);
  }

  returnOnSearch(counter: VideosCounter) {
    this.videosCounter = counter;
  }

  assertSearch() {
    expect(this.mockSearch).toHaveBeenCalled();
  }

  assertNotSave() {
    expect(this.mockSave).toHaveBeenCalledTimes(0);
  }

  assertLastVideosCounterSaved(counter: VideosCounter) {
    const mock = this.mockSave.mock;
    const lastVideosCounter = mock.calls[
      mock.calls.length - 1
    ][0] as VideosCounter;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: id1, ...counterPrimitives } = counter.toPrimitives();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: id2, ...lastSavedPrimitives } =
      lastVideosCounter.toPrimitives();

    expect(lastVideosCounter).toBeInstanceOf(VideosCounter);
    expect(lastSavedPrimitives).toEqual(counterPrimitives);
  }
}
