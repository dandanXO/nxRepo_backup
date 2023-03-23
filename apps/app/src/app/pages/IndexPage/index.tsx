import {Navigation} from "../../components/layouts/Navigation";
import {Marquee} from "../../components/layouts/Marquee";
import {ADBannerSection} from "./sections/ADBannerSection";
import {AuthenticationSection} from "./sections/AuthenticationSection";
import {ADInformationSection} from "./sections/ADInformationSection";
import {AccountInformationSection} from "./sections/AccountInformationSection/AccountInformationSection";


export const IndexPage = () => {
  return (
    <div className={"container flex flex-col min-h-screen"}>

      <div className={"flex grow flex-col"}>

        <div>
          <Marquee/>
        </div>

        <div className={"info h-42 bg-orange-100 mb-3"}>
          <AccountInformationSection/>
        </div>

        <div className={"content px-3"}>
          <ADInformationSection/>
          <AuthenticationSection/>
          <ADBannerSection/>
        </div>

      </div>

      <Navigation/>

    </div>
  )
}
