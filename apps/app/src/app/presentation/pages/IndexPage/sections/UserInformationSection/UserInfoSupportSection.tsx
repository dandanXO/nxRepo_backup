import { RiCustomerServiceLine } from '@react-icons/all-files/ri/RiCustomerServiceLine';
import { FiEye } from '@react-icons/all-files/fi/FiEye';
import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff';
import React, { useCallback, useState } from 'react';
import { IndexPageProps, RootState } from '../../../../../reduxStore';

type Props = IndexPageProps & {
  onClickToCustomerService: () => void;
};

export const UserInfoSupportSection = (props: Props) => {
  // TODO: refactor
  const userName =
    props.state.user?.userName?.length >= 10
      ? props.state.user.userName.slice(0, 3) +
        '****' +
        props.state.user.userName.slice(7, 10)
      : props.state.user.userName;
  const [isHideUserName, setIsHideUserName] = useState(true);

  // NOTE: User Event
  const onClickHideUserName = () => {
    setIsHideUserName(!isHideUserName);
  }

  return (
    <div className={'w-full flex flex-row justify-between '}>
      <div className={'left-section flex flex-row items-center'}>
        {/*NOTE: 顯示用戶名 */}
        <div data-testing-id="welcome" className={'welcome pr-2 font-medium'}>
          Welcome {isHideUserName ? userName : props.state.user.userName}
        </div>
        {/*NOTE: 是否隱藏用戶名稱 Button*/}
        <a
          data-test-id={"hide-icon"}
          onClick={onClickHideUserName}
        >
          {isHideUserName ? <FiEyeOff /> : <FiEye />}
        </a>
      </div>
      <div className={'right-section'}>
        {/*NOTE: 客服 Button*/}
        <div
          data-test-id={"contact-icon"}
          onClick={props.onClickToCustomerService}
        >
          <RiCustomerServiceLine />
        </div>
      </div>
    </div>
  );
};
