import {Navigation} from "../../components/layouts/Navigation";
import {ADBannerSection} from "./sections/ADBannerSection";
import {AuthenticationSection} from "./sections/AuthenticationSection";
import {LoanInformationSection} from "./sections/LoanInformationSection";
import {UserInformationSection} from "./sections/UserInformationSection";
import {RecommendedProductsSection} from "./sections/RecommendedProductsSection";
import {MarqueeSection} from "./sections/MarqueeSection";
import {LoanOverViewSection} from "./sections/LoanOverViewSection";
import {Button} from "../../components/layouts/Button";

export const IndexPage = () => {
  return (
    <div className={"container flex flex-col min-h-screen"}>

      <div className={"flex grow flex-col"}>

        <div>
          <MarqueeSection/>
        </div>

        <div className={"mb-5"}>
          <UserInformationSection/>
        </div>

        <div className={"px-3"}>
          <div className={"mb-3"}>
            <LoanInformationSection/>
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

          <div className={"mb-3"}>
            <LoanOverViewSection/>
            <Button text={"Apply Now"} bgColor={"bg-[#F58B10]"}/>
          </div>
        </div>

      </div>

      <Navigation/>

    </div>
  )
}
