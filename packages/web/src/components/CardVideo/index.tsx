import { formatDurationFromSeconds } from '../../utils/formate-duration-from-seconds'

type CardVideoProps = {
  title: string
  imageUrl: string
  duration: number
}
export function CardVideo({ title, imageUrl, duration }: CardVideoProps) {
  return (
    <div className="flex flex-col gap-[1rem] w-full bg-white rounded-[.8rem] p-[1rem]">
      <img
        src={imageUrl}
        alt=""
        className="rounded-[.8rem] object-cover h-[19.2rem]"
      />
      <h2 className="font-bold text-[1.6rem] line-clamp-2">{title}</h2>
      <span className="text-[1.4rem] text-gray-400 leading-[120%]">
        Duração: {formatDurationFromSeconds(duration)}
      </span>
    </div>
  )
}
