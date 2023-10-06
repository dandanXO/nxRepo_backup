import { useNavigate } from 'react-router';

import { getToken } from '../../application/getToken';
import { PageOrModalPathEnum } from '../PageOrModalPathEnum';

export const useGoToLogout = () => {
  const navigate = useNavigate();
  return () => {
    navigate(
      `${
        PageOrModalPathEnum.PersonalInfoPage
      }/log-out-modal?token=${getToken()}`
    );
  };
};
