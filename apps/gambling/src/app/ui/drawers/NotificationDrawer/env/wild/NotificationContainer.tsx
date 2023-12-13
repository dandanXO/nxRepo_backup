import cx from "classnames";
import {environment} from "../../../../../../environments/environment";
import React from "react";


type INotificationContainer = {
  children: React.ReactNode;
}

export const NotificationContainer = (props: INotificationContainer) => {
  return (
    <div
      className={cx(
        'flex-between fixed right-0 top-0 bottom-0 z-10 flex w-[450px] flex-col bg-[#090B0F] p-4 text-left',
        {}
      )}
    >{props.children}
    </div>
  )
}
