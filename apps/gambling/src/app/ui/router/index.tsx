import {renderByPlatform} from "../utils/renderByPlatform";
import {AppRouter as CocoAppRouter} from "./env/coco/Router";
import {AppRouter as RiojungleAppRouter} from "./env/riojungle/Router";
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

  return renderByPlatform({
    "coco777bet": (
      <CocoAppRouter/>
    ),
    "riojungle777bet": (
      <RiojungleAppRouter/>
    )
  }, <CocoAppRouter/>)
}
