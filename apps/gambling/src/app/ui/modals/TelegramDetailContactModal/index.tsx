import { TelegramDetailContactModal as CocoTelegramDetailContactModal } from "./env/coco";
import { TelegramDetailContactModal as RioTelegramDetailContactModal } from "./env/riojungle";
import { renderByUVersion } from "../../utils/renderByUVersion";


export interface ITelegramDetailContactModalProps {
  onClose: () => void;
  onClickToOpenTelegramService: () => void;
  onClickToOpenTelegramManager: () => void;
}

export const TelegramDetailContactModal = (props: ITelegramDetailContactModalProps) =>
  renderByUVersion({
    "u1": <CocoTelegramDetailContactModal {...props} />,
    "u2": <RioTelegramDetailContactModal {...props} />,
  },<CocoTelegramDetailContactModal {...props} />)


