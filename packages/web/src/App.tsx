import { YoutubeLogo } from 'phosphor-react'
import { ErrorState } from './components/ErrorState'
import { LoadingSpinner } from './components/LoadingSpinner'
import { NoVideoFound } from './components/NoVideoFound'
import { VideoFound } from './components/VideoFound'
import { useVideo } from './contexts/video'

export function App() {
  const { isYoutubePage, isLoadingVideoInfo, isErrorLoadingVideoInfo } =
    useVideo()
  return (
    <div className="p-[2.4rem] flex flex-col gap-[1.6rem]">
      <header className="flex gap-[1.6rem] items-center">
        <h1 className="text-[2.4rem] font-bold">Youtube Downloader</h1>
        <YoutubeLogo className="w-[3.2rem] h-[3.2rem]" />
      </header>

      {isYoutubePage && !isLoadingVideoInfo && !isErrorLoadingVideoInfo && (
        <VideoFound />
      )}
      {!isYoutubePage && !isLoadingVideoInfo && !isErrorLoadingVideoInfo && (
        <NoVideoFound />
      )}
      {isYoutubePage && isErrorLoadingVideoInfo && <ErrorState />}

      {isLoadingVideoInfo && (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)] w-full">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}
