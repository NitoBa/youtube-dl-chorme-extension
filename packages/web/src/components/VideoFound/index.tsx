import { useState } from 'react'
import { useVideo } from '../../contexts/video'
import { Button } from '../Button'
import { CardVideo } from '../CardVideo'
import { LoadingSpinner } from '../LoadingSpinner'

export function VideoFound() {
  const [isDownloading, setIsDownloading] = useState(false)
  const { videoDetail } = useVideo()

  const convertVideoSize = (size: number) => {
    return (size / 10000).toFixed(2)
  }

  const handleClickOnDownload = async (
    url: string,
    // quality: number | string,
  ) => {
    try {
      setIsDownloading(true)
      window.open(url, '_blank')
      setIsDownloading(false)
    } catch (error) {
      console.log(error)
      setIsDownloading(false)
    }
  }

  return (
    <>
      <div className="gap-[1.6rem] flex flex-col">
        {isDownloading ? (
          <div className="flex flex-col gap-[1rem] bg-gray-500 rounded-[.8rem] h-[calc(100vh-10rem)] items-center justify-center">
            <h5 className="font-medium text-[2rem]">Baixando o video...</h5>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <CardVideo
              title={videoDetail?.title ?? 'Video Title'}
              imageUrl={videoDetail?.thumbnail ?? 'https://picsum.photos/200'}
              duration={videoDetail?.durationInSeconds ?? 0}
            />
            <div className="flex flex-col gap-[1rem] w-full bg-white rounded-[.8rem] p-[1rem]">
              <h4 className="text-[1.6rem] font-bold">
                Escolha o formato para o download
              </h4>
              {videoDetail?.formats?.map((format) => (
                <div
                  key={format.idTag}
                  className="flex flex-col items-center gap-[1rem] p-[1.2rem] bg-gray-500 rounded-[.8rem]"
                >
                  <div className="flex gap-[.8rem] items-center w-full">
                    <div className="">
                      <strong className="font-bold text-[1.4rem]">
                        Formato:{' '}
                      </strong>
                      <span className="font-medium text-[1.2rem] text-gray-600">
                        mp4
                      </span>
                    </div>
                    <div className="">
                      <strong className="font-bold text-[1.4rem]">
                        Tamanho:{' '}
                      </strong>
                      <span className="font-medium text-[1.2rem] text-gray-600">
                        {convertVideoSize(format.videoSize)} mb
                      </span>
                    </div>
                    <div className="">
                      <strong className="font-bold text-[1.4rem]">
                        Qualidade:{' '}
                      </strong>
                      <span className="font-medium text-[1.2rem] text-gray-600">
                        {format.quality}
                      </span>
                    </div>
                  </div>
                  <Button
                    title={'Download'}
                    onClick={() => handleClickOnDownload(format.url)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
