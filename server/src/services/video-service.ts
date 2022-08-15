
import { getInfo } from "ytdl-core";

export class VideoService {
  async getVideoInfo(videoId: string) {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const videoInfo = await getInfo(url);

    const thumbnailUrl = videoInfo.videoDetails.thumbnails.pop();

    const videosFiltered = videoInfo.formats.filter((video) => {
      const labelsAccepted =
      video.quality === 'medium' ||
      video.quality === 'large' ||
      video.quality === 'hd1080' ||
      video.quality === 'hd720' ||
      video.quality === 'small' ||
      video.quality === 'tiny'

    const isMP4Video = video.mimeType?.includes('video/mp4')

      if (isMP4Video && labelsAccepted) {
        return video;
      }});

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
      thumbnailUrl: thumbnailUrl?.url,
      durationInSeconds: videoInfo.videoDetails.lengthSeconds,
      formats: formatInfo,
    };

    return videoResult;
  }
}
