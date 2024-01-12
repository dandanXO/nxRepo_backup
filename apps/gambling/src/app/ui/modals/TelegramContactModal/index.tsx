import {renderByUVersion} from "../../utils/renderByUVersion";
import { CocoTelegramContactModal } from "./env/u1"
import { RiojungleTelegramContactModal } from './env/u2'

export type ITelegramContactModal = {
  close: () => void;
  toTelegramGroup: () => void;
}

export const TelegramContactModal = (props: ITelegramContactModal) => {

  return renderByUVersion({
    "u2": <RiojungleTelegramContactModal {...props}/>,
  }, <CocoTelegramContactModal {...props}/>);
}

