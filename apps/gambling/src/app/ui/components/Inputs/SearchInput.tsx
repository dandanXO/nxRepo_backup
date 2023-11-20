
import { SearchOutlined } from "@ant-design/icons";
import { Input as DesktopInput, IInput, InputValue } from "./Input";
import useBreakpoint from "../../hooks/useBreakpoint";
import { MobileInput } from "./MobileInput";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {SearchInput as CSearchInput} from "./env/coco/SearchInput";
import {SearchInput as WSearchInput} from "./env/wild/SearchInput";
import {SearchInput as PSearchInput} from "./env/pernambucana/SearchInput";
export const SearchInput = (props: IInput) => {
  return renderByPlatform({
    "coco777bet": (
      <CSearchInput {...props}/>
    ),
    "wild777bet": (
      <WSearchInput {...props}/>
    )
  }, <PSearchInput {...props}/>)
}
