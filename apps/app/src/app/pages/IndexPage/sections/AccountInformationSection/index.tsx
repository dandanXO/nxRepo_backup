import {BiHide, RiCustomerServiceLine} from "react-icons/all";
import {StatusContainer} from "./StatusContainer";
import React, {useState} from "react";
import "./style.scss";

import {UnAuthenticationStatus} from "./UnAuthenticationStatus";
import {QuotaSliderStatus} from "./QuotaSliderStatus";

export const AccountInformationSection = () => {
  return (
    <div className={"h-42 bg-orange-100 px-3 pt-2 flex flex-col items-center"}>
      <div className={"welcome-info w-full flex flex-row justify-between mb-2"}>
        <div className={"left-section flex flex-row"}>
          <div className={"welcome pr-2 font-medium"}>Welcome 901*****123</div>
          <div className={"hide-icon"}>
            <BiHide/>
          </div>
        </div>
        <div className={"right-section"}>
          <div className={"contact-icon"}>
            <RiCustomerServiceLine/>
          </div>
        </div>
      </div>

      <StatusContainer>
        <UnAuthenticationStatus/>
        <QuotaSliderStatus/>
      </StatusContainer>
    </div>
  )
}
