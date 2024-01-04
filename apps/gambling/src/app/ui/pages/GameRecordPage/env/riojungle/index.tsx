import { IGameRecordPageProps } from "../../index";
import { DesktopGameRecordPage } from './device/DesktopGameRecordPage'
import { MobileGameRecordPage } from './device/MobileGameRecordPage';
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { renderByRWD } from "../../../../utils/renderByRWD";
import { TabletGameRecordPage } from "./device/TabletGameRecordPage";


export const GameRecordPage = (props: IGameRecordPageProps) => {
  const device = useBreakpoint();
  return renderByRWD({
    mobile: <MobileGameRecordPage {...props} />,
    tablet: <TabletGameRecordPage {...props} />,
    desktop: <DesktopGameRecordPage {...props} />
  }, device)
}
