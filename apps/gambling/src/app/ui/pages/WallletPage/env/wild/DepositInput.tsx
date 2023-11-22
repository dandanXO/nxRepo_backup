import cx from "classnames";
import { MobileInput } from "../../../../components/Inputs/MobileInput";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {InputValue} from "../../../../components/Inputs/Input";

type IDepositInput = {
  inputValue: InputValue<string>;
  setInputValue: (data: InputValue<string>) => void;
  isShowInputTag: boolean | undefined;
  extraDepositBonus: React.ReactNode;
  minimunValue: number;
  maximunValue: number;
}
export const DepositInput = (props: IDepositInput) => {
  const { isMobile } = useBreakpoint();

  return (
    <div className={cx("relative", { 'my-10': !isMobile })}>
      <MobileInput
        type={"number"}
        className={cx({ 'py-2.5 px-4': isMobile })}
        inputClassName={'text-white'}
        value={props.inputValue.data}
        onChange={(event: any) => {
          const inputValue = event.target.value;
          // console.log("inputValue", inputValue);
          // console.log("inputValue.props.minimunValue", props.minimunValue);
          // console.log("inputValue.props.maximunValue", props.maximunValue);
          if(Number(inputValue) < props.minimunValue) {
            props.setInputValue({
              data: inputValue,
              isValidation: false,
              errorMessage: `Depósito mínimo ${props.minimunValue}`
            });
            return;
          } else if(Number(inputValue) > props.maximunValue) {
            props.setInputValue({
              data: inputValue,
              isValidation: false,
              errorMessage: `O valor máximo de recarga é ${props.maximunValue}`
            });
            return;
          } else {
            props.setInputValue({
              data: inputValue,
              isValidation: true,
              errorMessage: ""
            });
          }
        }}
        placeholder={`Depósito mínimo ${props.minimunValue}`}
        validation={props.inputValue.isValidation}
        errorMessage={props.inputValue.errorMessage}
      />
      {props.isShowInputTag &&
        (<div className={cx(`absolute top-0 right-0`,
          {
            'text-base px-2 text-white bg-[#FC8038] rounded-tr-[10px] rounded-bl-[10px] rounded-tl-none rounded-tbrnone': !isMobile,
            'text-xs pt-0.5 pr-1  text-[#fbd81e] bg-gradient-to-r from-[transparent] via-[#FF3838] to-[#FF3838] rounded-tr-lg': isMobile
          })
        }>
          + R$ {props.extraDepositBonus}
        </div>)}
    </div>
  )
}
