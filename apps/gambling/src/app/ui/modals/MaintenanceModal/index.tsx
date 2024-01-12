import { CocoMaintenanceModal } from "./env/u1/"
import { RiojungleMaintenanceModal } from "./env/u2/modal"
import {renderByUVersion} from "../../utils/renderByUVersion";

interface IMaintenanceModal {
  onClickToOpenTelegramService: () => void
}

export const MaintenanceModal = (props: IMaintenanceModal) => {
  return renderByUVersion({
    "u2": <RiojungleMaintenanceModal {...props}/>,
  }, <CocoMaintenanceModal {...props}/>);
}
