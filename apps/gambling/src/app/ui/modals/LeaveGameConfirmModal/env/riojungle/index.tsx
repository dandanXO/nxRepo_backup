import { ILeaveGameConfirmModalProps } from "../../index";
import { environment } from "../../../../../../environments/environment";
import { CheckBox } from "../../../../components/CheckBox";
import React, { useState } from "react";


export const LeaveGameConfirmModal = ({
  onConfirm,
  onClose
}: ILeaveGameConfirmModalProps) => {
  const [addFavorite, setAddFavorite] = useState(false)

  return (
    <div className='relative text-white rounded-2xl w-[90%] sm:w-[400px] lg:w-[480px] pt-[52px] px-4 sm:px-6 pb-4 sm:pb-6 lg:pb-8 bg-gradient-to-br from-[var(--liner-main-from)] to-[var(--liner-main-to)]'>
      <img
        alt='close'
        className='cursor-pointer absolute top-2 right-2 w-12 h-12' src={`assets/${environment.assetPrefix}/WXCircle.png`}
        onClick={onClose}
      />
      <div className='text-base sm:text-xl lg:text-3xl font-medium'>Deixar</div>

      <div className='text-sm lg:text-lg mt-2 sm:mt-3'>Tem certeza de que deseja sair do jogo atual?</div>

      <div className='text-sm lg:text-lg mt-5 p-2 lg:p-3 border-[rgba(255,255,255,0.2)] shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-[rgba(0,0,0,0.1)] flex items-center gap-2 w-full border-2 rounded-lg'>
        <CheckBox className='w-6 h-6' checked={addFavorite} onClick={()=> setAddFavorite(!addFavorite)} />
        <div>Adicione este jogo aos favoritos</div>
      </div>

      <div className='w-full flex justify-between gap-3 sm:gap-5 mt-5 lg:mt-10'>
        <button
          className='w-full rounded-lg py-[10px] sm:py-3 lg:py-[14px] text-sm sm:text-base lg:text-xl bg-[var(--secondary-main)] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'
          onClick={onClose}
        >
          Concelar
        </button>
        <button
          className='w-full rounded-lg py-[10px] sm:py-3 lg:py-[14px] text-sm sm:text-base lg:text-xl bg-[var(--primary-main)] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'
          onClick={()=>onConfirm(addFavorite)}
        >
          Confirme
        </button>
      </div>
    </div>
  )
}
