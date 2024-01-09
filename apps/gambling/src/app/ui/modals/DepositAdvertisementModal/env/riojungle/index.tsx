import { environment } from "../../../../../../environments/environment";
import { CloseICON } from "../../../../components-bs/Icons/CloseICON";
import React from "react";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";
import { IDepositAdvertisementModalProps } from "../../index";

export const DepositAdvertisementModal = ({
  onConfirm,
  close
}: IDepositAdvertisementModalProps) => {
  const { isMobile } = useBreakpoint();
  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate);

  return (
    <div
      className='relative flex flex-col items-center text-white rounded-2xl bg-gradient-to-br from-[var(--liner-main-from)] to-[var(--liner-main-to)] w-4/5 sm:w-[320px] lg:w-[480px] p-6 text-center'
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <img
        alt='close'
        className='absolute cursor-pointer top-2 right-2 w-12' src={`assets/${environment.uVersion}/WXCircle.png`}
        onClick={()=>close()}
      />
      <img
        alt='genie'
        src={`assets/${environment.uVersion}/${environment.assetVersionPrefix}/deposit-genie.png`}
        className='w-3/5 -mt-[50px] sm:-mt-[50px]'
      />

      <div className='mt-2 sm:mt-3 lg:mt-5 font-medium text-base sm:text-xl lg:text-3xl'>Equilíbrio insuficiente!</div>

      <div className='mt-2 lg:mt-3 text-sm lg:text-lg'>
        Caros clientes VIP, você pode obter até {recharge_first_cashback_rate} de recompensa ao recarregar. Quanto mais você recarrega, mais bônus você recebe! Sem limite de tempo!
      </div>

      <button
        className='mt-5 py-[10px] sm:py-[12px] lg:py-[14px] text-sm sm:text-base lg:text-xl bg-[var(--primary-main)] rounded-lg shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] w-full'
        onClick={onConfirm}
      >
        Depósito
      </button>

    </div>
  )
}
