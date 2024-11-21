import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { Controller } from "./Controller";
import { VideoCreator } from "../../../Contexts/Backoffice/Videos/application/VideoCreator";

export class VideoPutController implements Controller {
  constructor(private videoCreator: VideoCreator) {}
  async run(req: Request, res: Response): Promise<void> {
    const { id, name, duration } = req.body;
    await this.videoCreator.run(id, name, duration);
    res.status(httpStatus.CREATED).send();
  }
}
