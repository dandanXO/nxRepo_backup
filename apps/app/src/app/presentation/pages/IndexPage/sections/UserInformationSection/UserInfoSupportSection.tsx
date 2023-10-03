import { FiEye } from '@react-icons/all-files/fi/FiEye';
import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
import { RiCustomerServiceLine } from '@react-icons/all-files/ri/RiCustomerServiceLine';
import React, { useCallback, useState } from 'react';

import { IndexPageProps, RootState } from '../../../../../reduxStore';
import {useSelector} from "react-redux";
import {NativeAppInfo} from "../../../../../persistant/nativeAppInfo";

type Props = IndexPageProps & {
  onClickToCustomerService: () => void;
};

export const UserInfoSupportSection = (props: Props) => {

  // TODO: refactor
  // NOTE: Pure H5
  const phoneNumber: string | undefined = useSelector((state: RootState) => state.login.phoneNo) || "";
  const maskPhoneNumber = phoneNumber.length >= 10 ? phoneNumber.slice(0, 3) + '****' + phoneNumber.slice(7, 10) : phoneNumber;
  const originalUserName = phoneNumber || props.state.user.userName;
  const maskUserName = maskPhoneNumber || props.state.user?.maskUserName;
  const [isHideUserName, setIsHideUserName] = useState(true);

  // NOTE: User Event
  const onClickHideUserName = () => {
    setIsHideUserName(!isHideUserName);
  };

  return (
    <div data-testing-id="welcome" className={'flex w-full flex-row justify-between items-center'}>
      <div className={'left-section flex flex-row items-center'}>
        {/*NOTE: 顯示用戶名 */}
        <div className={'welcome pr-2 font-bold'}>
          Welcome {isHideUserName ? maskUserName : originalUserName}
        </div>
        {/*NOTE: 是否隱藏用戶名稱 Button*/}
        <a data-testing-id={'hide-icon'} onClick={onClickHideUserName}>
          {isHideUserName ? <FiEyeOff /> : <FiEye />}
        </a>
      </div>
      <div className={'right-section'}>
        {/*NOTE: 客服 Button*/}
        <div data-testing-id={'contact-icon'} onClick={props.onClickToCustomerService}>
          <RiCustomerServiceLine />
        </div>
      </div>
    </div>
  );
};
