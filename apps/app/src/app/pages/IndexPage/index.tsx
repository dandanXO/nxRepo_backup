import {Navigation} from "../../components/layouts/Navigation";
import {Marquee} from "../../components/layouts/Marquee";
import {ADBannerSection} from "./sections/ADBannerSection";
import {AuthenticationSection} from "./sections/AuthenticationSection";
import {ADInformationSection} from "./sections/ADInformationSection";
import {AccountInformationSection} from "./sections/AccountInformationSection";
import {RecommendedProductsSection} from "./sections/RecommendedProductsSection";

export const IndexPage = () => {
  return (
    <div className={"container flex flex-col min-h-screen"}>

      <div className={"flex grow flex-col"}>

        <div>
          <Marquee/>
        </div>

        <div className={"info mb-5"}>
          <AccountInformationSection/>
        </div>

        <div className={"px-3"}>
          <div className={"mb-3"}>
            <ADInformationSection/>
          </div>

          <div className={"mb-3"}>
            <AuthenticationSection/>
          </div>

          <div className={"mb-3"}>
            <ADBannerSection/>
          </div>

          <div className={"mb-3"}>
            <RecommendedProductsSection/>
          </div>
        </div>

      </div>

      <Navigation/>

    </div>
  )
}
