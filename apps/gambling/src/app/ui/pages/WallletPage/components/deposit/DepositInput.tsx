import { renderByPlatform } from "../../../../utils/renderByPlatform";
import { DepositInput as PDepositInput } from "../../env/pernambucana/tabsContent/deposit/DepositInput";
import { DepositInput as WDepositInput } from "../../env/wild/tabsContent/deposit/DepositInput"
import { DepositInput as CDepositInput } from "../../env/coco/tabsContent/deposit/DepositInput";
import { DepositInput as RDepositInput } from "../../env/riojungle/tabsContent/deposit/DepositInput";
import { InputValue } from "../../../../components/Inputs/Input";

export interface IDepositInput {
  inputValue: InputValue<string>;
  setInputValue: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  onChange?: (event: any) => void;
  extraDepositBonus?: string;
  isShowInputTag?: boolean;
  minimunValue?: number;
  maximunValue?: number;
}
export const DepositInput = (props: IDepositInput) => {

  return renderByPlatform({
    "wild777bet": (<WDepositInput {...props} />),
    "coco777bet": (<CDepositInput {...props} />),
    "riojungle777bet": (<RDepositInput {...props} />)
  }, (
    <PDepositInput {...props} />
  ))

}
