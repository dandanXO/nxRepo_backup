import React from "react";
import { LeaveGameConfirmModal as CocoLeaveGameConfirmModal } from './env/coco'
import { LeaveGameConfirmModal as RioLeaveGameConfirmModal } from './env/riojungle'
import { renderByPlatform } from "../../utils/renderByPlatform";

export interface ILeaveGameConfirmModalProps {
  onConfirm: (addFavorite: boolean) => void
  onClose: () => void
}

export const LeaveGameConfirmModal = ({
  onClose,
  onConfirm
}: ILeaveGameConfirmModalProps) => {

  return (
    <div className='z-[1005] fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-full bg-[rgba(0,0,0,0.50)]'>
      {
        renderByPlatform({
          "coco777bet": (
            <CocoLeaveGameConfirmModal
              onConfirm={onConfirm}
              onClose={onClose}
            />
          ),
          "riojungle777bet": (
            <RioLeaveGameConfirmModal
              onConfirm={onConfirm}
              onClose={onClose}
            />
          )
        }, (
          <CocoLeaveGameConfirmModal
            onConfirm={onConfirm}
            onClose={onClose}
          />
        ))
      }
    </div>
  )
}
