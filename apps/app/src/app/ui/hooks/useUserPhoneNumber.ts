import { useSelector } from 'react-redux';

import { RootState } from '../../reduxStore';

export const useUserPhoneNumber = () => {
  const rootState: RootState['indexPage'] = useSelector(
    (state: RootState) => state.indexPage
  );
  // TODO: refactor
  // NOTE: Pure H5
  const phoneNumber: string | undefined =
    useSelector((state: RootState) => state.login.phoneNo) || '';
  const maskPhoneNumber =
    phoneNumber.length >= 10
      ? phoneNumber.slice(0, 3) + '****' + phoneNumber.slice(7, 10)
      : phoneNumber;
  const originalUserName = phoneNumber || rootState?.user?.userName;
  const maskUserName = maskPhoneNumber || rootState?.user?.maskUserName;
  return {
    phoneNumber: originalUserName,
    maskPhoneNumber: maskUserName,
  };
};
