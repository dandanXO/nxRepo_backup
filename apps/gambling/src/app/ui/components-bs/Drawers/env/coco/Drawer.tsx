import React, { useState } from "react";
import { tcx } from "../../../../utils/tcx";
import AnimateDrawer, { DrawerDelay } from "../../AnimateDrawer";
import { IAnimateDrawerProps, IConfirmDrawerProps } from "../../ConfirmDrawer";



export const Drawer = (props: IConfirmDrawerProps & IAnimateDrawerProps ) => {
  const{
    onClose,
    title,
    content,
    buttonText,
    className,
    buttonStyle,
    open, 
    setOpen
  }=props;

  return (
    <AnimateDrawer
      className={tcx(
        'py-6 px-8 bg-[var(--main)] flex flex-col justify-center items-center bg-gradient-to-b from-[var(--background-modal-from)] to-[var(--background-modal-to)] shadow-[4px_4px_4px_0px_rgba(255,255,255,0.25)_inset,-4px_-4px_4px_0px_rgba(255,255,255,0.25)_inset]',
        className
      )}
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <div className='text-xl text-white font-bold '>{title}</div>
      <div className='text-sm text-white mt-5 text-center mb-12'>{content}</div>
      <button
        className={tcx(
          ` text-xl rounded-lg
            w-full py-2 text-white font-bold bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)]
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

