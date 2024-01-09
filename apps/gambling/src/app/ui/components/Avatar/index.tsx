import {AppLocalStorage} from "../../../persistant/localstorage";
import cx from "classnames";
import {environment} from "../../../../environments/environment";
import React from "react";
import { tcx } from "../../utils/tcx";
import {IUserInfo} from "../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";

export const Avatar = (props: {
  onClickToPopupUserInfoStatusPopover?: () => void;
  big?: boolean;
  className?: string;
}) => {

  const userInfo: IUserInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')

  return (
    // <div className={cx("relative", {
    //   "w-[56px] h-[64px] min-w-[56px] min-h-[64px]}": !props.big,
    //   "w-[82px] h-[95px]": props.big,
    // })}>
      <div
        className={"relative"}
        onClick={() => {
          props.onClickToPopupUserInfoStatusPopover && props.onClickToPopupUserInfoStatusPopover()
        }}
      >
        {/*<img className={cx({*/}
        {/*  "w-[56px] h-[64px] min-w-[56px] min-h-[64px]}": !props.big,*/}
        {/*  "w-[82px] h-[95px]": props.big,*/}
        {/*})} alt="avatar" src={`assets/${AvatarSrcMap[userInfo.avatar || 1]}`}/>*/}
        <img
          className={tcx("rounded-full",
            ["w-[44px] h-[44px] min-w-[44px] min-h-[44px]}", !props.big],
            ["w-[82px] h-[82px]", !!props.big],
            props.className
          )}
          alt="avatar"
          src={`assets/${environment.uVersion}/avatar_${userInfo.avatar || 1}.png`}
        />
        {/*<AvatarBorder/>*/}
      </div>
    /*</div>*/
  )
}
