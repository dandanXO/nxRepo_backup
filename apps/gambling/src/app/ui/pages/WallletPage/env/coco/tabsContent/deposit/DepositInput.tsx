import cx from "classnames";
import { MobileInput } from "../../../../../../components-bs/Inputs/MobileInput";
import useBreakpoint from "../../../../../../hooks/useBreakpoint";
import React from "react";
import { IDepositInput } from "../../../../components/deposit/DepositInput";


export const DepositInput = (props: IDepositInput) => {
  const { isMobile } = useBreakpoint();

  return (
    <div className={cx("relative")}>
      <MobileInput
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=>{
          if (e.key === '.' || e.key === 'e' || e.key === '-') {
            e.preventDefault();
          }
        }}
        type={"number"}
        className={cx({ 'py-2.5 px-4': isMobile })}
        inputClassName={'text-white'}
        value={props.inputValue.data}
        onChange={props?.onChange}
        validation={props.inputValue.isValidation}
        errorMessage={props.inputValue.errorMessage}
      />
      {props.isShowInputTag &&
        (<div className={cx(`
          absolute top-0 right-0
          px-2 py-1
          text-xs md:text-xl text-[var(--primary-variant)]
          bg-[var(--background-add-money)]
          rounded-tr-[10px] rounded-bl-[10px] rounded-tl-none rounded-tb-none
        `)
        }>
          + R$ {props.extraDepositBonus}
        </div>)}
    </div>
  )
}
