import { IVIPGradePageProps } from "../../index";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { renderByRWD } from "../../../../utils/renderByRWD";
import { MobileVIPGradePage } from "./device/MobileVIPGradePage";
import { TabletVIPGradePage } from "./device/TabletVIPGradePage";
import { DesktopVIPGradePage } from "./device/DesktopVIPGradePage";



const VIPGradePage = (props: IVIPGradePageProps) => {
  const device = useBreakpoint();
  return renderByRWD({
    mobile: <MobileVIPGradePage {...props} />,
    tablet: <TabletVIPGradePage {...props} />,
    // tablet: <MobileVIPGradePage {...props} />,
    desktop: <DesktopVIPGradePage {...props} />,
  }, device)
}

export default VIPGradePage;
