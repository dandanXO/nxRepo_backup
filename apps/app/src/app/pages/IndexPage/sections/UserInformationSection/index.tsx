import {StatusContainer} from "./StatusContainer";
import React from "react";
import "./style.scss";
import {QuotaSliderStatus} from "./QuotaSliderStatus";
import {LatestOrderStatus} from "./LatestOrderStatus";
import {UserInfoSupportField} from "./UserInfoSupportField";
import {IndexPageProps} from "../../../../store";
import {ORDER_STATE, USER_AUTH_STATE} from "../../../../flow";
import {UnAuthenticationStatus} from "./UnAuthenticationStatus";

type Props = IndexPageProps;

export const UserInformationSection = (props: Props) => {
  return (
    <div className={"h-42 bg-orange-100 px-3 pt-2 flex flex-col items-center"}>

      <div className={"w-full mb-3"}>
        <UserInfoSupportField state={props.state}/>
      </div>

      <div className={"w-full mb-3"}>
        {props.state.user.state === USER_AUTH_STATE.success &&
          props.state.order.state === ORDER_STATE.hasOverdueOrder && (
            // TODO
            <LatestOrderStatus state={props.state}/>
        )}
      </div>

      <StatusContainer>
        {props.state.user.state === USER_AUTH_STATE.ready && (
          <UnAuthenticationStatus state={props.state}/>
        )}
        {props.state.user.state !== USER_AUTH_STATE.ready && (
          <QuotaSliderStatus state={props.state}/>
        )}

      </StatusContainer>
    </div>
  )
}
