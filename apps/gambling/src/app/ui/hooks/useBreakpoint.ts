import {RootState} from "../../reduxStore";
import {useSelector} from "react-redux";

export const useBreakpoint = () => {
  const isMobile = useSelector((state: RootState) => state.app.isMobile);
  const isTablet = useSelector((state: RootState) => state.app.isTablet);
  const isDesktop = useSelector((state: RootState) => state.app.isDesktop);
  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useBreakpoint;
