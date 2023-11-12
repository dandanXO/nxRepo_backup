import React from "react";
import { environment } from "../../../../../environments/environment";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { tcx } from "../../../utils/tcx";
import ProgressBar from "./ProgressBar";
import { GetVIPInfoResponse } from "../../../../external";

interface ICurrentLabelInfoCardProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
}

const CurrentLabelInfoCard = ({
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
      <div className={tcx('flex items-center w-[17%] justify-center', ['w-full', isMobile])}>
        <img
          className={
            tcx(
              'w-full p-2 px-5',
              ['w-32 px-0', isMobile],
            )}
          src={`assets/${environment.assetPrefix}/icon_vip_current.png`}
        />
        <div className={tcx('hidden text-2xl', ['block', isMobile])}>VIP {0}</div>
      </div>
      <div className='flex-grow w-full text-left'>
        <div className={tcx('text-3xl',['hidden', isMobile])}>
          VIP {currentLevel}
        </div>

        <div>Quantidade total de recarga:</div>
        <div className='flex items-center'>
          <div>VIP{currentLevel}</div>
          <ProgressBar
            className={tcx('bg-assistant mx-2 h-6', ['h-5', isMobile])}
            rounded='rounded-full'
            progress={(userVIPInfo?.data?.vip_score || 0) /
              (userVIPInfo?.data?.next_level_score || 1)
          }
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
        <div className='flex items-center'>
          <div>VIP{currentLevel}</div>
          <ProgressBar
            className={tcx('bg-assistant mx-2 h-6', ['h-5', isMobile])}
            rounded='rounded-full'
            progress={
              userVIPInfo?.data?.flow_progress
              ? userVIPInfo?.data?.flow_progress / 100
              : 0
            }
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

export default CurrentLabelInfoCard
