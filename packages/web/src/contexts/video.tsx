import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/api'
import { VideoDetail } from '../types/video-detail'
import {
  cacheVideoToLocalStorage,
  getCachedVideo,
} from '../utils/cache-video-to-localstorage'
import { getVideoIdFromURL } from '../utils/get-video-id-from-url'
import { isAnyYoutubePage } from '../utils/is-youtube-page'

type VideoContextData = {
  isYoutubePage: boolean
  isLoadingVideoInfo: boolean
  isErrorLoadingVideoInfo: boolean
  videoDetail: VideoDetail | null
  getVideoInfoFromSearch: (url: string) => void
  handleTryAgainVideoInfo: () => void
}

const VideoContext = createContext<VideoContextData>({} as VideoContextData)

export function VideoProvider({ children }: { children: ReactNode }) {
  const [isYoutubePage, setIsYoutubePage] = useState(false)
  const [isLoadingVideoInfo, setIsLoadingVideoInfo] = useState(false)
  const [isErrorLoadingVideoInfo, setIsErrorLoadingVideoInfo] = useState(false)
  const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null)

  const getVideoInfos = useCallback(async (videoId: string) => {
    try {
      setIsLoadingVideoInfo(true)
      // const video = await getVideoInfoFromYoutubePage(videoId)
      const response = await api.get(`/video/${videoId}`)
      const video = {
        title: response.data.title,
        thumbnail: response.data.thumbnailUrl,
        videoId,
        durationInSeconds: response.data.durationInSeconds,
        formats: response.data.formats,
      }
      setVideoDetail(video)
      cacheVideoToLocalStorage(video)
      setIsLoadingVideoInfo(false)
      return true
    } catch (error) {
      setIsLoadingVideoInfo(false)
      setIsErrorLoadingVideoInfo(true)
      return false
    }
  }, [])

  const checkIfYoutubePage = useCallback(() => {
    if (chrome?.tabs?.query) {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async ([tab]) => {
          if (isAnyYoutubePage(tab?.url as string)) {
            setIsYoutubePage(true)
            const videoId = getVideoIdFromURL(tab?.url as string)
            const videoInStorage = await getCachedVideo()
            if (videoInStorage && videoInStorage.videoId === videoId) {
              setVideoDetail(videoInStorage)
              return
            }

            // TODO: check if return empty
            getVideoInfos(videoId)
          } else {
            setIsYoutubePage(false)
          }
        },
      )
    }
  }, [getVideoInfos])

  const getVideoInfoFromSearch = useCallback(
    async (videoUrl: string) => {
      const videoId = getVideoIdFromURL(videoUrl)
      if (await getVideoInfos(videoId)) {
        setIsYoutubePage(true)
      }
    },
    [getVideoInfos],
  )

  useEffect(() => {
    checkIfYoutubePage()
  }, [checkIfYoutubePage])

  return (
    <VideoContext.Provider
      value={{
        isYoutubePage,
        isLoadingVideoInfo,
        isErrorLoadingVideoInfo,
        videoDetail,
        getVideoInfoFromSearch,
        handleTryAgainVideoInfo: checkIfYoutubePage,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider')
  }
  return context
}
