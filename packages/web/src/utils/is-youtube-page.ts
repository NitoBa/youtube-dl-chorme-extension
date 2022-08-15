import { getVideoIdFromURL } from './get-video-id-from-url'

export const isAnyYoutubePage = (url: string): boolean => {
  return getVideoIdFromURL(url) !== 'error'
}
