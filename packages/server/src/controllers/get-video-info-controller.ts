import { Request, Response } from "express";
import { VideoService } from "../services/video-service";

export class GetVideoInfoController {
  constructor(private readonly videoService: VideoService) {}
  async handle(req: Request, res: Response) {
    try {
      const { url } = req.params;

      if (!url) {
        return res.status(400).send("Missing url");
      }

      const videoInfo = await this.videoService.getVideoInfo(url);

      return res.status(200).json(videoInfo);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
