import {useCallback} from "react";
import {ThreeDots} from "react-loading-icons";
import cx from "classnames";
import {PersonalControl} from "./PersonalControl";
import {useUserMoneyStatusSection} from "../../hooks/useUserMoneyStatusSection";
import {formatLocaleMoney} from "../../../../utils/format";
import {environment} from "../../../../../../environments/environment";
import { debounce } from "lodash";

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
  const debouncedOnUpdate = useCallback(
    debounce(update, 1000), // 500ms的去抖动时间
    [] // 依赖项数组，空数组意味着该函数在组件的生命周期内不会改变
  );
  return (
    <PersonalControl className={cx("px-3 flex flex-row justify-between items-center gap-2 h-8 md:h-11", props.className)}>
      <button className={"refresh"} onClick={() => {
        debouncedOnUpdate()
      }}>
        <img alt={"refresh"} className={"w-[24px] h-[24px]"} src={`assets/${environment.uVersion}/ic_refresh.png`}/>
      </button>
      {/*main-secondary-main*/}
      <div className={"flex-auto text-white text-center  justify-center md:text-lg flex md:justify-start basis-1/2 font-medium"}>{
        isUserMoneyStatusLoading ? <ThreeDots className={'w-1/2'} /> : `R$ ${formatLocaleMoney(totalBalanceSheetValue)}`
      }</div>
      <button onClick={()=>onClickToWallet({'panelType':'deposit'})}>
        <img alt={"add"} className={"w-[24px] h-[24px]"} src={`assets/${environment.uVersion}/ic_add.png`}/>
      </button>
    </PersonalControl>
  )
}
