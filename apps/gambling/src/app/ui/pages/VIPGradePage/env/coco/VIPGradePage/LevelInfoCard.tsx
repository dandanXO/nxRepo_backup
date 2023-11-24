import React from "react";
import { GetUserVIPAllInfoResponseData } from "../../../../../../external";
import { tcx } from "../../../../../utils/tcx";
import useBreakpoint from "../../../../../hooks/useBreakpoint";
import { environment } from "../../../../../../../environments/environment";
import { JackpotMap } from "../../../index";
import { formatMoney } from "../../../../../utils/formatMoney";

interface ILevelInfoCardProps extends GetUserVIPAllInfoResponseData {
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
  flowLimit
}:ILevelInfoCardProps) => {

  const { isMobile } = useBreakpoint();

  return (
    <div className={tcx(
        'p-6 border-2 border-[var(--stroke-dashboard-secondary)] rounded-lg flex text-white bg-[var(--background-dashboard-secondary)] text-left text-lg gap-6',
        ['flex-col text-sm gap-3', isMobile],
        className,
      )}>
      <div className='flex items-center'>
        <div className={tcx(
            'flex flex-col w-[280px] justify-center items-center ',
          ['w-full', isMobile]
        )}>
          <img
            className={tcx('px-[93px] object-contain', ['px-0', level >= 20])}
            src={
              level < 20 ? `assets/${environment.assetPrefix}/icon_vip_info.png` :
                `assets/${environment.assetPrefix}/${JackpotMap[level].image}`
            }
          />
          {
             level >= 20 && (
              <div className='text-base text-center text-[var(--secondary-assistant)]'>
                <div>Nível Mega Jackpot: {JackpotMap[level].label}</div>
                <div>Ou numerário de valor equivalente</div>
              </div>
            )
          }
          <img className={tcx('w-[102px] mt-[6px]', ['mt-[14px]', isMobile])} alt='vip_level' src={`assets/${environment.assetPrefix}/ic_vip_${level}.png`} />
        </div>
      </div>

      <div className='flex w-full gap-3'>
        <div className={tcx('w-1/2 flex flex-col gap-2 text-xl', ['text-sm', isMobile])}>
          <div className={isMobile?'text-lg font-bold':'text-2xl font-medium'}>Privilégio</div>

          <div className={tcx( ['hidden', level >= 20])}>Recompensa de atualização：
            <span className='text-[var(--secondary-assistant)]'>
              R$ {formatMoney(upRewardAmout ? upRewardAmout / 100 : 0)}
            </span>
          </div>
          <div>Recompensa total de check-in de 7 dias：
            <span className='text-[var(--secondary-assistant)]'>
              {formatMoney(signInBonus)}
            </span>
          </div>
          <div>Limite máximo de retirada única：
            <span className='text-[var(--secondary-assistant)]'>
              R$ {
              formatMoney(withdrawAmountLimitDay ? withdrawAmountLimitDay / 100 : 0)}
            </span>
          </div>
          <div>Número de retiradas por dia：
            <span className='text-[var(--secondary-assistant)]'>{withdrawTimesLimitDay}</span>
          </div>

        </div>

        <div className='w-1/2 bg-[rgba(255,255,255,20%)] p-2 rounded-md border border-[var(--primary-assistant)] flex flex-col gap-2'>
          <div className={tcx('text-2xl text-left font-medium', ['text-lg font-bold', isMobile])}>Condição</div>
          <div>Quantidade total de recarga:
            <span className='text-[var(--secondary-assistant)]'>
              R$ {formatMoney(rechargeAmountLimit ? rechargeAmountLimit / 100 : 0)}
            </span>
          </div>
          <div>Número total de apostas:
            <span className='text-[var(--secondary-assistant)]'>
              R$ {formatMoney(flowLimit ? flowLimit / 100 : 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelInfoCard;
