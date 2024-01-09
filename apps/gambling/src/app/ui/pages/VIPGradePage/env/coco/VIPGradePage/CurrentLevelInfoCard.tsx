import React from "react";
import { environment } from "../../../../../../../environments/environment";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import { GetVIPInfoResponse } from "../../../../../../external";
import CurrentVIPIcon from "../../../../../components/CurrentVIPIcon";
import { formatLocaleMoney } from "../../../../../utils/format";
import { MobileCurrentLevelInfoCard } from "./MobileCurrentLevelInfoCard";
import { ProgressBar } from "../../../../../components-bs/ProgressBar";

export interface ICurrentLabelInfoCardProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
}

const CurrentLevelInfoCard = ({
  userVIPInfo,
  currentLevel
}: ICurrentLabelInfoCardProps) => {
  const { isMobile } = useBreakpoint();

  if(isMobile) {
    return <MobileCurrentLevelInfoCard currentLevel={currentLevel} userVIPInfo={userVIPInfo} />
  }

  return (
    <div
      className='w-full p-6 border-2 border-[var(--stroke-dashboard-main)] bg-gradient-to-b from-[var(--background-vip-level-from)] to-[var(--background-vip-level-to)] rounded-lg flex items-center text-white gap-6'>
      <div className='w-[280px]'>
        <CurrentVIPIcon
          className='w-[280px] h-[198px]'
          imageClassName='w-[184px] object-contain'
          level={currentLevel}
          textClassName='hidden'
        />
      </div>
      <div className='flex-grow w-full text-left text-base font-medium'>
        <img className='w-[104px]' alt='vip_level' src={`assets/${environment.uVersion}/ic_vip_${currentLevel}.png`}/>

        <div>Quantidade total de recarga:</div>

        <div className='flex items-center w-full mb-[14px]'>
          <div>VIP{currentLevel}</div>
          <ProgressBar
            className='bg-white mx-2 h-7'
            rounded='rounded-full'
            progress={(userVIPInfo?.data?.vip_score || 0) /
              (userVIPInfo?.data?.next_level_score || 1)
          }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='h-full flex items-center text-sm font-normal text-[var(--text-deposit)] justify-center'>
              <div>
                R$
                {formatLocaleMoney(userVIPInfo?.data?.vip_score ? userVIPInfo?.data?.vip_score / 100 : 0)}
                /R$
                {formatLocaleMoney(userVIPInfo?.data?.next_level_score ? userVIPInfo?.data?.next_level_score / 100 : 0)}
              </div>
            </div>
          </ProgressBar>
          <div>VIP{currentLevel + 1}</div>
        </div>

        <div>Número total de apostas:</div>

        <div className='flex items-center w-full'>
          <div>VIP{currentLevel}</div>
          <ProgressBar
            className='bg-white mx-2 h-7'
            rounded='rounded-full'
            progress={
              userVIPInfo?.data?.flow_progress
              ? userVIPInfo?.data?.flow_progress / 100
              : 0
            }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='h-full flex items-center text-sm font-normal text-[var(--text-deposit)] justify-center'>
              <div>
                R$
                {formatLocaleMoney(userVIPInfo?.data?.flow ? userVIPInfo?.data?.flow / 100 : 0)}
                /R$
                {formatLocaleMoney(userVIPInfo?.data?.next_level_flow ? userVIPInfo?.data?.next_level_flow / 100 : 0)}
              </div>
            </div>
          </ProgressBar>
          <div>VIP{currentLevel + 1}</div>
        </div>
      </div>
    </div>
  )
}

export default CurrentLevelInfoCard
