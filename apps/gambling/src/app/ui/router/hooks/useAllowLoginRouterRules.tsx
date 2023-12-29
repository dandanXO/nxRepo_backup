import {useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {useLocation, useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useEffect, useState} from "react";

export const useAllowLoginRouterRules = () => {
  const navigate = useNavigate();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  useEffect(() => {
    if(!isLogin) {
      navigate(PageOrModalPathEnum.IndexPage);
    }
  }, [isLogin])

  return {

  }

}
