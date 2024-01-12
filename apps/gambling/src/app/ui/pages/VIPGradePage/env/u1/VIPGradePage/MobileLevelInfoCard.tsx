import React from "react";
import { ILevelInfoCardProps } from "./LevelInfoCard";
import { tcx } from "../../../../../utils/tcx";
import { environment } from "../../../../../../../environments/environment";
import { JackpotMap } from "../../../index";
import { formatLocaleMoney } from "../../../../../utils/format";

export const MobileLevelInfoCard = ({
  className,
  signInBonus,
  level,
  upRewardAmout,
  withdrawAmountLimitDay,
  withdrawTimesLimitDay,
  rechargeAmountLimit,
  flowLimit,
}: ILevelInfoCardProps) => {
  return (
    <div className={tcx('p-[10px] border-2 border-[var(--stroke-dashboard-secondary)] rounded-lg flex flex-col text-white bg-[var(--background-dashboard-secondary)] text-left text-lg gap-3', className)}>
      <div className='flex gap-3'>
        <div className='w-[100px] flex justify-center items-center'>
          <div className='w-[100px] flex flex-col items-center justify-center'>
            <img
              alt={`levelInfoIcon`}
              src={`assets/${environment.uVersion}/icon_vip_info.png`}
              className='w-[76px] mb-3 object-contain'
            />
            <img className={tcx('w-[45px]', ['w-[57px]', level > 9])} alt='vipLevel' src={`assets/${environment.uVersion}/ic_vip_${level}.png`} />
          </div>
        </div>

        <div className='flex-grow w-full flex flex-col gap-1 text-xs font-medium'>
          {
            level >= 20 && (
              <div className='flex flex-col w-full justify-center items-center'>
                <img className='w-[154px] object-contain mb-1' alt={`jackpot${level}`} src={`assets/${environment.uVersion}/${JackpotMap[level].image}`}/>
                <div className='text-xs text-center text-[var(--secondary-assistant)]'>
                  <div>Nível Mega Jackpot: {JackpotMap[level].label}</div>
                  <div>Ou numerário de valor equivalente</div>
                </div>
              </div>
            )
          }
          <div className='text-base font-bold'>Privilégio</div>

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
      </div>

      {
        level > 0 && (
          <div className='w-full text-xs font-medium bg-[rgba(255,255,255,20%)] p-2 rounded-md border border-[var(--primary-assistant)] flex flex-col gap-2'>
            <div className='text-base text-left font-bold'>Condição</div>
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
        )
      }
    </div>
  )
}
