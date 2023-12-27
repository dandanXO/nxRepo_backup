import React, { useState } from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import { tcx } from "../../utils/tcx";
import { CheckBox } from "../../components/CheckBox";
import {GameLeaveCancelButton} from "../../components-bs/theme/Buttons/GameLeaveCancelButton";
import {GameLeaveConfirmButton} from "../../components-bs/theme/Buttons/GameLeaveConfirmButton";
import { LeaveGameConfirmModal as CocoLeaveGameConfirmModal } from './env/coco'
import { renderByPlatform } from "../../utils/renderByPlatform";

export interface ILeaveGameConfirmModalProps {
  onConfirm: (addFavorite: boolean) => void
  onClose: () => void
}

export const LeaveGameConfirmModal = ({
  onClose,
  onConfirm
}: ILeaveGameConfirmModalProps) => {
  const [addFavorite, setAddFavorite] = useState(false)

  const { isMobile } = useBreakpoint();

  return (
    <div className='z-[1002] fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-full bg-[rgba(0,0,0,0.50)]'>
      {
        renderByPlatform({
          "coco777bet": (
            <CocoLeaveGameConfirmModal
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
