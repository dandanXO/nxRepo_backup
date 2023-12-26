import {environment} from "../../../../../../environments/environment";
import {MessageCountBadge} from "../../../../components/MessageCountBadge";
import React from "react";
import styled from "styled-components";

const Notification = styled.button`
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border: 2px solid currentColor;
    border-radius: inherit;
    opacity: 0;
    transition: opacity .2s ease-in-out;
  }
`

export type INotificationAnimationIcon = {
  messageCount: number;
}
export const NotificationAnimationIcon = (props: INotificationAnimationIcon) => {
  return (
    <Notification>
      <img
        className="w-[30px] h-[36px] min-w-[30px] min-h-[36px] hover:opacity-70"
        alt={"notification"}
        src={`assets/${environment.assetPrefix}/ic_notification.png`}
      />
      {props.messageCount !== 0 && <MessageCountBadge>{props.messageCount}</MessageCountBadge>}
    </Notification>
  )
}
