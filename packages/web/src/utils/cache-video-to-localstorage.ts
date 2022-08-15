import { VideoDetail } from '../types/video-detail'
import { StorageKeys } from './storage-keys'

export const cacheVideoToLocalStorage = (video: VideoDetail) => {
  chrome.storage.local.set({ [StorageKeys.CURRENT_VIDEO]: video })
}

export async function getCachedVideo(): Promise<VideoDetail | null> {
  const video = await new Promise<VideoDetail | null>((resolve) => {
    chrome.storage.local.get(StorageKeys.CURRENT_VIDEO, (result) => {
      if (result[StorageKeys.CURRENT_VIDEO]) {
        const videoStore = JSON.stringify(result[StorageKeys.CURRENT_VIDEO])
        const video = JSON.parse(videoStore) as VideoDetail
        resolve(video)
      } else {
        resolve(null)
      }
    })
  })
  return video
}
