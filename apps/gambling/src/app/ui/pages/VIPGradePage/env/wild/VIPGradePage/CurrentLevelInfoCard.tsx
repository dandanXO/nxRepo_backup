import React from "react";
import { environment } from "../../../../../../../environments/environment";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import { tcx } from "../../../../../utils/tcx";
import ProgressBar from "./ProgressBar";
import { GetVIPInfoResponse } from "../../../../../../external";
import CurrentVIPIcon from "../../../../../components/CurrentVIPIcon";

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
          'p-2 border-2 border-purple-400 rounded-md flex items-center text-white',
          ['flex-col', isMobile]
        )}>
      <div className={tcx('flex items-center w-[22%] justify-center', ['w-full', isMobile])}>
        <CurrentVIPIcon
          className={tcx('w-full p-2 px-5', ['w-32 px-0', isMobile])}
          level={currentLevel}
          textClassName={tcx('text-2xl', ['hidden', !isMobile])}
        />
      </div>
      <div className='flex-grow w-full text-left'>
        <div className={tcx('text-3xl',['hidden', isMobile])}>
          VIP {currentLevel}
        </div>

        <div>Quantidade total de recarga:</div>
        <div className={tcx('flex items-center w-4/5', ['w-full', isMobile])}>
          <div>VIP{currentLevel}</div>
          <ProgressBar
            className={tcx('bg-assistant mx-2 h-6', ['h-5', isMobile])}
            rounded='rounded-full'
            progress={(userVIPInfo?.data?.vip_score || 0) /
              (userVIPInfo?.data?.next_level_score || 1)
          }
            progressColor='linear-gradient(0deg,#E15B20,#FFEA00)'
          >
            <div className={tcx('h-full flex items-center', ['px-4', isMobile], ['justify-center', !isMobile])}>
              {
                !isMobile ? (
                  <div>
                    R$
                    {(userVIPInfo?.data?.vip_score
                      ? (userVIPInfo?.data?.vip_score / 100)
                      : 0).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                    /R$
                    {(userVIPInfo?.data?.next_level_score
                      ? (userVIPInfo?.data?.next_level_score / 100).toFixed(2)
                      : 0).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                ) : (
                  <div>
                    {(userVIPInfo?.data?.vip_score
                      ? userVIPInfo?.data?.vip_score / 100
                      : 0).toLocaleString('en-US', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1
                    })}
                    {' '}
                    /
                    {' '}
                    {(userVIPInfo?.data?.next_level_score
                      ? userVIPInfo?.data?.next_level_score / 100
                      : 0).toLocaleString()}
                  </div>
                )
              }
            </div>
          </ProgressBar>
          <div>VIP{currentLevel + 1}</div>
        </div>

        <div>Número total de apostas</div>
        <div className={tcx('flex items-center w-4/5', ['w-full', isMobile])}>
          <div>VIP{currentLevel}</div>
          <ProgressBar
            className={tcx('bg-assistant mx-2 h-6', ['h-5', isMobile])}
            rounded='rounded-full'
            progress={
              userVIPInfo?.data?.flow_progress
              ? userVIPInfo?.data?.flow_progress / 100
              : 0
            }
            progressColor='linear-gradient(0deg,#E15B20,#FFEA00)'
          >
            <div className={tcx('h-full flex items-center', ['px-4', isMobile], ['justify-center', !isMobile])}>
              {
                !isMobile ? (
                  <div>
                    R$
                    {(userVIPInfo?.data?.flow
                      ? userVIPInfo?.data?.flow / 100
                      : 0).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                    /R$
                    {(userVIPInfo?.data?.next_level_flow
                      ? userVIPInfo?.data?.next_level_flow / 100
                      : 0).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                ) : (
                  <div>
                    {(userVIPInfo?.data?.flow
                      ? userVIPInfo?.data?.flow / 100
                      : 0).toLocaleString('en-US', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1
                    })}
                    {' '}
                    /
                    {' '}
                    {(userVIPInfo?.data?.next_level_flow
                      ? userVIPInfo?.data?.next_level_flow / 100
                      : 0).toLocaleString()}
                  </div>
                )
              }
            </div>
          </ProgressBar>
          <div>VIP{currentLevel + 1}</div>
        </div>
      </div>
    </div>
  )
}

export default CurrentLevelInfoCard
