import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  title: string
  icon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ title, icon, ...props }: ButtonProps) {
  return (
    <button
      className="flex
      items-center
      justify-center
      gap-[.8rem]
    bg-blue-500
      px-[2rem]
      h-[4.4rem]
      rounded-[.8rem]
      w-full
      cursor-pointer
      hover:brightness-90
      transition-all"
      {...props}
    >
      <span
        className="
        text-white
        font-semibold
        text-[1.6rem]"
      >
        {title}
      </span>
      {icon}
    </button>
  )
}
