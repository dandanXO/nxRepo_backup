import { CocoMaintenanceModal } from "./env/coco/"
import { RiojungleMaintenanceModal } from "./env/riojungle/modal"
import {renderByUVersion} from "../../utils/renderByUVersion";

interface IMaintenanceModal {
  onClickToOpenTelegramService: () => void
}

export const MaintenanceModal = (props: IMaintenanceModal) => {
  return renderByUVersion({
    "u2": <RiojungleMaintenanceModal {...props}/>,
  }, <CocoMaintenanceModal {...props}/>);
}
