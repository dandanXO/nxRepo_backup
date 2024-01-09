import { CocoMaintenanceModal } from "./env/coco/"
import { RiojungleMaintenanceModal } from "./env/riojungle/modal"
import {renderByPlatform} from "../../utils/renderByPlatform";

interface IMaintenanceModal {
  onClickToOpenTelegramService: () => void
}

export const MaintenanceModal = (props: IMaintenanceModal) => {
  return renderByPlatform({
    "u2": <RiojungleMaintenanceModal {...props}/>,
  }, <CocoMaintenanceModal {...props}/>);
}
