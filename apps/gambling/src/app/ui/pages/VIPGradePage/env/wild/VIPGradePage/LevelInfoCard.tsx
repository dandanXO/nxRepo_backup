import React from "react";
import { GetUserVIPAllInfoResponseData } from "../../../../../../external";
import { tcx } from "../../../../../utils/tcx";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import { environment } from "../../../../../../../environments/environment";
import { JackpotMap } from "../../../index";

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
        'p-4 border-2 border-purple-400 rounded-md flex text-white bg-table-varient text-left text-lg gap-5',
        ['flex-col text-sm gap-0', isMobile],
        className,
      )}>
      <div className={tcx('flex w-3/5', ['w-full', isMobile])}>
        <div className={tcx(
            'p-4 flex flex-col items-center justify-center',
            ['p-0', isMobile],
            ['w-[30%]', !isMobile]
        )}>
          <img
            src={isMobile ? `assets/${environment.assetPrefix}/icon_vip_info.png` :
               level < 20 ? `assets/${environment.assetPrefix}/icon_vip_info.png` :
                 `assets/${environment.assetPrefix}/${JackpotMap[level].image}`
          }
            className={tcx("p-2", ['w-32 p-0', isMobile])}
          />
          {
            !isMobile && level >= 20 && (
              <div className='text-base text-center'>
                <div>Nível Mega Jackpot: {JackpotMap[level].label}</div>
                <div>Ou numerário de valor equivalente</div>
              </div>
            )
          }
          <div className={isMobile?'text-2xl':'text-4xl'}>VIP {level}</div>
        </div>
        <div>

          <div className={isMobile?'text-lg':'text-3xl'}>Privilégio</div>

          {
            isMobile && level >= 20 && (
              <div className='border-b border-purple-400 flex flex-col items-center'>
                <img className='p-3' alt={`jackpot${level}`} src={`assets/${environment.assetPrefix}/${JackpotMap[level].image}`}/>
                <div>Nível Mega Jackpot: {JackpotMap[level].label}</div>
                <div>Ou numerário de valor equivalente</div>
              </div>
            )
          }

          <ul className={isMobile?'relative list-decimal pl-5':''}>
            <li className={isMobile?'absolute top-0 left-[-10000px]':''}>Recompensa de atualização： R$ {
              (upRewardAmout ? upRewardAmout / 100 : 0).toLocaleString('en-Us', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </li>
            <li>Recompensa total de check-in de 7 dias： {signInBonus.toFixed(2)}</li>
            <li>Limite máximo de retirada única： R$ {
              (withdrawAmountLimitDay ? withdrawAmountLimitDay / 100 : 0).toLocaleString('en-Us', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</li>
            <li>Número de retiradas por dia： {withdrawTimesLimitDay}</li>
          </ul>

        </div>
      </div>
      <div className={tcx(
          'w-2/5',
          ['w-full bg-table-main p-2 rounded-md mt-2', isMobile],
          ['hidden', isMobile && level === 0]
      )}>
        <div className={tcx('text-2xl text-left', ['text-lg', isMobile])}>Condição</div>
        <div>Quantidade total de recarga: R$ {
          (rechargeAmountLimit ? rechargeAmountLimit / 100 : 0).toLocaleString('en-Us', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</div>
        <div>Número total de apostas: R$ {
          (flowLimit ? flowLimit / 100 : 0).toLocaleString('en-Us', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</div>
      </div>
    </div>
  )
}

export default LevelInfoCard;
