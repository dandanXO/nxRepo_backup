import { environment } from "../../../../../../environments/environment";
import { Avatar } from "../../../../components/Avatar";
import { IUserInfo } from "../../../../../persistant/IUserInfo";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { CopyIcon } from "../../../../components/Icons/CopyIcon";
import { useDispatch } from "react-redux";
import { appSlice } from "../../../../../reduxStore/appSlice";
import { GetVIPInfoResponse } from "../../../../../external";
import { formatLocaleMoney } from "../../../../utils/format";


interface IUserInfoStatusPopoverProps {
  userVIPInfo: GetVIPInfoResponse
  currentLevel: number
  close: () => void
}


export const UserInfoStatusPopover = ({
  close,
  currentLevel,
  userVIPInfo
}: IUserInfoStatusPopoverProps) => {
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};

  const dispatch = useDispatch();

  const setOpenLogoutPopover = (show: boolean) => {
    dispatch(appSlice.actions.showMobileLogoutModal(show))
  }

  const vipScore = userVIPInfo?.data?.vip_score || 0
  const nextLevelScore = userVIPInfo?.data?.next_level_score || 1


  return (
    <div className='relative flex flex-col h-full'>
      <div
        className='h-full overflow-y-scroll p-5 mb-12'
      >
        <div className='relative'>
          <img
            alt='close'
            className='absolute left-0 top-0 h-10 w-10 cursor-pointer'
            src={`assets/${environment.assetPrefix}/XCircle.png`}
            onClick={close}
          />
        </div>

        <div className='flex flex-col items-center'>
          <div className='relative border rounded-lg border-white'>
            <Avatar className='rounded-lg w-20 h-20' />
            <div className='absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] text-white text-xs font-bold w-16 rounded-[10px] py-[2px] text-center bg-[#8547EB] border border-white'>LV{currentLevel}</div>
          </div>
          <div className='mt-[22px] text-xl font-medium text-white'>{user.nickname}</div>
          <div className='mt-2 flex gap-1 text-white text-lg'>
            <div>ID: {user.user_id}</div>
            <CopyIcon copyText={user.user_id} icon={<img alt='cooy' className='w-6 h-6' src={`assets/${environment.assetPrefix}/icon=copy.png`} />} />
          </div>
        </div>

        <div className='flex justify-between text-sm mt-5 items-end'>
          <div className='font-medium text-[#10B98F] flex-1'>Valor total da recarga</div>
          <div className='text-white'>R$ {formatLocaleMoney(vipScore / 100)}<span className='text-[#808080]'>/R$ {formatLocaleMoney(nextLevelScore/100)}</span></div>
        </div>

      </div>

      <div className='absolute bottom-0 left-0 w-full p-5'>
        <button
          className='flex gap-2 w-full justify-center items-center rounded-[20px] py-[6px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f]'
          onClick={()=>{
            close();
            setOpenLogoutPopover(true)
          }}
        >
          <div className='text-white text-lg font-medium'>Sair</div>
          <img alt='signOut' className='w-6 h-6' src={`assets/${environment.assetPrefix}/icon=sign-out.png`} />
        </button>
      </div>
    </div>
  )
}
