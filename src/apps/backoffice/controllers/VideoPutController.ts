import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { Controller } from "./Controller";

export class VideoPutController implements Controller {
  run(req: Request, res: Response): void {
    res.status(httpStatus.CREATED).send();
  }
}
