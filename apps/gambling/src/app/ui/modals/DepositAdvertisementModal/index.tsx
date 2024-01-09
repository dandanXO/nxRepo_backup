import React from "react";
import { DepositAdvertisementModal as CocoDepositAdvertisementModal} from './env/coco';
import { DepositAdvertisementModal as RioDepositAdvertisementModal} from './env/riojungle';
import { renderByUVersion } from "../../utils/renderByUVersion";

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
        renderByUVersion({
          "u1": <CocoDepositAdvertisementModal onConfirm={onConfirm} close={close} />,
          "u2": <RioDepositAdvertisementModal onConfirm={onConfirm} close={close} />
        }, <CocoDepositAdvertisementModal onConfirm={onConfirm} close={close} />)
      }
    </div>
  )
}
