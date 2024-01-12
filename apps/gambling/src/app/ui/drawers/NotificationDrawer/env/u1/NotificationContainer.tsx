import cx from "classnames";
import React from "react";

type INotificationContainer = {
  children: React.ReactNode;
}

export const NotificationContainer = (props: INotificationContainer) => {
  return (
    <div
      className={cx(
        'flex-between fixed right-0 top-[44px] bottom-0 flex w-[450px] flex-col bg-[var(--background-primary)] p-4 text-left',
        {}
      )}
    >{props.children}
    </div>
  )
}
