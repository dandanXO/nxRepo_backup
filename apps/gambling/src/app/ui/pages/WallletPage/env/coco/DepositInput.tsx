import cx from 'classnames';
import React from 'react';

import { InputValue } from '../../../../components/Inputs/Input';
import { MobileInput } from '../../../../components/Inputs/MobileInput';
import useBreakpoint from '../../../../hooks/useBreakpoint';

type IDepositInput = {
  inputValue: InputValue<string>;
  setInputValue: (data: InputValue<string>) => void;
  isShowInputTag: boolean | undefined;
  extraDepositBonus: React.ReactNode;
  minimunValue: number;
  maximunValue: number;
};
export const DepositInput = (props: IDepositInput) => {
  const { isMobile } = useBreakpoint();

  return (
    <div className={cx('relative')}>
      <MobileInput
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === '.' || e.key === 'e' || e.key === '-') {
            e.preventDefault();
          }
        }}
        type={'number'}
        inputmode="numeric"
        className={cx({ 'py-2.5 px-4': isMobile })}
        inputClassName={'text-white'}
        value={props.inputValue.data}
        onChange={(event: any) => {
          const inputValue = event.target.value;
          // console.log("inputValue", inputValue);
          // console.log("inputValue.props.minimunValue", props.minimunValue);
          // console.log("inputValue.props.maximunValue", props.maximunValue);
          if (Number(inputValue) < props.minimunValue) {
            props.setInputValue({
              data: inputValue,
              isValidation: false,
              errorMessage: `Depósito mínimo ${props.minimunValue}`,
            });
            return;
          } else if (Number(inputValue) > props.maximunValue) {
            props.setInputValue({
              data: inputValue,
              isValidation: false,
              errorMessage: `O valor máximo de recarga é ${props.maximunValue}`,
            });
            return;
          } else {
            props.setInputValue({
              data: inputValue,
              isValidation: true,
              errorMessage: '',
            });
          }
        }}
        validation={props.inputValue.isValidation}
        errorMessage={props.inputValue.errorMessage}
      />
      {props.isShowInputTag && (
        <div
          className={cx(`
          absolute top-0 right-0
          px-2 py-1
          text-xs md:text-xl text-[var(--primary-variant)]
          bg-[var(--background-add-money)]
          rounded-tr-[10px] rounded-bl-[10px] rounded-tl-none rounded-tb-none
        `)}
        >
          + R$ {props.extraDepositBonus}
        </div>
      )}
    </div>
  );
};
