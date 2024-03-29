import { FiEye } from '@react-icons/all-files/fi/FiEye';
import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
import { RiCustomerServiceLine } from '@react-icons/all-files/ri/RiCustomerServiceLine';
import React, { useState } from 'react';

import { IndexPageProps } from '../../../../../reduxStore';
import { useUserPhoneNumber } from '../../../../hooks/useUserPhoneNumber';

type Props = IndexPageProps & {
  onClickToCustomerService: () => void;
};

export const UserInfoSupportSection = (props: Props) => {
  const { phoneNumber, maskPhoneNumber } = useUserPhoneNumber();
  const [isHideUserName, setIsHideUserName] = useState(true);

  // NOTE: User Event
  const onClickHideUserName = () => {
    setIsHideUserName(!isHideUserName);
  };

  return (
    <div
      data-testing-id="welcome"
      className={'flex w-full flex-row items-center justify-between'}
    >
      <div className={'left-section flex flex-row items-center'}>
        {/*NOTE: 顯示用戶名 */}
        <div className={'welcome pr-2 font-bold'}>
          Welcome {isHideUserName ? maskPhoneNumber : phoneNumber}
        </div>
        {/*NOTE: 是否隱藏用戶名稱 Button*/}
        <a data-testing-id={'hide-icon'} onClick={onClickHideUserName}>
          {isHideUserName ? <FiEyeOff /> : <FiEye />}
        </a>
      </div>
      <div className={'right-section'}>
        {/*NOTE: 客服 Button*/}
        <div
          data-testing-id={'contact-icon'}
          onClick={props.onClickToCustomerService}
        >
          <RiCustomerServiceLine />
        </div>
      </div>
    </div>
  );
};
