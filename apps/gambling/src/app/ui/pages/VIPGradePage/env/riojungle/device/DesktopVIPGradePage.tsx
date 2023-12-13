import { IVIPGradePageProps } from "../../../index";
import VIPStatue from '../images/vip_statue.png'
import VIPIcon from '../images/vip-icon.png'
import CaretDown from '../images/CaretDown.png';
import CaretUP from '../images/CaretUp.png';
import { VerticalVIPButtonList } from "../components/VerticalVIPButtonList";
import { useEffect, useRef, useState } from "react";


export const DesktopVIPGradePage = ({
  currentLevel,
  allLevelInfo,
  allSignInConfig,
  userVIPInfo
}: IVIPGradePageProps) => {
  const [selectedVIP, setSelectedVIP] = useState(currentLevel);

  const vipWrapperRef = useRef<HTMLDivElement | null>(null);


  useEffect(()=>{
    setSelectedVIP(currentLevel);
  }, [currentLevel])

  useEffect(()=> {
    const currentItem = vipWrapperRef.current?.children[selectedVIP] as HTMLElement | undefined
    if(currentItem) {
      vipWrapperRef.current?.scrollTo({
        top: currentItem.offsetTop  - ((vipWrapperRef.current?.offsetHeight || 0) - currentItem.offsetHeight ) / 2,
        behavior: 'smooth'
      })
    }
  }, [selectedVIP])

  return (
    <div className='w-full flex justify-center'>
      <div className='w-[90%] 2xl:w-[72%]'>
        <img src={VIPStatue} alt="statue" className='mt-10' />
        <div className='w-full flex rounded-2xl bg-[#333333] mt-[-45px]'>

          <div className='w-[15%] h-[298px] border-r border-r-[#666666] flex flex-col items-center group cursor-pointer'>
            <img alt='up' src={CaretUP} className='invisible text-white group-hover:visible w-[20px] h-[20px] my-1' onClick={() => vipWrapperRef.current?.scrollBy(0,-242)} />
            <div
              className='h-[242px] w-[78%] py-1 overflow-y-scroll vip-tab-items flex flex-col gap-4 items-center relative'
              ref={vipWrapperRef}
            >
              <VerticalVIPButtonList
                selectedVIP={selectedVIP}
                currentVIP={currentLevel}
                onSelect={(vip)=> setSelectedVIP(vip)}
              />
            </div >
            <img alt='down' src={CaretDown} className='invisible text-white group-hover:visible w-[20px] h-[20px] my-1' onClick={() => vipWrapperRef.current?.scrollBy(0,242)} />
          </div>

          <div className='w-[85%] h-[298px] pt-10 pl-10 pr-5 pb-9 flex gap-5'>
            <div className='w-[22%] h-full flex items-center'>
              <div className='relative'>
                <img src={VIPIcon} alt="vipIcon" />
                <div className='text-white font-bold absolute bottom-[7%] left-[50%] translate-x-[-50%] text-xl 2xl:text-3xl'>VIP{selectedVIP}</div>
              </div>
            </div>
            <div className='w-full h-full'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
