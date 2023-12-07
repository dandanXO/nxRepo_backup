import { SearchOutlined } from "@ant-design/icons";
import { IInput, Input as DesktopInput } from "../../Input";

export const SearchInput = (props: IInput) => {
  return (
    <DesktopInput
      className={"py-1.5 px-3 text-base rounded !border-[var(--primary-assistant)] bg-[var(--background-primary)]"}
      inputClassName={"text-base  placeholder:text-[var(--white-30)]"}
      prefix={<SearchOutlined className={"text-[#969799] text-sm mr-2 flex justify-center items-center"} />}
      {...props}
    />
  )
}
