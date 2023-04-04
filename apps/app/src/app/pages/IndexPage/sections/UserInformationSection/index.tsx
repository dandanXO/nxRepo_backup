import {StatusContainer} from "./StatusContainer";
import React from "react";
import "./style.scss";
import {QuotaSliderStatus} from "./QuotaSliderStatus";
import {LatestOrderStatus} from "./LatestOrderStatus";
import {UserInfoSupportField} from "./UserInfoSupportField";
import {IndexPageProps} from "../../../../usecaseFlow/store";
import {UnAuthenticationStatus} from "./UnAuthenticationStatus";
import {PageState} from "../../index";
import {USER_AUTH_STATE} from "../../../../usecaseFlow/domain/USER_AUTH_STATE";
import {ORDER_STATE} from "../../../../usecaseFlow/domain/ORDER_STATE";

type Props = IndexPageProps & PageState & {
  setQuotaBarTargetPrice: React.Dispatch<React.SetStateAction<number>>;
  countdown: string;
  onClickToCustomerService: () => void;
};

export const UserInformationSection = (props: Props) => {
  return (
    <div className={"h-42 bg-orange-100 px-3 pt-2 flex flex-col items-center"}>

      <div className={"w-full mb-3"}>
        <UserInfoSupportField state={props.state} onClickToCustomerService={props.onClickToCustomerService}/>
      </div>


      {props.state.user.state === USER_AUTH_STATE.success &&
        (
          props.state.order.state === ORDER_STATE.hasInComingOverdueOrder ||
          props.state.order.state === ORDER_STATE.hasOverdueOrder
        ) && (
          // TODO
          <div className={"w-full mb-3"}>
            <LatestOrderStatus state={props.state}/>
          </div>
      )}


      <StatusContainer state={props.state} pageState={props.pageState}>
        {props.state.user.state === USER_AUTH_STATE.ready && (
          <UnAuthenticationStatus state={props.state}/>
        )}
        {props.state.user.state !== USER_AUTH_STATE.ready && (
          <QuotaSliderStatus
            state={props.state}
            setQuotaBarTargetPrice={props.setQuotaBarTargetPrice}
            countdown={props.countdown}
          />
        )}
      </StatusContainer>
    </div>
  )
}
