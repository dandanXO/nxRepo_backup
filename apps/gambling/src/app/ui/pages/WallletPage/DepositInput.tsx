import { RechargeResponseConfig } from "../../../external/RechargeInfoGetEndpoint";

import {renderByPlatform} from "../../utils/renderByPlatform";
import {DepositInput as PDepositInput} from "./env/pernambucana/DepositInput";
import {DepositInput as WDepositInput} from "./env/wild/DepositInput"
import {DepositInput as CDepositInput} from "./env/coco/DepositInput";
import {InputValue} from "../../components/Inputs/Input";
import { formatLocaleMoney } from "../../utils/format";

interface IDepositInput {
  minimunValue: number;
  maximunValue: number;
  inputValue: InputValue<string>;
  setInputValue: (value: InputValue<string>) => void;
  selectedIndexConfig?: RechargeResponseConfig;
}

export const DepositInput = (props: IDepositInput) => {
  const { inputValue, setInputValue, selectedIndexConfig } = props;
  const isShowInputTag = selectedIndexConfig && Number(selectedIndexConfig?.rate) > 0
  const extraDepositBonus = formatLocaleMoney(Number(inputValue.data) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1));

  return renderByPlatform({
    "wild777bet": (
      <WDepositInput inputValue={inputValue} setInputValue={setInputValue} isShowInputTag={isShowInputTag} extraDepositBonus={extraDepositBonus} minimunValue={props.minimunValue} maximunValue={props.maximunValue}/>
    ),
    "coco777bet": (
      <CDepositInput inputValue={inputValue} setInputValue={setInputValue} isShowInputTag={isShowInputTag} extraDepositBonus={extraDepositBonus} minimunValue={props.minimunValue} maximunValue={props.maximunValue}/>
    ),
  }, (
    <PDepositInput inputValue={inputValue} setInputValue={setInputValue} isShowInputTag={isShowInputTag} selectedIndexConfig={selectedIndexConfig} extraDepositBonus={extraDepositBonus} minimunValue={props.minimunValue} maximunValue={props.maximunValue}/>
  ))

}
