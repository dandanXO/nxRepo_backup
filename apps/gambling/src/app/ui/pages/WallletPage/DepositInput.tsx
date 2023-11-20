import { RechargeResponseConfig } from "../../../external/RechargeInfoGetEndpoint";

import {renderByPlatform} from "../../utils/renderByPlatform";
import {DepositInput as PDepositInput} from "./env/pernambucana/DepositInput";
import {DepositInput as WDepositInput} from "./env/wild/DepositInput"
import {DepositInput as CDepositInput} from "./env/coco/DepositInput";

interface IDepositInput {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedIndexConfig?: RechargeResponseConfig;
}

export const DepositInput = (props: IDepositInput) => {
  const { inputValue, setInputValue, selectedIndexConfig } = props;
  const isShowInputTag = selectedIndexConfig && Number(selectedIndexConfig?.rate) > 0
  const extraDepositBonus = (Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(2).toString();

  return renderByPlatform({
    "wild777bet": (
      <WDepositInput inputValue={inputValue} setInputValue={setInputValue} isShowInputTag={isShowInputTag} extraDepositBonus={extraDepositBonus}/>
    ),
    "coco777bet": (
      <CDepositInput inputValue={inputValue} setInputValue={setInputValue} isShowInputTag={isShowInputTag} extraDepositBonus={extraDepositBonus}/>
    ),
  }, (
    <PDepositInput inputValue={inputValue} setInputValue={setInputValue} isShowInputTag={isShowInputTag} extraDepositBonus={extraDepositBonus} selectedIndexConfig={selectedIndexConfig}/>
  ))

}
