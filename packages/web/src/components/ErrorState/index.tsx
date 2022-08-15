import { X } from 'phosphor-react'
import { useVideo } from '../../contexts/video'
import { Button } from '../Button'

export function ErrorState() {
  const { handleTryAgainVideoInfo } = useVideo()
  return (
    <div
      className="
  bg-white
  rounded-[.8rem]
  w-full
  flex
  flex-col
  items-center
  justify-center
  h-[21.7rem]
  gap-[1rem] 
  p-[1.6rem]"
    >
      <X className="text-gray-600 w-[3.2rem] h-[3.2rem]" />
      <span className="text-gray-600 text-center font-medium leading-[120%] text-[1.6rem]">
        Oops...
        <br />
        Houve um erro ao buscar as informações do seu video
        <br />
      </span>
      <Button title={'Tentar novamente'} onClick={handleTryAgainVideoInfo} />
    </div>
  )
}
