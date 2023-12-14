import styled from "styled-components";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {appStore, RootState} from "../../../reduxStore";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {totalBalanceSheetSelector} from "../../../reduxStore/appSlice";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {ThreeDots, Bars, BallTriangle, Grid, Oval, Puff, Rings, TailSpin} from "react-loading-icons";
import {environment} from "../../../../environments/environment";
import cx from "classnames";
import { formatLocaleMoney } from "../../utils/format";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import {PersonalControl} from "./PersonalControl";

type IProps = {
  className?: string;
}
export const UserMoneyStatusSection = (props: IProps) => {
  const {onClickToWallet} = usePageNavigate();

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);

  const { update } = useAutoUpdateBalance({
    autoWindowFocusRefresh: false,
  });

  const isUserMoneyStatusLoading = useSelector((state: RootState) => state.app.isUserMoneyStatusLoading)

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
