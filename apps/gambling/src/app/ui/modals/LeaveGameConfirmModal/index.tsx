import React from "react";
import { LeaveGameConfirmModal as CocoLeaveGameConfirmModal } from './env/u1'
import { LeaveGameConfirmModal as RioLeaveGameConfirmModal } from './env/u2'
import { renderByUVersion } from "../../utils/renderByUVersion";
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
        renderByUVersion({
          "u1": (
            <CocoLeaveGameConfirmModal
              onConfirm={onConfirm}
              onClose={onClose}
            />
          ),
          "u2": (
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
