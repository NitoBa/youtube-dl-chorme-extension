import { Router } from "express";
import { GetVideoInfoController } from "./controllers/get-video-info-controller";
import { VideoService } from "./services/video-service";

const router = Router();

const service = new VideoService();
const controller = new GetVideoInfoController(service);

router.get("/video/:url", (req, res) => controller.handle(req, res));
router.get("/", (req, res) => res.json({ message: "video downloader is online" }));

export { router };
