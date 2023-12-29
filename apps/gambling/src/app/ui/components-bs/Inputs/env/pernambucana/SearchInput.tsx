import {SearchOutlined} from "@ant-design/icons";
import {IInput, Input as DesktopInput} from "../../Input";

export const SearchInput = (props: IInput) => {
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
