import React from "react";
import { ICurrentLabelInfoCardProps } from "./CurrentLevelInfoCard";
import CurrentVIPIcon from "../../../../../components/CurrentVIPIcon";
import { formatLocaleMoney } from "../../../../../utils/format";
import { ProgressBar } from "../../../../../components/ProgressBar";

export const MobileCurrentLevelInfoCard = ({
  currentLevel,
  userVIPInfo
}: ICurrentLabelInfoCardProps) => {
  return (
    <div
      className='p-[10px] border-2 flex-col border-[var(--stroke-dashboard-main)] bg-gradient-to-b from-[var(--background-vip-level-from)] to-[var(--background-vip-level-to)] rounded-lg flex items-center text-white gap-2'>
      <CurrentVIPIcon
        className='flex-row gap-2'
        imageClassName='w-[102px] object-contain'
        level={currentLevel}
        textClassName='w-[102px]'
      />

      <div className='flex-grow w-full text-left text-base font-medium'>

        <div>Quantidade total de recarga:</div>

        <div className='flex justify-between text-sm mb-1'>
          <div>VIP{currentLevel}</div>
          <div>VIP{currentLevel + 1}</div>
        </div>

        <div className='flex items-center w-full mb-[14px]'>
          <ProgressBar
            className='bg-white h-6'
            rounded='rounded-full'
            progress={(userVIPInfo?.data?.vip_score || 0) /
              (userVIPInfo?.data?.next_level_score || 1)
            }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='h-full flex items-center text-sm font-medium text-[var(--text-deposit)] justify-center px-4'>
              <div>
                R$
                {formatLocaleMoney(userVIPInfo?.data?.vip_score ? userVIPInfo?.data?.vip_score / 100 : 0)}
                /R$
                {formatLocaleMoney(userVIPInfo?.data?.next_level_score ? userVIPInfo?.data?.next_level_score / 100 : 0)}
              </div>
            </div>
          </ProgressBar>
        </div>

        <div>Número total de apostas:</div>

        <div className='flex justify-between text-sm mb-1'>
          <div>VIP{currentLevel}</div>
          <div>VIP{currentLevel + 1}</div>
        </div>

        <div className='flex items-center w-full'>
          <ProgressBar
            className='bg-white h-6'
            rounded='rounded-full'
            progress={
              userVIPInfo?.data?.flow_progress
                ? userVIPInfo?.data?.flow_progress / 100
                : 0
            }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='h-full flex items-center text-sm font-medium text-[var(--text-deposit)] justify-center px-4'>
              <div>
                R$
                {formatLocaleMoney(userVIPInfo?.data?.flow ? userVIPInfo?.data?.flow / 100 : 0)}
                /R$
                {formatLocaleMoney(userVIPInfo?.data?.next_level_flow ? userVIPInfo?.data?.next_level_flow / 100 : 0)}
              </div>
            </div>
          </ProgressBar>
        </div>
      </div>
    </div>
  )
}
