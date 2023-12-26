import React from "react";
import { CocoAvatar } from "../../../../components/Avatar/CocoAvatar";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { CopyIcon } from "../../../../components-bs/theme/Icons/CopyIcon";
import { environment } from "../../../../../../environments/environment";
import { useDispatch } from "react-redux";
import { appSlice } from "../../../../../reduxStore/appSlice";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {SignoutICON} from "../../../../components-bs/theme/Icons/SignoutICON";

export const UserINfoStatusPopoverUserInfo = () => {
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};

  const setOpenLogoutPopover = (show: boolean) => {
    dispatch(appSlice.actions.showMobileLogoutModal(show))
  }

  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-3'>
        <div className='rounded-[11px] overflow-hidden w-[50px] h-[50px]'>
          <CocoAvatar className='w-[50px] h-[50px]' />
        </div>
        <div className='flex flex-col justify-between text-[var(--text-tertiary)]'>
          <div className='text-xl text-white'>{user.nickname}</div>
          <div
            className='flex gap-2 text-lg items-center'
            onClick={(e)=>e.stopPropagation()}
          >
            <div>ID:{user.user_id}</div>
            <CopyIcon copyText={user.user_id} />
          </div>
        </div>
      </div>

      <a onClick={()=>setOpenLogoutPopover(true)}>
        <SignoutICON/>
      </a>
    </div>
  )
}
