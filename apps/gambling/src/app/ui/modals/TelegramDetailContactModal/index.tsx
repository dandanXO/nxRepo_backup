import { TelegramDetailContactModal as CocoTelegramDetailContactModal } from "./env/coco";
import { TelegramDetailContactModal as RioTelegramDetailContactModal } from "./env/riojungle";
import { renderByPlatform } from "../../utils/renderByPlatform";


export interface ITelegramDetailContactModalProps {
  onClose: () => void;
  onClickToOpenTelegramService: () => void;
  onClickToOpenTelegramManager: () => void;
}

export const TelegramDetailContactModal = (props: ITelegramDetailContactModalProps) =>
  renderByPlatform({
    "u1": <CocoTelegramDetailContactModal {...props} />,
    "u2": <RioTelegramDetailContactModal {...props} />,
  },<CocoTelegramDetailContactModal {...props} />)


