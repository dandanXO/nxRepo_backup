import {BiHide, RiCustomerServiceLine} from "react-icons/all";
import React from "react";
import {IndexPageProps, RootState} from "../../../../store";

type Props = IndexPageProps;

export const UserInfoSupportField = (props: Props) => {
  return (
    <div className={"w-full flex flex-row justify-between "}>
      <div className={"left-section flex flex-row"}>
        <div data-testing-id="welcome" className={"welcome pr-2 font-medium"}>Welcome {props.state.user.userName}</div>
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