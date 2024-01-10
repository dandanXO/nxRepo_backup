import { useState } from "react";
import { formatLocaleMoney } from "../../../utils/format";
import { InputValue } from "../../../components-bs/Inputs/Input";
import { IDepositPanel } from "../components/deposit/DepositPanel";




export const useDepositInput = (props: IDepositPanel) => {
  const [inputValue, setInputValue] = useState<InputValue<string>>({
    data: "",
    isValidation: true,
    errorMessage: "",
  });
  const { recharge_options_default = 0, recharge_options = [] } = props?.data?.options || {};

  const minimunValue = recharge_options[0] || 0
  const maximunValue = props.data?.config && props.data?.config[props.data?.config.length - 1] ? Number(props.data?.config && props.data?.config[props.data?.config.length - 1].amount_max) : 0

  const onChange = (event: any) => {
    const inputValue = event.target.value;
    if (Number(inputValue) < minimunValue) {
      setInputValue({
        data: inputValue,
        isValidation: false,
        errorMessage: `Depósito mínimo R$ ${minimunValue}`
      });
      return;
    } else if (Number(inputValue) > maximunValue) {
      setInputValue({
        data: inputValue,
        isValidation: false,
        errorMessage: `O valor máximo de recarga é ${maximunValue}`
      });
      return;
    } else {
      setInputValue({
        data: inputValue,
        isValidation: true,
        errorMessage: ""
      });
    }
  }

  return {
    inputValue,
    setInputValue,
    onChange,
    minimunValue,
    maximunValue
  }
}
