import { SearchOutlined } from "@ant-design/icons";
import { IInput, Input as DesktopInput } from "../../Input";

export const SearchInput = (props: IInput) => {
  return (
    <DesktopInput
      pureContainer={true}
      className={"py-1.5 px-3 text-base rounded-lg bg-[#1A1A1A]"}
      inputClassName={"text-sm md:text-base lg:text-xl placeholder:text-[var(--white-30)]"}
      prefix={<SearchOutlined className={"text-[#969799] text-lg md:text-2xl lg:text-[28px] mr-2 flex justify-center items-center"} />}
      {...props}
    />
  )
}