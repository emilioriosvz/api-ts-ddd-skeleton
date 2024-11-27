import { VideosCounterMother } from "../../domain/VideoCounterMother";
import { VideosCounterRepositoryMock } from "../../__mocks__/VideosCounterRepositoryMock";
import { VideosCounterFinder } from "../../../../../../src/Contexts/Backoffice/VideosCounter/application/Find/VideosCounterFinder";
import { VideosCounterNotExist } from "../../../../../../src/Contexts/Backoffice/VideosCounter/domain/VideosCounterNotExist";

describe("VideoCounterFinder", () => {
  let repository: VideosCounterRepositoryMock;

  beforeEach(() => {
    repository = new VideosCounterRepositoryMock();
  });

  it("should find an existing videos counter", async () => {
    const counter = VideosCounterMother.random();
    repository.returnOnSearch(counter);
    const finder = new VideosCounterFinder(repository);

    const response = await finder.run();

    repository.assertSearch();
    expect(counter.total.value).toEqual(response);
  });

  it("should throw an exception when videos counter does not exists", async () => {
    const finder = new VideosCounterFinder(repository);

    await expect(finder.run()).rejects.toBeInstanceOf(VideosCounterNotExist);
  });
});
