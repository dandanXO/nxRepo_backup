import React from "react";
import { environment } from "../../../../../../../environments/environment";
import useBreakpoint from "../../../../../hooks/useBreakpoint";
import { tcx } from "../../../../../utils/tcx";
import ProgressBar from "./ProgressBar";
import { GetVIPInfoResponse } from "../../../../../../external";
import CurrentVIPIcon from "../../../../../components/CurrentVIPIcon";
import { formatMoney } from "../../../../../utils/formatMoney";

interface ICurrentLabelInfoCardProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
}

const CurrentLevelInfoCard = ({
  userVIPInfo,
  currentLevel
}: ICurrentLabelInfoCardProps) => {
  const { isMobile } = useBreakpoint();
  return (
    <div
      className={
        tcx(
          'p-6 border-4 border-[var(--stroke-dashboard-main)] bg-gradient-to-b from-[var(--background-vip-level-from)] to-[var(--background-vip-level-to)] rounded-lg flex items-center text-white gap-6',
          ['flex-col', isMobile]
        )}>
      <div className='flex items-center justify-center'>
        <CurrentVIPIcon
          className={tcx('w-[280px]', ['gap-[15px]', isMobile])}
          imageClassName='px-12 py-3 object-contain'
          level={currentLevel}
          textClassName={tcx('w-[102px]', ['hidden', !isMobile])}
        />
      </div>
      <div className='flex-grow w-full text-left text-base font-medium'>
        <img className={tcx('w-[104px]', ['hidden', isMobile])} alt='vip_level' src={`assets/${environment.assetPrefix}/ic_vip_${currentLevel}.png`}/>

        <div>Quantidade total de recarga:</div>
        {
          isMobile && (
            <div className='flex justify-between text-sm mb-1'>
              <div>VIP{currentLevel}</div>
              <div>VIP{currentLevel + 1}</div>
            </div>
          )
        }
        <div className='flex items-center w-full mb-[14px]'>
          <div className={isMobile? 'hidden': ''}>VIP{currentLevel}</div>
          <ProgressBar
            className={tcx('bg-white mx-2 h-7', ['mx-0', isMobile])}
            rounded='rounded-full'
            progress={(userVIPInfo?.data?.vip_score || 0) /
              (userVIPInfo?.data?.next_level_score || 1)
          }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className={tcx('h-full flex items-center text-sm font-normal text-[var(--text-deposit)] justify-center', ['px-4', isMobile])}>
              <div>
                R$
                {formatMoney(userVIPInfo?.data?.vip_score ? userVIPInfo?.data?.vip_score / 100 : 0)}
                /R$
                {formatMoney(userVIPInfo?.data?.next_level_score ? userVIPInfo?.data?.next_level_score / 100 : 0)}
              </div>
            </div>
          </ProgressBar>
          <div className={isMobile? 'hidden': ''}>VIP{currentLevel + 1}</div>
        </div>

        <div>Número total de apostas</div>
        {
          isMobile && (
            <div className='flex justify-between text-sm mb-1'>
              <div>VIP{currentLevel}</div>
              <div>VIP{currentLevel + 1}</div>
            </div>
          )
        }
        <div className='flex items-center w-full'>
          <div className={isMobile? 'hidden': ''}>VIP{currentLevel}</div>
          <ProgressBar
            className={tcx('bg-white mx-2 h-7', ['mx-0', isMobile])}
            rounded='rounded-full'
            progress={
              userVIPInfo?.data?.flow_progress
              ? userVIPInfo?.data?.flow_progress / 100
              : 0
            }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className={tcx('h-full flex items-center text-sm font-normal text-[var(--text-deposit)] justify-center', ['px-4', isMobile])}>
              <div>
                R$
                {formatMoney(userVIPInfo?.data?.flow ? userVIPInfo?.data?.flow / 100 : 0)}
                /R$
                {formatMoney(userVIPInfo?.data?.next_level_flow ? userVIPInfo?.data?.next_level_flow / 100 : 0)}
              </div>
            </div>
          </ProgressBar>
          <div className={isMobile? 'hidden': ''}>VIP{currentLevel + 1}</div>
        </div>
      </div>
    </div>
  )
}

export default CurrentLevelInfoCard
