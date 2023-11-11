import {AppLocalStorage} from "../../persistant/localstorage";
import cx from "classnames";
import {environment} from "../../../environments/environment";
import React from "react";

export const Avatar = (props: {
  onClickToPopupUserInfoStatusPopover?: () => void;
  big?: boolean;
}) => {

  const userInfo = JSON.parse(AppLocalStorage.getItem('userInfo') || '{}')

  return (
    // <div className={cx("relative", {
    //   "w-[56px] h-[64px] min-w-[56px] min-h-[64px]}": !props.big,
    //   "w-[82px] h-[95px]": props.big,
    // })}>
    <button className={"relative"} onClick={() => {
      props.onClickToPopupUserInfoStatusPopover && props.onClickToPopupUserInfoStatusPopover()
    }}>
      {/*<img className={cx({*/}
      {/*  "w-[56px] h-[64px] min-w-[56px] min-h-[64px]}": !props.big,*/}
      {/*  "w-[82px] h-[95px]": props.big,*/}
      {/*})} alt="avatar" src={`assets/${AvatarSrcMap[userInfo.avatar || 1]}`}/>*/}
      <img className={cx("rounded-full", {
        "w-[56px] h-[56px] min-w-[56px] min-h-[56px]}": !props.big,
        "w-[82px] h-[82px]": props.big,
      })} alt="avatar" src={`assets/${environment.assetPrefix}/ic_avatar_select.png`}/>
      {/*<AvatarBorder/>*/}
    </button>
    /*</div>*/
  )
}
