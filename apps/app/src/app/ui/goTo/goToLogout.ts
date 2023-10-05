import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import {getToken} from "../../persistant/getToken";

export const useGoToLogout = () => {
  const navigate = useNavigate();
  return () => {
    navigate(`${PageOrModalPathEnum.PersonalInfoPage}/log-out-modal?token=${getToken()}`);
  };
}
