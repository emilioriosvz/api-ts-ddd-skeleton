import { Request, Response, Router } from "express";
import { VideoPutController } from "../controllers/VideoPutController";

export const register = (router: Router): void => {
  const videoPutController = new VideoPutController();
  router.put("/videos/:id", (req: Request, res: Response) =>
    videoPutController.run(req, res),
  );
};
