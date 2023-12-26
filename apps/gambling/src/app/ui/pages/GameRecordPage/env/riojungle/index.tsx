import { IGameRecordPageProps } from "../../index";
import { DesktopGameRecordPage } from './device/DesktopGameRecordPage'
import { MobileGameRecordPage } from './device/MobileGameRecordPage';
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { renderByRWD } from "../../../../utils/renderByRWD";


export const GameRecordPage = (props: IGameRecordPageProps) => {
  const device = useBreakpoint();
  return renderByRWD({
    mobile: <MobileGameRecordPage {...props} />,
    tablet: <DesktopGameRecordPage {...props} />,
    desktop: <DesktopGameRecordPage {...props} />
  }, device)
}
