import React, { Dispatch, SetStateAction, useState } from "react";
import { tcx } from "../../utils/tcx";
import { renderByPlatform } from "../../utils/renderByPlatform";
import { Drawer as CDrawer } from "./env/coco/Drawer";
import { Drawer } from "./env/default/Drawer";


export interface IConfirmDrawerProps {
  title: string
  content: string
  buttonText: string
  onClose: () => void
  className?: string
  buttonStyle?: string
}

export interface IAnimateDrawerProps {
  open: boolean;
  setOpen: any;
}

const ConfirmDrawer = (props: IConfirmDrawerProps) => {
  const [open, setOpen] = useState(true)

  return renderByPlatform({
    "wild777bet": (
      <Drawer {...props} open={open} setOpen={setOpen} />
    ),
    "coco777bet": (
      <CDrawer {...props} open={open} setOpen={setOpen} />
    ),
  }, <Drawer {...props} open={open} setOpen={setOpen} />)
}

export default ConfirmDrawer;
