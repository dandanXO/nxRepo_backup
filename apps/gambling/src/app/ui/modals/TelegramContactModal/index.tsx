import {renderByUVersion} from "../../utils/renderByUVersion";
import { CocoTelegramContactModal } from "./env/coco"
import { RiojungleTelegramContactModal } from './env/riojungle'

export type ITelegramContactModal = {
  close: () => void;
  toTelegramGroup: () => void;
}

export const TelegramContactModal = (props: ITelegramContactModal) => {

  return renderByUVersion({
    "u2": <RiojungleTelegramContactModal {...props}/>,
  }, <CocoTelegramContactModal {...props}/>);
}

