import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";

import { clearLoginLocalStorage } from "../../persistant/setLoginLocalStorage";
import {appSlice} from "../../reduxStore/appSlice";
import styled from "styled-components";
import {RootState} from "../../reduxStore";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {userLogout} from "../../usecase/userLogout";


const CancelButton = styled.button`
  border-radius: 25px;
  font-size: 14px;
  //background: linear-gradient(180deg,#49524B 0%,#9CB7AA 100%);
  background: #CFCFCF;
  //box-shadow: 0 2px #303e32, inset 0 1px 3px rgba(255,255,255,.5);
  margin: 0 12px;
  letter-spacing: 0;
`
const ConfirmButton = styled.button`
  font-size: 14px;
  background: linear-gradient(180deg,#C8F568 0%,#16FF8F 99%);
  //box-shadow: 0 2px #036a02,inset 0 1px 3px rgba(255,255,255,.5)!important;
  border-radius: 25px;
  margin: 0 12px;
  letter-spacing: 0;
  text-shadow: 0 1px 2px #036A02;
`


type ILogoutPopover = {
  className?: string;
}

export const LogoutSection = (props: ILogoutPopover) => {
  // const {logout} = useLogoutPopoverPresenter();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onHandleCancel = () => {
    dispatch(appSlice.actions.showMobileLogoutModal(false));
  }
  const onHandleLogout = () => {
    // dispatch(appSlice.actions.setIsLogin(false));
    // clearLoginLocalStorage();
    userLogout();
    dispatch(appSlice.actions.showMobileLogoutModal(false));
    navigate(PageOrModalPathEnum.IndexPage);
  }

  return (
    <div className={cx("flex flex-col", props.className)}>
      <div className={"mb-2 text-[#FBFF3F]"}>Tem certeza que deseja sair?</div>
      <div className={"flex flex-row justify-center"}>
        <CancelButton className={"px-2 py-1 text-[#ffffff]"} onClick={onHandleCancel}>Cancelar</CancelButton>
        <ConfirmButton className={"px-2 py-1 text-[#047A70]"} onClick={onHandleLogout}>Confirme</ConfirmButton>
      </div>
    </div>
  )
}
