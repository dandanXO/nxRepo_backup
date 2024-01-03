import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
import { tcx } from "../../utils/tcx";

export const DrawerDelay = 300

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
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} ${DrawerDelay/1000}s ease-in-out;
`

interface IDrawerProps {
  children: React.ReactNode
  className?: string,
  onClose: ()=>void,
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const AnimateDrawer = ({
  open,
  setOpen,
  children,
  className,
  onClose
}:IDrawerProps) => {

  return (
    <div
      className='bg-[#00000060] fixed top-0 left-0 h-full w-full z-50'
      onClick={(event)=>{
        event.stopPropagation();
        setOpen(false)
        setTimeout(()=>{
          onClose()
        }, DrawerDelay)
      }}
    >
      <Container
        className={tcx(
          'z-50 rounded-t-2xl w-full fixed bottom-0 left-0',
          className
        )}
        isOpen={open}
        onClick={(event)=>event.stopPropagation()}
      >
        {children}
      </Container>
    </div>
  )
}

export default AnimateDrawer;

