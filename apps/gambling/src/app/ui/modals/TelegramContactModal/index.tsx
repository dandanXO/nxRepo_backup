import {renderByPlatform} from "../../utils/renderByPlatform";
import { CocoTelegramContactModal } from "./env/coco"
import { RiojungleTelegramContactModal } from './env/riojungle'

export type ITelegramContactModal = {
  close: () => void;
  toTelegramGroup: () => void;
}

export const TelegramContactModal = (props: ITelegramContactModal) => {

  return renderByPlatform({
    "riojungle777bet": <RiojungleTelegramContactModal {...props}/>,
  }, <CocoTelegramContactModal {...props}/>);
}

