import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import {getToken} from "../../modules/querystring/getToken";

export const useGoToLogout = () => {
  const navigate = useNavigate();
  return () => {
    navigate(`${PageOrModalPathEnum.PersonalInfoPage}/log-out-modal?token=${getToken()}`);
  };
}
