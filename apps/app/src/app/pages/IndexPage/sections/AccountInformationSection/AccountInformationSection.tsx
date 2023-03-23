import {BiHide, RiCustomerServiceLine} from "react-icons/all";
import {StatusUnAuthentication} from "./StatusUnAuthentication";

export const AccountInformationSection = () => {
  return (
    <div className={"pt-2 px-3 flex flex-col items-center"}>
      <div className={"welcome-info w-full flex flex-row justify-between mb-2"}>
        <div className={"left-section flex flex-row"}>
          <div className={"welcome pr-2 font-medium"}>Welcome 901*****123</div>
          <div className={"hide-icon"}>
            <BiHide/>
          </div>
        </div>
        <div className={"right-section"}>
          <div className={"contact-icon"}><RiCustomerServiceLine/></div>
        </div>
      </div>

      <StatusUnAuthentication/>

    </div>
  )
}
