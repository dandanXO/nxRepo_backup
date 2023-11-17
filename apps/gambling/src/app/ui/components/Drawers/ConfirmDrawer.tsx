import React, { useState } from "react";
import { tcx } from "../../utils/tcx";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const Container = styled.div<{
  isOpen: boolean
}>`
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
`

interface IConfirmDrawerProps {
  title: string
  content: string
  buttonText: string
  onClose: ()=> void
  className?: string
  buttonStyle?: string
}

const ConfirmDrawer = ({
  onClose,
  title,
  content,
  buttonText,
  className,
  buttonStyle
}: IConfirmDrawerProps) => {
  const [open, setOpen]= useState(true)

  return (
    <div
      className='bg-[#00000060] text-black fixed top-0 left-0 h-full w-full z-50'
      onClick={()=>{
        setOpen(false)
        setTimeout(()=>{
          onClose()
        }, 300)
      }}
    >
      <Container
        isOpen={open} className={tcx(
        'z-50 rounded-2xl pb-12 px-5 pt-4 w-full fixed bottom-0 left-0 bg-[var(--main)] flex flex-col justify-center items-center shadow-[0_0_0.2rem_rgba(255,255,255,0.3)_inset]',
        className
        )}
        onClick={(event)=>event.stopPropagation()}
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
            }, 300)
          }}
        >
          {buttonText}
        </button>
      </Container>
    </div>
  )
}

export default ConfirmDrawer;
