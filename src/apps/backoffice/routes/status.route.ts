import { Request, Response, Router } from "express";
import StatusController from "../controllers/StatusGetController";

export const register = (router: Router): void => {
  const controller = new StatusController();
  router.get("/status", (req: Request, res: Response) => {
    controller.run(req, res);
  });
};
