import React from "react";
import { LeaveGameConfirmModal as CocoLeaveGameConfirmModal } from './env/coco'
import { LeaveGameConfirmModal as RioLeaveGameConfirmModal } from './env/riojungle'
import { renderByPlatform } from "../../utils/renderByPlatform";
import {BaseModal} from "../BaseModal";

export interface ILeaveGameConfirmModalProps {
  onConfirm: (addFavorite: boolean) => void
  onClose: () => void
}

export const LeaveGameConfirmModal = ({
  onClose,
  onConfirm
}: ILeaveGameConfirmModalProps) => {

  return (
    <BaseModal>
      {
        renderByPlatform({
          "u1": (
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
    </BaseModal>
  )
}
