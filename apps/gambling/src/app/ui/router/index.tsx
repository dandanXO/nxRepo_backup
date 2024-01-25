import {renderByUVersion} from "../utils/renderByUVersion";
import {AppRouter as CocoAppRouter} from "./env/u1/Router";
import {AppRouter as RiojungleAppRouter} from "./env/u2/Router";
import {useEffect} from "react";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {useLocation, useNavigate} from "react-router";
import useBreakpoint from "../pageTemplate/hooks/useBreakpoint";
export const AppRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDesktop} = useBreakpoint();

  useEffect(() => {
    if(isDesktop) {
      if(
        location.pathname === PageOrModalPathEnum.MyPage ||
        location.pathname === PageOrModalPathEnum.NotificationPage
      ) {
        navigate(PageOrModalPathEnum.IndexPage)
      }

    }
  }, [isDesktop, location.pathname])

  return renderByUVersion({
    "p1": (
      <RiojungleAppRouter />
    ),
    "u1": (
      <CocoAppRouter/>
    ),
    "u2": (
      <RiojungleAppRouter/>
    )
  }, <CocoAppRouter/>)
}
