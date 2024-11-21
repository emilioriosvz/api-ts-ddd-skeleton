import { Request, Response, Router } from "express";
import { VideoPutController } from "../controllers/VideoPutController";
import { VideoCreator } from "../../../Contexts/Backoffice/Videos/application/VideoCreator";
import MemoryVideoRepository from "../../../Contexts/Backoffice/Videos/infraestructure/FileVideoRepository";

export const register = (router: Router): void => {
  const repository = new MemoryVideoRepository();
  const videoCreator = new VideoCreator(repository);
  const videoPutController = new VideoPutController(videoCreator);
  router.put("/videos/:id", (req: Request, res: Response) =>
    videoPutController.run(req, res),
  );
};
