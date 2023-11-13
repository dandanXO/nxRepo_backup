
import { SearchOutlined } from "@ant-design/icons";
import { Input as DesktopInput, IInput, InputValue } from "../../../components/Input";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { MobileInput } from "../../../components/MobileInput";
import { environment } from "apps/gambling/src/environments/environment";
export const SearchInput = (props: IInput) => {
  const { isMobile } = useBreakpoint();

  const Input = isMobile ? MobileInput : DesktopInput;

  if (environment.assetPrefix === "coco777bet") {
    return (
      <DesktopInput
        className={`py-1.5 px-2.5 text-xs border-none bg-[#1d579dc4] rounded 
        border border-solid border-[#50a6e6c4]  `}
        inputClassName={"placeholder:text-white text-sm text-white "}
        prefix={<SearchOutlined className={"text-[#969799] text-sm mr-2"} />}
        {...props}
      />
    )
  }
  return (
    <Input prefix={<SearchOutlined className={"mr-2 text-[#6c7083]"} />} {...props} />
  )
}