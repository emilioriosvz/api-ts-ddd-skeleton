import { Request, Response, Router } from "express";
import { VideoPutController } from "../controllers/VideoPutController";
import { VideoCreator } from "../../../Contexts/Backoffice/Videos/application/VideoCreator";
import InMemoryVideoRepository from "../../../Contexts/Backoffice/Videos/infraestructure/FileVideoRepository";
import { body } from "express-validator";
import { validateReqSchema } from ".";
import inMemoryAsyncEventBus from "../../../Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus";
import { inMemoryDatabaseClient } from "../../../Contexts/Backoffice/Shared/infrastructure/persistence/InMemory/InMemoryDatabaseClient";

export const register = (router: Router): void => {
  const requestSchema = [
    body("id").exists().isString(),
    body("name").exists().isString(),
    body("duration").exists().isString(),
  ];

  const repository = new InMemoryVideoRepository(inMemoryDatabaseClient);
  const videoCreator = new VideoCreator(repository, inMemoryAsyncEventBus);
  const videoPutController = new VideoPutController(videoCreator);

  router.put(
    "/videos/:id",
    requestSchema,
    validateReqSchema,
    (req: Request, res: Response) => videoPutController.run(req, res),
  );
};
