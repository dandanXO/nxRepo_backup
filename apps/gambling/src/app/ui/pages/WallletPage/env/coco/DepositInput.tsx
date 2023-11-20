import cx from "classnames";
import { MobileInput } from "../../../../components/Inputs/MobileInput";
import useBreakpoint from "../../../../hooks/useBreakpoint";

type IDepositInput = {
  inputValue: string;
  setInputValue: (value: string) => void;
  isShowInputTag: boolean | undefined;
  extraDepositBonus: React.ReactNode;
}
export const DepositInput = (props: IDepositInput) => {
  const { isMobile } = useBreakpoint();

  return (
    <div className={cx("relative", { 'my-10': !isMobile })}>
      <MobileInput
        type={"number"}
        className={cx({ 'py-2.5 px-4': isMobile })}
        inputClassName={'text-white'}
        value={props.inputValue}
        onChange={(event: any) => {
          // console.log(event.target.value)
          props.setInputValue(event.target.value);
        }}
      />
      {props.isShowInputTag &&
        (<div className={cx(`
          absolute top-0 right-0 
          px-2 py-1
          text-xs md:text-xl text-[var(--primary-variant)] 
          bg-[var(--background-add-money)] 
          rounded-tr-[10px] rounded-bl-[10px] rounded-tl-none rounded-tb-none
        `)
        }>
          + R$ {props.extraDepositBonus}
        </div>)}
    </div>
  )
}
