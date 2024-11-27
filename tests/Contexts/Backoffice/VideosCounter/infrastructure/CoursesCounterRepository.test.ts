import { inMemoryDatabaseClient } from "../../../../../src/Contexts/Backoffice/Shared/infrastructure/persistence/InMemory/InMemoryDatabaseClient";
import { InMemoryVideosCounterRepository } from "../../../../../src/Contexts/Backoffice/VideosCounter/infrastructure/InMemoryVideosCounterRepository";
import { VideosCounterMother } from "../domain/VideoCounterMother";

describe("VideosCounterRepository", () => {
  let repository: InMemoryVideosCounterRepository;

  beforeEach(async () => {
    repository = new InMemoryVideosCounterRepository(inMemoryDatabaseClient);
    await inMemoryDatabaseClient.delete("videos_counter", {});
  });

  describe("#save", () => {
    it("should save a videos counter", async () => {
      const counter = VideosCounterMother.random();
      await repository.save(counter);

      const found = await repository.search();
      expect(found).toEqual(counter);
    });
  });

  describe("#search", () => {
    it("should return an existing counter", async () => {
      const expectedCounter = VideosCounterMother.random();
      await repository.save(expectedCounter);

      const counter = await repository.search();
      expect(counter).toEqual(expectedCounter);
    });

    it("should return null if there is no counter", async () => {
      const counter = await repository.search();
      expect(counter?.total?.value).toBeFalsy();
    });
  });
});
