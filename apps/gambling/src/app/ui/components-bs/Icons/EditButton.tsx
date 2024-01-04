import {tcx} from "../../utils/tcx";
import {environment} from "../../../../environments/environment";
import React from "react";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import {IButton} from "../Buttons/IButton";

export const EditButton = (props: IButton) => {
  const {isMobile} = useBreakpoint();
  return (
    <button
      className={tcx(
        'flex items-center',
        ['bg-transparent rounded-3xl px-3 bg-gradient-to-r from-[#FFA305] to-[#FFCC5A]', !isMobile]
      )}
      onClick={props.onClick}
    >
      {
        isMobile ? (
          <img
            className='w-[20px] h-[20px]'
            alt='edit'
            src={`assets/${environment.assetPrefix}/ic_account_edit.png`}
          />
        ): 'Editar'
      }
    </button>
  )
}
