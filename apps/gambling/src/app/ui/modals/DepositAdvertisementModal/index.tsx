import React from "react";
import { DepositAdvertisementModal as CocoDepositAdvertisementModal} from './env/coco';
import { DepositAdvertisementModal as RioDepositAdvertisementModal} from './env/riojungle';
import { renderByPlatform } from "../../utils/renderByPlatform";

export interface IDepositAdvertisementModalProps {
  close: () => void;
  onConfirm: () => void
}

export const DepositAdvertisementModal = ({
  close,
  onConfirm
}:IDepositAdvertisementModalProps) => {


  return (
    <div className={"z-[1005] fixed left-0 top-0 right-0 bottom-0 flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"} onClick={(event) => {
      close();
    }}>
      {
        renderByPlatform({
          "coco777bet": <CocoDepositAdvertisementModal onConfirm={onConfirm} close={close} />,
          "riojungle777bet": <RioDepositAdvertisementModal onConfirm={onConfirm} close={close} />
        }, <CocoDepositAdvertisementModal onConfirm={onConfirm} close={close} />)
      }
    </div>
  )
}
