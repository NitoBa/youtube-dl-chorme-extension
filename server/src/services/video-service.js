"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const ytdl_core_1 = require("ytdl-core");
class VideoService {
    getVideoInfo(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://www.youtube.com/watch?v=${videoId}`;
            const videoInfo = yield (0, ytdl_core_1.getInfo)(url);
            const thumbnailUrl = videoInfo.videoDetails.thumbnails.pop();
            const videosFiltered = videoInfo.formats.filter((video) => {
                var _a;
                const labelsAccepted = video.quality === 'medium' ||
                    video.quality === 'large' ||
                    video.quality === 'hd1080' ||
                    video.quality === 'hd720' ||
                    video.quality === 'small' ||
                    video.quality === 'tiny';
                const isMP4Video = (_a = video.mimeType) === null || _a === void 0 ? void 0 : _a.includes('video/mp4');
                if (isMP4Video && labelsAccepted) {
                    return video;
                }
            });
            const formatInfo = videosFiltered.map((video) => {
                return {
                    quality: video.qualityLabel,
                    videoSize: video.bitrate,
                    url: video.url,
                    idTag: video.itag,
                };
            });
            const videoResult = {
                title: videoInfo.videoDetails.title,
                thumbnailUrl: thumbnailUrl === null || thumbnailUrl === void 0 ? void 0 : thumbnailUrl.url,
                durationInSeconds: videoInfo.videoDetails.lengthSeconds,
                formats: formatInfo,
            };
            return videoResult;
        });
    }
}
exports.VideoService = VideoService;
