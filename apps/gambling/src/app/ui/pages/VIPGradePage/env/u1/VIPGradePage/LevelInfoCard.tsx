import React from "react";
import { GetUserVIPAllInfoResponseData } from "../../../../../../external";
import { tcx } from "../../../../../utils/tcx";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import { environment } from "../../../../../../../environments/environment";
import { JackpotMap } from "../../../index";
import { formatLocaleMoney } from "../../../../../utils/format";
import { MobileLevelInfoCard } from "./MobileLevelInfoCard";

export interface ILevelInfoCardProps extends GetUserVIPAllInfoResponseData {
  signInBonus: number
  className?: string
}

const LevelInfoCard = ({
  className,
  signInBonus,
  level,
  upRewardAmout,
  withdrawAmountLimitDay,
  withdrawTimesLimitDay,
  rechargeAmountLimit,
  receiveAmountLimitDay,
  flowLimit,
  display
}:ILevelInfoCardProps) => {

  const { isMobile } = useBreakpoint();

  if(isMobile) {
    return  (
      <MobileLevelInfoCard
        className={className}
        signInBonus={signInBonus}
        level={level}
        rechargeAmountLimit={rechargeAmountLimit}
        flowLimit={flowLimit}
        withdrawAmountLimitDay={withdrawAmountLimitDay}
        withdrawTimesLimitDay={withdrawTimesLimitDay}
        upRewardAmout={upRewardAmout}
        receiveAmountLimitDay={receiveAmountLimitDay}
        display={display}
        />
    )
  }

  return (
    <div className={tcx('p-6 border-2 border-[var(--stroke-dashboard-secondary)] rounded-lg flex text-white bg-[var(--background-dashboard-secondary)] text-left text-lg gap-6', className)}>
      <div className='w-[280px] flex justify-center items-center'>
        <div className='w-[280px] flex flex-col items-center justify-center'>
          {
            level < 20 && (
              <img
                alt={`levelInfoIcon`}
                src={`assets/${environment.uVersion}/${environment.mVersion}/icon_vip_info.png`}
                className='w-[94px] mb-[10px] object-contain'
              />
            )
          }

          {
            level >= 20 && (
              <>
                <img
                  alt={`levelInfoIcon`}
                  src={`assets/${environment.uVersion}/${JackpotMap[level].image}`}
                  className='w-[280px] mb-1 object-contain'
                />
                <div className='text-base text-center text-[var(--secondary-assistant)] mb-2'>
                  <div>Nível Mega Jackpot: {JackpotMap[level].label}</div>
                  <div>Ou numerário de valor equivalente</div>
                </div>
              </>
            )
          }

          <img className={tcx('w-[113px]', ['w-[160px]'])} alt='vipLevel' src={`assets/${environment.uVersion}/ic_vip_${level}.png`} />
        </div>
      </div>

      <div className='flex flex-grow w-full gap-3'>
        <div className='w-1/2 flex flex-col gap-2 text-xl'>
          <div className='text-2xl font-medium'>Privilégio</div>

          <div className={tcx( ['hidden', level >= 20])}>Recompensa de atualização：
            <span className='text-[var(--secondary-assistant)]'>
              R$ {formatLocaleMoney(upRewardAmout ? upRewardAmout / 100 : 0)}
            </span>
          </div>
          <div>Recompensa total de check-in de <span className='text-[var(--secondary-assistant)]'>7</span> dias：
            <span className='text-[var(--secondary-assistant)]'>
              R$ {formatLocaleMoney(signInBonus)}
            </span>
          </div>
          <div>Limite máximo de retirada única：
            <span className='text-[var(--secondary-assistant)]'>
              R$ {
              formatLocaleMoney(withdrawAmountLimitDay ? withdrawAmountLimitDay / 100 : 0)}
            </span>
          </div>
          <div>Número de retiradas por dia：
            <span className='text-[var(--secondary-assistant)]'>{withdrawTimesLimitDay}</span>
          </div>

        </div>

        <div className='w-1/2 bg-[rgba(255,255,255,20%)] p-2 rounded-md border border-[var(--primary-assistant)] flex flex-col gap-2'>
          <div className='text-2xl text-left font-medium'>Condição</div>
          <div>Quantidade total de recarga：
            <span className='text-[var(--secondary-assistant)]'>
              R$ {formatLocaleMoney(rechargeAmountLimit ? rechargeAmountLimit / 100 : 0)}
            </span>
          </div>
          <div>Número total de apostas：
            <span className='text-[var(--secondary-assistant)]'>
              R$ {formatLocaleMoney(flowLimit ? flowLimit / 100 : 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelInfoCard;
