import { IVIPGradePageProps } from "../../../index";
import VIPStatue from '../images/vip_statue.png'

import CaretDown from '../images/CaretDown.png';
import CaretUP from '../images/CaretUp.png';
import { VerticalVIPButtonList } from "../components/VerticalVIPButtonList";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "../../../../../components/ProgressBar";
import { formatLocaleMoney } from "../../../../../utils/format";
import { VIP0Text } from "../components/VIP0Text";
import { VIPInfoTab } from "../components/VIPInfoTab";


export const DesktopVIPGradePage = ({
  currentLevel,
  allLevelInfo,
  allSignInConfig,
  userVIPInfo,
  signInDayConfig
}: IVIPGradePageProps) => {
  const [selectedVIP, setSelectedVIP] = useState(currentLevel);

  const vipWrapperRef = useRef<HTMLDivElement | null>(null);

  const VIPIcon = require(`../images/vip${selectedVIP}_pic.png`);

  useEffect(()=>{
    setSelectedVIP(currentLevel === 25? currentLevel: currentLevel + 1);
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

        {/*VIP 進度卡*/}
        <div className='w-full h-[298px] flex rounded-2xl bg-[#333333] mt-10'>

          {/*VIP選單*/}
          <div className='w-[15%] border-r border-r-[#666666] flex flex-col items-center group cursor-pointer'>
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

          {/*VIP 進度卡右側*/}
          <div className='w-[85%] pt-10 pl-10 pr-5 pb-9 flex items-center gap-5'>
            {/*VIP Icon*/}
            <div className='w-[218px] flex-shrink-0 h-full flex items-center'>
              <img src={VIPIcon} alt="vipIcon" />
            </div>

            {/*VIP進度條*/}
            {
              selectedVIP !== 0 && (
                <div className='w-full h-full flex flex-col justify-center'>
                  <div className='w-full flex justify-between text-base font-medium text-[#808080]'>
                    <div>Valor total da recarga</div>
                    <div>
                      <span className='text-white'>R$ {formatLocaleMoney((userVIPInfo?.data?.vip_score || 0) / 100)}</span>
                      /R$ {formatLocaleMoney(allLevelInfo[selectedVIP].rechargeAmountLimit / 100)}
                    </div>
                  </div>
                  <ProgressBar
                    className='h-14 py-[18px] px-5 mt-2 text-white text-xl'
                    progress={
                      ((userVIPInfo?.data?.vip_score || 0) / 100) / (allLevelInfo[selectedVIP].rechargeAmountLimit / 100 || 1)
                    }
                    progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
                  />
                  <div className='w-full flex justify-between text-base font-medium text-[#808080] mt-5'>
                    <div>Número total de apostas</div>
                    <div>
                      <span className='text-white'>R$ {formatLocaleMoney((userVIPInfo?.data?.flow || 0) / 100)}</span>
                      /R$ {formatLocaleMoney(allLevelInfo[selectedVIP].flowLimit / 100)}
                    </div>
                  </div>
                  <ProgressBar
                    className='h-14 py-[18px] px-5 mt-2 text-white text-xl'
                    progress={
                      ((userVIPInfo?.data?.flow || 0) / 100) / (allLevelInfo[selectedVIP].flowLimit / 100 || 1)
                    }
                    progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
                  />
                </div>
              )
            }

            {/*VIP 0提示文字*/}
            {
              selectedVIP === 0 && <VIP0Text />
            }
          </div>
        </div>


        {/*VIP INFO TAB*/}
        <VIPInfoTab className='mt-9' signInDayConfig={signInDayConfig} allLevelInfo={allLevelInfo} allSignInConfig={allSignInConfig} />


      </div>
    </div>
  )
}
