import {BiHide, RiCustomerServiceLine} from "react-icons/all";
import React from "react";

export const UserInfoSupportField = () => {
  return (
    <div className={"w-full flex flex-row justify-between "}>
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
  )
}
