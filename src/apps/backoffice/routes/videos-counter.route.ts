import { Request, Response, Router } from "express";
import { VideosCounterGetController } from "../controllers/VideosCounterGetController";
import { VideosCounterFinder } from "../../../Contexts/Backoffice/VideosCounter/application/Find/VideosCounterFinder";
import { InMemoryVideosCounterRepository } from "../../../Contexts/Backoffice/VideosCounter/infrastructure/InMemoryVideosCounterRepository";
import { inMemoryDatabaseClient } from "../../../Contexts/Backoffice/Shared/infrastructure/persistence/InMemory/InMemoryDatabaseClient";

export const register = (router: Router) => {
  const repository = new InMemoryVideosCounterRepository(
    inMemoryDatabaseClient,
  );
  const videosCounterFinder = new VideosCounterFinder(repository);
  const videosCounterGetController = new VideosCounterGetController(
    videosCounterFinder,
  );
  router.get("/videos-counter", (req: Request, res: Response) =>
    videosCounterGetController.run(req, res),
  );
};
