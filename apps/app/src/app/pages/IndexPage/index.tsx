import {Navigation} from "../../components/layouts/Navigation";
import {ADBannerSection} from "./sections/ADBannerSection";
import {AuthenticationSection} from "./sections/AuthenticationSection";
import {LoanInformationSection} from "./sections/LoanInformationSection";
import {UserInformationSection} from "./sections/UserInformationSection";
import {RecommendedProductsSection} from "./sections/RecommendedProductsSection";
import {MarqueeSection} from "./sections/MarqueeSection";
import {LoanOverViewSection} from "./sections/LoanOverViewSection";
import {Button} from "../../components/layouts/Button";
import {PageContent} from "../../components/layouts/PageContent";
import {TipsSection} from "./sections/TipsSection";
import {NoticeOrderRejectedSection} from "./sections/NoticeOrderRejectedSection";
import {WelcomeBackAndReapplyInTimeSection} from "./sections/WelcomeBackAndReapplyInTimeSection";
import {NoticeUserAuthedEmptyQuotaSection} from "./sections/NoticeUserAuthedEmptyQuotaSection";
import {
  NoticeUserInProgressAuthStatusSections
} from "./sections/NoticeUserInProgressAuthStatusSections";
import {NoticeUserRejectedSection} from "./sections/NoticeUserRejectedSection";

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

        <PageContent>
          {/*<div className={"mb-3"}>*/}
          {/*  <LoanInformationSection/>*/}
          {/*</div>*/}

          {/*<div className={"mb-3"}>*/}
          {/*  <AuthenticationSection/>*/}
          {/*</div>*/}

          {/*<div className={"mb-3"}>*/}
          {/*  <ADBannerSection/>*/}
          {/*</div>*/}

          {/*<div className={"mb-3"}>*/}
          {/*  <RecommendedProductsSection/>*/}
          {/*</div>*/}

          {/*<div className={"mb-3"}>*/}
          {/*  <LoanOverViewSection/>*/}
          {/*</div>*/}

          {/*<div className={"mb-3"}>*/}
          {/*  <TipsSection/>*/}
          {/*</div>*/}

          {/*<NoticeOrderRejectedSection/>*/}
          {/*<NoticeUserAuthedEmptyQuotaSection/>*/}
          {/*<WelcomeBackAndReapplyInTimeSection/>*/}
          {/*<NoticeUserInProgressAuthStatusSections/>*/}
          <NoticeUserRejectedSection/>

        </PageContent>

      </div>

      <div className={"sticky bottom-[63px] px-3 py-3"}>
        {/*<Button text={"Apply Now"} bgColor={"bg-[#F58B10]"}/>*/}
        <Button text={"View Application Progress"} bgColor={"bg-[#F58B10]"}/>
      </div>

      <Navigation/>

    </div>
  )
}
