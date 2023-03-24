import {BiHide, RiCustomerServiceLine} from "react-icons/all";
import {StatusContainer} from "./StatusContainer";
import React, {useState} from "react";
import "./style.scss";

import {UnAuthenticationStatus} from "./UnAuthenticationStatus";
import {QuotaSliderStatus} from "./QuotaSliderStatus";
import {LatestOrderStatus} from "./LatestOrderStatus";
import {UserInfoSupportField} from "./UserInfoSupportField";

export const UserInformationSection = () => {
  return (
    <div className={"h-42 bg-orange-100 px-3 pt-2 flex flex-col items-center"}>

      <div className={"w-full mb-3"}>
        <UserInfoSupportField/>
      </div>

      {/*<div className={"w-full mb-3"}>*/}
      {/*  <LatestOrderStatus/>*/}
      {/*</div>*/}

      <StatusContainer>
        {/*<UnAuthenticationStatus/>*/}
        <QuotaSliderStatus/>
      </StatusContainer>
    </div>
  )
}
