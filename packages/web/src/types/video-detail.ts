export type VideoDetail = {
  title: string
  thumbnail: string
  durationInSeconds: number
  videoId: string
  formats: {
    idTag: number
    quality: string
    url: string
    videoSize: number
  }[]
}
