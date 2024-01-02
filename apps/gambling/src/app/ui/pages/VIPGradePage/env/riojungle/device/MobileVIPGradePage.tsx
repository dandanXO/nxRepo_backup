import { IVIPGradePageProps } from "../../../index";
import VIPStatue from '../images/vip_statue.png'
import { formatLocaleMoney } from "../../../../../utils/format";
import { ProgressBar } from "../../../../../components/ProgressBar";
import { useEffect, useRef, useState } from "react";
import { VIPInfoTab } from "../components/VIPInfoTab";
import { VIPButtonList } from "../components/VIPButtonList";
import { VIP0Text } from "../components/VIP0Text";
import { useRioVIPGradePage } from "../hooks/useRioVIPGradePage";
import { useScrollSelectFixCenter } from "../../../../../hooks/useScrollSelectFixCenter";



export const MobileVIPGradePage = ({
  currentLevel,
  allLevelInfo,
  allSignInConfig,
  userVIPInfo,
  signInDayConfig
}: IVIPGradePageProps) => {
  const { selectedVIP, setSelectedVIP} = useRioVIPGradePage(currentLevel, userVIPInfo?.data.vip_score);
  const { scrollWrapperRef } = useScrollSelectFixCenter(selectedVIP, false);

  if(allLevelInfo.length === 0) return <div></div>

  return (
    <div className='px-4 w-full flex flex-col items-centers'>
      <img src={VIPStatue} alt="statue" className='mt-4' />

      <div
        className='w-full mt-4 overflow-x-scroll vip-tab-items flex gap-2 items-center relative'
        ref={scrollWrapperRef}
      >
        <VIPButtonList
          selectedVIP={selectedVIP}
          currentVIP={currentLevel}
          onSelect={(vip)=> setSelectedVIP(vip)}
        />
      </div>

      {/*VIP 進度卡*/}
      <div className='w-full h-fit flex rounded-lg bg-[#333333] mt-3 p-2'>
        {/*VIP進度條*/}
        {
          selectedVIP !== 0 && (
            <div className='w-full h-full flex flex-col justify-center'>
              <div className='w-full flex justify-between gap-2 items-end text-sm font-medium text-[#808080]'>
                <div className='flex-1'>Valor total da recarga</div>
                <div>
                  <span className='text-white'>R$ {formatLocaleMoney((userVIPInfo?.data?.vip_score || 0) / 100)}</span>
                  /R$ {formatLocaleMoney(allLevelInfo[selectedVIP].rechargeAmountLimit / 100)}
                </div>
              </div>
              <ProgressBar
                progressClassName='h-2'
                className='h-7 py-1 px-2 mt-1 text-white text-sm'
                progress={
                  ((userVIPInfo?.data?.vip_score || 0) / 100) / (allLevelInfo[selectedVIP].rechargeAmountLimit / 100 || 1)
                }
              />
              <div className='w-full flex justify-between gap-2 items-end text-sm font-medium text-[#808080] mt-2'>
                <div className='flex-1'>Número total de apostas</div>
                <div>
                  <span className='text-white'>R$ {formatLocaleMoney((userVIPInfo?.data?.flow || 0) / 100)}</span>
                  /R$ {formatLocaleMoney(allLevelInfo[selectedVIP].flowLimit / 100)}
                </div>
              </div>
              <ProgressBar
                progressClassName='h-2'
                className='h-7 py-1 px-2 mt-1 text-white text-sm'
                progress={
                  ((userVIPInfo?.data?.flow || 0) / 100) / (allLevelInfo[selectedVIP].flowLimit / 100 || 1)
                }
              />
            </div>
          )
        }

        {/*VIP 0提示文字*/}
        {
          selectedVIP === 0 && <VIP0Text className='text-sm' />
        }

      </div>

      {/*VIP INFO TAB*/}
      <VIPInfoTab className='mt-3' signInDayConfig={signInDayConfig} allLevelInfo={allLevelInfo} allSignInConfig={allSignInConfig} />

    </div>
  )
}
