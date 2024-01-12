import { tcx } from "../../../../../../utils/tcx";
import React, { useEffect, useRef } from "react";

import LockOpen from '../../images/LockOpen.png';
import Lock from '../../images/Lock.png';

const shadowClassName = 'shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'

interface IVIPButtonListProps {
  startVIP: number,
  selectedVIP: number
  setSelectedVIP: React.Dispatch<React.SetStateAction<number>>
  currentVIP: number
  className?: string
  buttonClassName?: string
  onSelectedClassName: string
}

export const VIPButtonList = ({
  startVIP,
  selectedVIP,
  setSelectedVIP,
  currentVIP,
  className,
  buttonClassName,
  onSelectedClassName
}: IVIPButtonListProps) => {

  const vipWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=> {
    const currentItem = vipWrapperRef.current?.children[selectedVIP] as HTMLElement | undefined
    if(currentItem) {
      vipWrapperRef.current?.scrollTo({
        left: currentItem.offsetLeft  - ((vipWrapperRef.current?.offsetWidth || 0) - currentItem.offsetWidth ) / 2,
        behavior: 'smooth'
      })
    }
  }, [selectedVIP])

  const vips: number[] = [];

  for (let i = startVIP; i <= 25; i += 1) {
    vips.push(i);
  }

  return (
    <div
      className={tcx('w-full overflow-x-scroll vip-tab-items flex items-center relative', className)}
      ref={vipWrapperRef}
    >
      {
        vips.map((vip) => {

          const backgroundColor = currentVIP === vip ? 'bg-[var(--secondary-main)]': vip > currentVIP ? 'bg-[var(--grayscale-40)]' : 'bg-[var(--primary-main)]';

          return (
            <div
              key={vip}
              className={tcx(
                backgroundColor,
                shadowClassName,
                'flex-shrink-0 text-white rounded-full text-center flex justify-center items-center gap-1 font-bold',
                buttonClassName,
                [onSelectedClassName, vip === selectedVIP]
              )}
              onClick={()=>setSelectedVIP(vip)}
            >
              {vip === currentVIP && <img alt='lockOpen' src={LockOpen} className='w-4 h-4' />}
              {vip > currentVIP && <img alt='lockOpen' src={Lock} className='w-4 h-4' />}
              <div>VIP{vip}</div>
            </div>
          )
        })
      }
    </div>
  )
}
