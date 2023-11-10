import styled from "styled-components";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {appStore, RootState} from "../../../reduxStore";
import {useDispatch, useSelector} from "react-redux";
import {useGetBalanceMutation, useLazyGetSimpleBalanceQuery} from "../../../external";
import React, {useEffect} from "react";
import {IUserStore} from "../../../gateway/socket";
import {appSlice, totalBalanceSheetSelector} from "../../../reduxStore/appSlice";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {ThreeDots, Bars, BallTriangle, Grid, Oval, Puff, Rings, TailSpin} from "react-loading-icons";
import {environment} from "../../../../environments/environment";

export const PersonalControl = styled.div`
  background-color: #069D5C;
  border-radius: 25px;
  width: 178px;
  height: 32px;
`

export const UserMoneyStatusSection = () => {
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
    <PersonalControl className={"px-3 flex flex-row justify-between items-center md:scale-[1.6]"}>
      <button className={"refrsh"} onClick={() => {
        updateBalance();
      }}>
        <img alt={"refresh"} className={"w-[20px] h-[20px]"} src={`assets/${environment.assetPrefix}/ic_refresh.png`}/>
      </button>
      <div className={"flex-auto text-[#ECEC00] sm:text-center md:text-left md:text-xs flex justify-center basis-1/2"}>{
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
