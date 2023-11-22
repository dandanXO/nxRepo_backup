import cx from "classnames";
import {MobileInput} from "../../../../components/Inputs/MobileInput";
import {Input, InputValue} from "../../../../components/Inputs/Input";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import styled from "styled-components";
import {environment} from "../../../../../../environments/environment";

const InputTag = styled.div`
  position: absolute;
  top: -24px;
  right: -10px;
  border-radius: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 0 8px;
  height: 96px;
  color: #fff;
  min-width: 117px;
  z-index: 1;
  background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  background-repeat: no-repeat;
  background-position: center center;
`;

const MobileTag = styled(InputTag)`
  background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  background-size: 82px;
  background-position: center 23px;
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: -27px;
`


interface IDepositInput {
  inputValue: InputValue<string>;
  setInputValue: (data: InputValue<string>) => void;
  isShowInputTag: boolean | undefined;
  extraDepositBonus: React.ReactNode;
  selectedIndexConfig: any;
  minimunValue: number;
  maximunValue: number;
}

export const DepositInput = (props: IDepositInput) => {
  const { isMobile } = useBreakpoint();

  const onInputValueChange = (event: any) => {
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
  }
  return (
    (
      <div className={cx("relative", { 'my-10': !isMobile })}>
        {isMobile ? (
          <MobileInput
            value={props.inputValue} className={"w-full h-[35px] bg-white !py-0 border-white"}
            onChange={onInputValueChange}
            validation={props.inputValue.isValidation}
            errorMessage={props.inputValue.errorMessage}
          />
        ) : (
          <Input value={props.inputValue} className={"w-full bg-white border-white"} themeStyle={"normal"}
                 onChange={onInputValueChange}
                 validation={props.inputValue.isValidation}
                 errorMessage={props.inputValue.errorMessage}
          />
        )}
        {
          props.isShowInputTag && parseFloat(props.selectedIndexConfig?.rate) > 0 &&
          (
            isMobile ? (
              <MobileTag className={"text-base font-bold"}>
                <span className="pr-1">+ </span> <span>{props.extraDepositBonus}</span>
              </MobileTag>
            ) : (
              <InputTag className={cx({
                // "background-[linear-gradient(90deg,#FFF600 0%,#4FFB0C 100%)]": isMobile,
              })}
              >
                <span className="pr-1">+ </span> <span>{props.extraDepositBonus}</span>
              </InputTag>
            )
          )
        }
      </div>
    )
  )
}
