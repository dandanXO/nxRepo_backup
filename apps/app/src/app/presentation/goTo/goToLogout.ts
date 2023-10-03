import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {useNavigate} from "react-router";

export const useGoToLogout = () => {
  const navigate = useNavigate();
  return () => {
    navigate(`${PageOrModalPathEnum.PersonalInfoPage}/log-out-modal`);
  };
}
