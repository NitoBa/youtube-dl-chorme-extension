import { MagnifyingGlass, Warning } from 'phosphor-react'
import { FormEvent, useRef } from 'react'
import { useVideo } from '../../contexts/video'
import { Button } from '../Button'

export function NoVideoFound() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { getVideoInfoFromSearch } = useVideo()

  const handleSearchVideo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const videoUrl = inputRef.current?.value
    if (videoUrl) {
      getVideoInfoFromSearch(videoUrl)
    }
  }

  return (
    <form className="flex flex-col gap-[1.6rem]" onSubmit={handleSearchVideo}>
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
        <Warning className="text-gray-600 w-[3.2rem] h-[3.2rem]" />
        <span className="text-gray-600 text-center font-medium leading-[120%] text-[1.6rem]">
          Oops...
          <br />
          Nenhum video encontrado.
          <br />
          Abra a extensão em uma aba do Youtube ou cole um link no campo abaixo
        </span>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Cole o link aqui"
        className="
        h-[4.4rem]
        p-[1.2rem]
        rounded-[.8rem]
        bg-transparent
        border
        border-gray-700
        text-medium
        placeholder-gray-600
        text-[1.4rem]
        outline-none
        focus:border-blue-500
        transition-all
        "
      />
      <Button
        type="submit"
        title="Buscar"
        icon={<MagnifyingGlass className="w-[1.6rem] h-[1.6rem] text-white" />}
      />
    </form>
  )
}
