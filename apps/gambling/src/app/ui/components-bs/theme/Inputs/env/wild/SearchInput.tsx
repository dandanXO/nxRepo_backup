import {SearchOutlined} from "@ant-design/icons";
import {IInput, Input as DesktopInput} from "../../Input";
import {MobileInput} from "../../MobileInput";
import useBreakpoint from "../../../../../hooks/useBreakpoint";

export const SearchInput = (props: IInput) => {
  const { isMobile } = useBreakpoint();
  const Input = isMobile ? MobileInput : DesktopInput;
  return (
    <Input prefix={<SearchOutlined className={"mr-2 text-[#6c7083]"} />} {...props} />
  )
}
