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

export const PersonalControl = styled.div`
  background: url("assets/001/balance_di.png") no-repeat center/100% 100%;
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
        <img alt={"refresh"} className={"w-[20px] h-[20px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0RTU5NjRGNjk5MjExRUVBNTcyQjA1NzM0QTQ5N0ZBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0RTU5NjUwNjk5MjExRUVBNTcyQjA1NzM0QTQ5N0ZBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzRFNTk2NEQ2OTkyMTFFRUE1NzJCMDU3MzRBNDk3RkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzRFNTk2NEU2OTkyMTFFRUE1NzJCMDU3MzRBNDk3RkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5UUw/HAAAC9UlEQVR42syYbWhOYRjHz/OMTD7YJ4Ttgw9DGk/sA5rW5GWjUWJKeSvSbFZ88DJFNmOfUPSIEjVE7Iu2TEoJScjS02aFpXj4oLw0r9ke/7v9Tz1O577Pfc5zO52rfnU6577P+Z9zX9d1X9eJZTIZK2o2Ima1+J2zFCwGc8EckO8y5gO4C56Dq+CVnwfErMxh3bHrwGawKMDLnwdJ8ERncFxjzCS+7aWAgiy+zGPQakLUSpACNYbcZQ/FzVL6lOJaHTjl8ZB3XJK3QETMeDAPTFbMKQXdYA247nI9TyZqLzgqufYJnKYj3wF/nDcFy8BysE0h7hqvn806tws0uDl6PTgpudFxcAR81FyumWAH2KIYI/z0J/2tzC36qsENyeTVoD2gL4mlagOj/Dp6hUTQEHNSew4OLpZqNkj7FSWLiHLwyEDk9TC9pP2IOgFWgNdZ57aD+4bSwQRwQLIDeGZ0MekyKAALDYiZCDaB3WCs1t7nck5EwiqD+6uI5n1+JsSt/2+tTAvpKIn6yp2hmDkuEqJs+wb2gxJwwUtUAswPUVyKVUO1LLKFKFHlPQDHuKGGZR1gAbegfqeozzzeCV6wvAjTzoHpzGFDtqjBrAEFjJZnzC1h2S/QDKaCgzJHT7CE7bB37pDsJWjyij5RE91jzVMUljLdlLAV9HHdR0ZFlL0nHgK/ubyREGVbG0tiE5Z0K5l0RQ2Ai7zBBvDGgCCRF2sZ6fVBRHWB9ex4TVgN8+Jw+TTcE4iAmuJHVBWd3YRVsLl1WhnbNG1RY5gWWnIUtJZtmZuV2NtN3E7ttF72Yt2SiY3gFhuJIHXVFcVyprJ9qpjHIgfN4Bep5J8TN1sCHnLP8vq3UMgGs1exp9ax2/mnRhc3/sIe3/lj4yY/q8qEgz4F73mf0WAcmMbyRPVrwNkha/0KyuMX2Wg4P/5gg9oZJHkOsloQn/i7IUFdbOc7c83oSdY8yRzE9DFJVrEa8NX3eVmCvlKpUUYPMFpvgzO6D/grwAAD0JseseHDKwAAAABJRU5ErkJggg=="}/>
      </button>
      <div className={"flex-auto text-white sm:text-center md:text-left md:text-xs flex justify-center basis-1/2"}>{
        isUserMoneyStatusLoading ? <ThreeDots className={'w-1/2'} /> : `R$${totalBalanceSheetValue}`
      }</div>
      <button onClick={() => {
        navigate(PageOrModalPathEnum.WalletPage);
      }}>
        <img alt={"add"} className={"w-[20px] h-[20px]"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg3ODkxNEFBNjk5MjExRUU4Qzk2RTBEMEVBOEIxQUIwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg3ODkxNEFCNjk5MjExRUU4Qzk2RTBEMEVBOEIxQUIwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODc4OTE0QTg2OTkyMTFFRThDOTZFMEQwRUE4QjFBQjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODc4OTE0QTk2OTkyMTFFRThDOTZFMEQwRUE4QjFBQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7ZUkSLAAADTklEQVR42tSZT2wMYRjG35nutlQrghXRDYlGQ6sJN2lQDvU3uEkFIQ4uEgeipEEi/iSUSAgHBwd7kPSGiNKDVKPhIJUoWhGJWEFLU1qq3e6O551+286u3Z3Zb2a20yf5ZS4z3zwz837v+73fKKSdIRuaD9aCpaAMzAWFIAL+gE+gC7wAT8BP2Rv5JK6ZB/aAXaA8i+uioAWEQKN4EMtSsnijQXAC7AX5ZE/d4BK4CgatXKBaOCcPHAZvwX4HTLLmgPPgFVjvhFGOuWZwERSR8yoFD8T4flmji8EzMVnclCK+2B0wLVujFWKWLqDcaSN4JLKGJaM8aZpAgHKvKnBbzIuMRn3ixKDUbWIaKT8G9aMNbQVnzfLocbBSKtB+DZG/voWUcD9pwWKKnKsmbXqBrNk6cB+0pnqji8Ax2ZHVts+6Sd00jmpr2O4Eu27MBEajF4D0K6BILPFO/UN245XL8r5ko1wKt5H3VBcPz7jRA+J1e00Lwbq4UXa8nbyr3XGjK8BsDxvdwHmVja4hb2sGWM5GK8n7WuYTiw/TZM55MjkFJeTRjp7Ea7p6Ke/e+/SD+lWKVZVYLQplvHDuzljXUQ7zDzaPJXMnxRVs+EoNntI04YRUs3Wm0vvXFZPxCqavDcxVZLrC12ZO0Z/cDfG42qyplpu7AZD+bHwWXmBw7c5UFjkm1fZv4xFTESCtMn3W04oLKLYqaOWzswbY6BeztScHfHRzaebGChPHaJRNjtSWO/Xyv/Kn75wE6ekdG+2YBEZfstHHHjfZB9rZ6HPw3cNGuX+LqmKfqNHDRkPG9eg1nqgeNPlBtNBjRt+Au7aG9Kv/5UkHxO3RSHLPdARINzr6AkNUMD7qydyeXoOb491e4m7eKXBSemjR1+tlUbXV2XAYVqdrl1mnwVPp4WFOCxTaNclqMJpMZZTjoRaEJ3AC8Vypt7L3xCY3gZ4JMNkGdtDo7rSpURZvsK4GH3No8qFojVNumWdaj3aKDtXtEssT5zLYAn6nDX+z5RWoETsWAy4ldA6zQ6JCkqxREvHSILZ9boBhBwxyn3ZU7C81WWpbJP4zldDon5GdYEkW1/ED8y72LXL5900qJf8QC4hmMSJChbsH4w+xPtkb/RNgAJam1NznY8ZBAAAAAElFTkSuQmCC"}/>
      </button>
    </PersonalControl>
  )
}
