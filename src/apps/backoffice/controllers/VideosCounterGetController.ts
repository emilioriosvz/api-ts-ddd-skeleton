import { Request, Response } from "express";
import { Controller } from "./Controller";
import httpStatus from "http-status-codes";
import { VideosCounterFinder } from "../../../Contexts/Backoffice/VideosCounter/application/Find/VideosCounterFinder";
import { VideosCounterNotExist } from "../../../Contexts/Backoffice/VideosCounter/domain/VideosCounterNotExist";

export class VideosCounterGetController implements Controller {
  constructor(private coursesCounterFinder: VideosCounterFinder) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.coursesCounterFinder.run();

      res.json({ total: count });
    } catch (e) {
      console.log(e);
      if (e instanceof VideosCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      } else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
