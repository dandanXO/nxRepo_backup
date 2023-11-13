import styled from "styled-components";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {appStore, RootState} from "../../../reduxStore";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {IUserStore} from "../../../gateway/socket";
import {appSlice, totalBalanceSheetSelector} from "../../../reduxStore/appSlice";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {ThreeDots, Bars, BallTriangle, Grid, Oval, Puff, Rings, TailSpin} from "react-loading-icons";
import {environment} from "../../../../environments/environment";
import cx from "classnames";

export const PersonalControl = styled.div`
  background-color: var(--medium);
  width: 178px;
  height: 32px;
`

type IProps = {
  className?: string;
}
export const UserMoneyStatusSection = (props: IProps) => {
  const navigate = useNavigate();

  // const { userAmount } = useSelector((state: RootState) => state.app.userStore as IUserStore)
  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  // console.log("userAmount", userAmount);
  // const [triggerRefreshBalance, {currentData}] = useLazyGetSimpleBalanceQuery()

  // useEffect(() => {
  //   triggerRefreshBalance({});
  // }, [])

  const {updateBalance} = useAutoUpdateBalance();
  const isUserMoneyStatusLoading = useSelector((state: RootState) => state.app.isUserMoneyStatusLoading)
  return (
    <PersonalControl className={cx("px-3 flex flex-row justify-between items-center md:scale-[1.6]", props.className)}>
      <button className={"refrsh"} onClick={() => {
        updateBalance();
      }}>
        <img alt={"refresh"} className={"w-[20px] h-[20px]"} src={`assets/${environment.assetPrefix}/ic_refresh.png`}/>
      </button>
      {/*main-secondary-main*/}
      <div className={"flex-auto text-white sm:text-center md:text-left md:text-xs flex justify-center basis-1/2 font-bold"}>{
        isUserMoneyStatusLoading ? <ThreeDots className={'w-1/2'} /> : `R$${totalBalanceSheetValue}`
      }</div>
      <button onClick={() => {
        navigate(PageOrModalPathEnum.WalletPage);
      }}>
        <img alt={"add"} className={"w-[20px] h-[20px]"} src={`assets/${environment.assetPrefix}/ic_add.png`}/>
      </button>
    </PersonalControl>
  )
}
