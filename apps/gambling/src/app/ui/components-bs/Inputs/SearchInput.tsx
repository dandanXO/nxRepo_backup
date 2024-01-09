
import { SearchOutlined } from "@ant-design/icons";
import { Input as DesktopInput, IInput, InputValue } from "./Input";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import { MobileInput } from "./MobileInput";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {SearchInput as CSearchInput} from "./env/coco/SearchInput";
import {SearchInput as WSearchInput} from "./env/wild/SearchInput";
import {SearchInput as PSearchInput} from "./env/pernambucana/SearchInput";
import {SearchInput as RSearchInput} from "./env/riojungle/SearchInput";

export const SearchInput = (props: IInput) => {
  return renderByPlatform({
    "u1": (
      <CSearchInput {...props}/>
    ),
    "wild777bet": (
      <WSearchInput {...props}/>
    ),
    "riojungle777bet": (
      <RSearchInput {...props}/>
    )
  }, <PSearchInput {...props}/>)
}
