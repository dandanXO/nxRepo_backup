import {DMaintenanceModal} from "./default"
import { RiojungleMaintenanceModal } from "./env/riojungle/modal"
import {renderByPlatform} from "../../utils/renderByPlatform";

interface IMaintenanceModal {
  onClickToOpenTelegramService: () => void
}

export const MaintenanceModal = (props: IMaintenanceModal) => {
  return renderByPlatform({
    "riojungle777bet": <RiojungleMaintenanceModal {...props}/>,
  }, <DMaintenanceModal {...props}/>);
}
