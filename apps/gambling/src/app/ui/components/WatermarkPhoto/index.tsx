import { twMerge } from "tailwind-merge";
import React from "react";
import { content } from "tailwindcss-classnames";


interface IWatermarkPhotoProps {
  src: string
  content: string
  className?: string
  alt?: string
  row?: number
  column?: number
}

export const WatermarkPhoto = ({
  alt,
  src,
  content,
  className,
  row= 8,
  column = 8
}: IWatermarkPhotoProps) => {
  return (
    <div
      className={twMerge('relative w-[300px] overflow-hidden', className)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className='watermark__inner'>
        {Array.from({ length: row}, (_, i)=> <div key={i} className='watermark__body text-[rgba(0,0,0,0.25)]'>
          {
            Array.from({length: column }, (_, j) => <span key={j} className='mr-10'>{content}</span>)
          }
        </div>)
        }
      </div>
      <div>
        <img alt={alt || "imageWithWaterMark"} className='w-full' src={src}/>
      </div>
    </div>
  )
}
