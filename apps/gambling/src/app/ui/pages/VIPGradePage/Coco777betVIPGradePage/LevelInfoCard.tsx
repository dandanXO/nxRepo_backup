import React from "react";
import { GetUserVIPAllInfoResponseData } from "../../../../external";
import { tcx } from "../../../utils/tcx";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { environment } from "../../../../../environments/environment";

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
        'p-2 border-2 border-purple-400 rounded-md flex text-white bg-table-varient text-left text-lg',
        ['flex-col text-sm', isMobile],
        className,
      )}>
      <div className={tcx('flex w-3/5', ['w-full', isMobile])}>
        <div className={tcx(
            'p-4 flex flex-col items-center justify-center',
            ['p-0', isMobile],
            ['w-[24%]', !isMobile]
        )}>
          <img
            src={`assets/${environment.assetPrefix}/icon_vip_info.png`}
            className={tcx("p-2", ['w-32', isMobile])}
          />
          <div className={isMobile?'text-2xl':'text-4xl'}>VIP {level}</div>
        </div>
        <div>
          <div className={isMobile?'text-lg':'text-3xl'}>Privilégio</div>
          <div>Recompensa de atualização： R$ {
            (upRewardAmout ? upRewardAmout / 100 : 0).toLocaleString('en-Us', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div>Recompensa total de check-in de 7 dias： {signInBonus}</div>
          <div>Limite máximo de retirada única： R$ {
            (withdrawAmountLimitDay ? withdrawAmountLimitDay / 100 : 0).toLocaleString('en-Us', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</div>
          <div>Número de retiradas por dia： {withdrawTimesLimitDay}</div>
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
