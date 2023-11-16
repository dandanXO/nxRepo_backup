import cx from 'classnames'
import { useState } from 'react';

export const MobileBottomNoticeSection = (props: any) => {
  const { title, className, buttonStyle, content, buttonText } = props;
  return (
    <div className='h-full w-full bg-[#00000066] bottom-0 left-0 fixed z-50'>
      <div className={cx(`rounded-2xl pb-12 px-5 pt-4 fixed z-50 w-full fixed bottom-0 left-0
        bg-[var(--main)] flex flex-col justify-center items-center 
        shadow-[0_0_0.2rem_rgba(255,255,255,0.3)_inset]`
        , className)} >
        <div className='text-xl text-white font-bold mt-5'>{title}</div>
        <div className='text-sm text-white my-4 text-center mb-10'>{content}</div>
        <button className={cx(`w-full rounded py-2 text-white text-bold
        bg-[var(--main-secondary-main)]
        shadow-[0_0.01rem_0.04rem_rgba(0,12,39,0.7),0_-0.01rem_0.03rem_rgba(0,14,122,0.8)_inset] 
        `, buttonStyle)}
          onClick={() => { props.onClick && props.onClick() }}
        >{buttonText}</button>
      </div>

    </div>

  )
}