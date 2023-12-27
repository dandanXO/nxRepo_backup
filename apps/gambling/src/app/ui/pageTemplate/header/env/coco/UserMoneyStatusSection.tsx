import React from "react";
import {ThreeDots} from "react-loading-icons";
import cx from "classnames";
import {PersonalControl} from "./PersonalControl";
import {useUserMoneyStatusSection} from "../../hooks/useUserMoneyStatusSection";
import {formatLocaleMoney} from "../../../../utils/format";
import {environment} from "../../../../../../environments/environment";

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
    <PersonalControl className={cx("px-3 flex flex-row justify-between items-center gap-2 h-8 md:h-11", props.className)}>
      <button className={"refresh"} onClick={() => {
        update();
      }}>
        <img alt={"refresh"} className={"w-[24px] h-[24px]"} src={`assets/${environment.assetPrefix}/ic_refresh.png`}/>
      </button>
      {/*main-secondary-main*/}
      <div className={"flex-auto text-white text-center  justify-center md:text-lg flex md:justify-start basis-1/2 font-medium"}>{
        isUserMoneyStatusLoading ? <ThreeDots className={'w-1/2'} /> : `R$ ${formatLocaleMoney(totalBalanceSheetValue)}`
      }</div>
      <button onClick={()=>onClickToWallet({'panelType':'deposit'})}>
        <img alt={"add"} className={"w-[24px] h-[24px]"} src={`assets/${environment.assetPrefix}/ic_add.png`}/>
      </button>
    </PersonalControl>
  )
}
