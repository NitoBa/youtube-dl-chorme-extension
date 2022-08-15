export const formatDurationFromSeconds = (durationInSeconds: number) => {
  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60)
  const seconds = durationInSeconds - hours * 3600 - minutes * 60
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
