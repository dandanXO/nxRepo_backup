import React, { useState } from "react";
import { tcx } from "../../../../utils/tcx";
import AnimateDrawer, { DrawerDelay } from "../../AnimateDrawer";
import { IAnimateDrawerProps, IConfirmDrawerProps } from "../../ConfirmDrawer";



export const Drawer = ({
  onClose,
  title,
  content,
  buttonText,
  className,
  buttonStyle,
  open,
  setOpen
}: IConfirmDrawerProps & IAnimateDrawerProps) => {

  return (
    <AnimateDrawer
      className={tcx(
        'pb-12 px-5 pt-4 bg-[var(--main)] flex flex-col justify-center items-center shadow-[0_0_0.2rem_rgba(255,255,255,0.3)_inset]',
        className
      )}
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <div className='text-xl text-white font-bold mt-5'>{title}</div>
      <div className='text-sm text-white my-4 text-center mb-10'>{content}</div>
      <button
        className={tcx(
          `
            w-full rounded py-2 text-white font-bold bg-[var(--main-secondary-main)]
            shadow-[0_0.01rem_0.04rem_rgba(0,12,39,0.7),0_-0.01rem_0.03rem_rgba(0,14,122,0.8)_inset]
            `,
          buttonStyle
        )}
        onClick={()=>{
          setOpen(false)
          setTimeout(()=>{
            onClose()
          }, DrawerDelay)
        }}
      >
        {buttonText}
      </button>
    </AnimateDrawer>
  )
}

