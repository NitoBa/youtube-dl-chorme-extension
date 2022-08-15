import axios from 'axios'
import { VideoInfo } from '../types/video'
import { VideoDetail } from '../types/video-detail'

const BASE_URL = 'https://www.youtube.com/watch?v='

export async function getVideoInfoFromYoutubePage(
  videoId: string,
): Promise<VideoDetail> {
  try {
    const videoInfo = await extractVideoInfoFromYoutubePage(videoId)

    const thumbnailUrl = videoInfo.videoDetails.thumbnail.thumbnails.pop()?.url

    const acceptedVideoFormats = filterVideoByFormats(videoInfo)

    const videoDetail = {
      videoId,
      title: videoInfo.videoDetails.title,
      durationInSeconds: +videoInfo.videoDetails.lengthSeconds,
      formats: acceptedVideoFormats,
      thumbnail: thumbnailUrl,
    } as VideoDetail

    console.log(videoDetail)
    return videoDetail
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get video info.')
  }
}

const extractVideoInfoFromYoutubePage = async (videoId: string) => {
  try {
    const videoIdRegex = /^[\w_-]+$/
    if (!videoIdRegex.test(videoId)) {
      throw new Error('Invalid videoId.')
    }

    const response = await axios.get(`${BASE_URL}${videoId}`, {
      responseType: 'text',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36',
      },
    })

    const htmlPageData = response.data as string

    const ytInitialPlayerResponsePatter =
      /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+meta|<\/script|\n)/

    const videoInfoFromHTMLPage = htmlPageData.match(
      ytInitialPlayerResponsePatter,
    )

    if (!videoInfoFromHTMLPage || !videoInfoFromHTMLPage[1]) {
      throw new Error('Failed to get video info.')
    }

    console.log(JSON.parse(videoInfoFromHTMLPage[1]))

    return JSON.parse(videoInfoFromHTMLPage[1]) as VideoInfo
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get video info.')
  }
}

const filterVideoByFormats = (video: VideoInfo) => {
  // eslint-disable-next-line array-callback-return
  const formatVideos = video.streamingData.adaptiveFormats.filter((video) => {
    const labelsAccepted =
      video.quality === 'medium' ||
      video.quality === 'large' ||
      video.quality === 'hd1080' ||
      video.quality === 'hd720' ||
      video.quality === 'small' ||
      video.quality === 'tiny'

    const isMP4Video = video.mimeType?.includes('video/mp4')

    if (isMP4Video && labelsAccepted) {
      return video
    }
  })

  const formats = formatVideos.map((format) => {
    return {
      idTag: format?.itag,
      url: format?.url,
      quality: format?.qualityLabel,
      videoSize: format?.bitrate,
    }
  })

  return formats
}
