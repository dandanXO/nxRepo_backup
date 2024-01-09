import { renderByUVersion } from "../../../../utils/renderByUVersion";
import { DepositInput as PDepositInput } from "../../env/pernambucana/tabsContent/deposit/DepositInput";
import { DepositInput as WDepositInput } from "../../env/wild/tabsContent/deposit/DepositInput"
import { DepositInput as CDepositInput } from "../../env/coco/tabsContent/deposit/DepositInput";
import { DepositInput as RDepositInput } from "../../env/riojungle/tabsContent/deposit/DepositInput";
import { InputValue } from "../../../../components-bs/Inputs/Input";

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

  return renderByUVersion({
    "wild777bet": (<WDepositInput {...props} />),
    "u1": (<CDepositInput {...props} />),
    "u2": (<RDepositInput {...props} />)
  }, (
    <PDepositInput {...props} />
  ))

}
