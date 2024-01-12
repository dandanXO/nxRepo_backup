import React from 'react';
import {renderByUVersion} from "../../utils/renderByUVersion";

import {NotificationDrawer as CNotificationDrawer} from "./env/u1/NotificationDrawer";
import {NotificationDrawer as RNotificationDrawer} from "./env/u2/NotificationDrawer";

export type INotificationDrawer = {
  closeDrawer: () => void;
};

export const NotificationDrawer = (props: INotificationDrawer) => {
  return (
    <>
      {renderByUVersion({
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
