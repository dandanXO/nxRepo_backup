import {useDispatch, useSelector} from "react-redux";
import cx from "classnames";

import { clearLoginLocalStorage } from "../../../persistant/setLoginLocalStorage";
import {appSlice} from "../../../reduxStore/appSlice";
import styled from "styled-components";
import {RootState} from "../../../reduxStore";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {userLogout} from "../../../usecase/userLogout";
import {LogoutCancelButton} from "../Buttons/LogoutCancelButton";
import {LogoutConfirmButton} from "../Buttons/LogoutConfirmButton";
import { UserLogoutSection as RioUserLogoutSection } from "./env/u2";
import { renderByUVersion } from "../../utils/renderByUVersion";


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
  background: linear-gradient(180deg,var(--btn-gradient1-from) 0%,var(--btn-gradient1-to) 99%);
  //box-shadow: 0 2px #036a02,inset 0 1px 3px rgba(255,255,255,.5)!important;
  border-radius: 25px;
  margin: 0 12px;
  letter-spacing: 0;
  text-shadow: 0 1px 2px #036A02;
`

export interface IUserLogoutSectionProps {
  onHandleCancel: () => void
  onHandleLogout: () => void
}

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

  return renderByUVersion({
    "u2": (
      <RioUserLogoutSection
        onHandleCancel={onHandleCancel}
        onHandleLogout={onHandleLogout}
      />
    )
  },(
    <div className={cx("flex flex-col text-sm md:text-base", props.className)}>
      <div className={"mb-2 text-[var(--white)]"}>Tem certeza que deseja sair?</div>
      <div className={"flex flex-row justify-center"}>
        <LogoutCancelButton onClick={onHandleCancel}/>
        <LogoutConfirmButton onClick={onHandleLogout}/>
      </div>
    </div>
  ))
}
