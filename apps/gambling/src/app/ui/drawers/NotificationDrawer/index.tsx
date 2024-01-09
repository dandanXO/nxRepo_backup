import React from 'react';
import {renderByPlatform} from "../../utils/renderByPlatform";

import {NotificationDrawer as CNotificationDrawer} from "./env/coco/NotificationDrawer";
import {NotificationDrawer as RNotificationDrawer} from "./env/riojungle/NotificationDrawer";

export type INotificationDrawer = {
  closeDrawer: () => void;
};

export const NotificationDrawer = (props: INotificationDrawer) => {
  return (
    <>
      {renderByPlatform({
        "wild777bet": (
          <CNotificationDrawer closeDrawer={props.closeDrawer}/>
        ),
        "u1": (
          <CNotificationDrawer closeDrawer={props.closeDrawer}/>
        ),
        "u2": (
          <RNotificationDrawer closeDrawer={props.closeDrawer}/>
        ),
      }, (
        <CNotificationDrawer closeDrawer={props.closeDrawer}/>
      ))}
    </>
  )
};
