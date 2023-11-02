import {RootState} from "../../reduxStore";
import {useSelector} from "react-redux";

export const useBreakpoint = () => {
  const isMobile = useSelector((state: RootState) => state.app.isMobile);
  return {
    isMobile,
  };
};

export default useBreakpoint;
