import { Request, Response, Router } from "express";
import { VideoPutController } from "../controllers/VideoPutController";
import { VideoCreator } from "../../../Contexts/Backoffice/Videos/application/VideoCreator";
import MemoryVideoRepository from "../../../Contexts/Backoffice/Videos/infraestructure/FileVideoRepository";
import { body } from "express-validator";
import { validateReqSchema } from ".";

export const register = (router: Router): void => {
  const requestSchema = [
    body("id").exists().isString(),
    body("name").exists().isString(),
    body("duration").exists().isString(),
  ];

  const repository = new MemoryVideoRepository();
  const videoCreator = new VideoCreator(repository);
  const videoPutController = new VideoPutController(videoCreator);
  router.put(
    "/videos/:id",
    requestSchema,
    validateReqSchema,
    (req: Request, res: Response) => videoPutController.run(req, res),
  );
};
