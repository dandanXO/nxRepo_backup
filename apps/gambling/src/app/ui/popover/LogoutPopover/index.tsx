import cx from "classnames";
import styled from "styled-components";
import {appSlice} from "../../../reduxStore/appSlice";
import {useDispatch} from "react-redux";
import {clearLoginLocalStorage} from "../../../persistant/setLoginLocalStorage";
import {LogoutSection} from "../../components/LogoutSection";

type ILogoutPopover = {
  close: () => void;
}
export const LogoutPopover = (props: ILogoutPopover) => {

  return (
    <div className={cx("fixed right-[10px] top-[100px] z-30 w-[240px] bg-[var(--assistant)] rounded-xl p-[10px] flex flex-col flex-between text-sm",
      "text-white", {
    })}>
      <LogoutSection />
    </div>
  )
}
