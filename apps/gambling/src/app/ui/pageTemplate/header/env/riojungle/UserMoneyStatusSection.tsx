import {environment} from "../../../../../../environments/environment";
import {formatLocaleMoney} from "../../../../utils/format";
import {useUserMoneyStatusSection} from "../../hooks/useUserMoneyStatusSection";
import {ThreeDots} from "react-loading-icons";
import refreshICON from "./ArrowsClockwise.svg";
import plusICON from "./icon＿plus.svg";

type IProps = {
  className?: string;
}
export const UserMoneyStatusSection = (props: IProps) => {
  const {
    onClickToWallet,
    totalBalanceSheetValue,
    update,
    isUserMoneyStatusLoading,
  } = useUserMoneyStatusSection();

  return (
    <div className="w-full h-[40px] bg-[#4d4d4d] flex flex-row justify-between items-center rounded-lg"
         // className={twMerge("px-3 flex flex-row justify-between items-center  md:h-11", props.className)}>
    >
      <div className="flex flex-row items-center pl-2 pr-6 py-[6px]">
        <button className="flex flex-row items-start mr-2"
                onClick={() => {
                  update();
                }}
        >
          <img alt={"refresh"} className={"w-[24px] h-[24px]"} src={refreshICON}/>
        </button>

        <div className="flex flex-row items-start">
          <div className="text-sm lg:text-base xl:text-xl font-medium leading-[28px] text-white">
            {isUserMoneyStatusLoading ? <ThreeDots className={'w-1/2'} /> : `R$ ${formatLocaleMoney(totalBalanceSheetValue)}`}
          </div>
        </div>
      </div>

      <button
        id="Headerbtn"
        className="h-full p-2 shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--secondary-main)] flex flex-row  cursor-pointer justify-center items-center rounded-tr-lg rounded-br-lg"
        onClick={()=>onClickToWallet({'panelType':'deposit'})}
      >
        <img alt={"add"} className={"w-[24px] h-[24px]"} src={plusICON}/>
      </button>
    </div>
  )
}
