import { ILeaveGameConfirmModalProps } from "../../index";
import { tcx } from "../../../../utils/tcx";
import { CheckBox } from "../../../../components/CheckBox";
import { GameLeaveCancelButton } from "../../../../components-bs/theme/Buttons/GameLeaveCancelButton";
import { GameLeaveConfirmButton } from "../../../../components-bs/theme/Buttons/GameLeaveConfirmButton";
import React, { useState } from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";


export const LeaveGameConfirmModal = ({
  onClose,
  onConfirm
}: ILeaveGameConfirmModalProps) => {
  const [addFavorite, setAddFavorite] = useState(false)
  const { isMobile } = useBreakpoint();

  return (
    <div className={tcx(
      'text-2xl py-7 px-8 w-[618px] gap-6 text-white font-medium flex flex-col bg-gradient-to-b from-[var(--background-modal-from)] to-[var(--background-modal-to)] border-2 border-[var(--stroke-modal)] rounded-xl',
      ['text-sm py-4 px-5 w-[328px] h-[208px] gap-3', isMobile])}>
      <div className={tcx('font-extrabold text-4xl', ['text-base', isMobile])}>Deixar</div>
      <div>Tem certeza de que deseja sair do jogo atual?</div>
      <div className={
        tcx(
          'py-3 px-2 flex items-center gap-2 rounded-lg bg-[var(--primary-variant)]',
          ['py-1 px-2', isMobile]
        )
      }>
        <CheckBox className='w-6 h-6' checked={addFavorite} onClick={()=> setAddFavorite(!addFavorite)} />
        <div>Adicione este jogo aos favoritos</div>
      </div>

      <div className={tcx('flex gap-4', ['gap-[14px]', isMobile])}>
        <GameLeaveCancelButton onClick={onClose}/>
        <GameLeaveConfirmButton onClick={()=>onConfirm(addFavorite)} />
      </div>
    </div>
  )
}
