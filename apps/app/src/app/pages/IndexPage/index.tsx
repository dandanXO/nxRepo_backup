import {TabBar} from "../../components/layouts/TabBar";
import {LoanInformationSection} from "./sections/LoanInformationSection";
import {UserInformationSection} from "./sections/UserInformationSection";
import {RecommendedProductsSection} from "./sections/RecommendedProductsSection";
import {MarqueeSection} from "./sections/MarqueeSection";
import {Button} from "../../components/layouts/Button";
import {PageContent} from "../../components/layouts/PageContent";
import {TipsSection} from "./sections/TipsSection";
import {NoticeOrderRejectedSection} from "./sections/NoticeSection/NoticeOrderRejectedSection";
import {WelcomeBackAndReapplyInTimeSection} from "./sections/WelcomeBackAndReapplyInTimeSection";
import {NoticeUserAuthedEmptyQuotaSection} from "./sections/NoticeSection/NoticeUserAuthedEmptyQuotaSection";
import {
  NoticeUserInProgressAuthStatusSections
} from "./sections/NoticeSection/NoticeUserInProgressAuthStatusSections";
import {NoticeUserRejectedSection} from "./sections/NoticeSection/NoticeUserRejectedSection";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {ORDER_STATE, RISK_CONTROL_STATE, USER_AUTH_STATE} from "../../flow";
import {AuthenticationSection} from "./sections/AuthenticationSection";
import {ADBannerSection} from "./sections/ADBannerSection";
import {LoanOverViewSection} from "./sections/LoanOverViewSection";


export const IndexPage = () => {
  const indexPageState = useSelector((state: RootState) => state.indexPage);

  return (
    <div className={"container flex flex-col min-h-screen"}>

      <div className={"flex grow flex-col"}>

        <div>
          <MarqueeSection state={indexPageState}/>
        </div>

        <div className={"mb-5"}>
          <UserInformationSection state={indexPageState}/>
        </div>

        <PageContent>
          <div className={"mb-3"}>
            <LoanInformationSection state={indexPageState}/>
          </div>

          {indexPageState.user.state === USER_AUTH_STATE.ready && (
            <div className={"mb-3"}>
              <AuthenticationSection/>
            </div>
          )}

          {indexPageState.user.state === USER_AUTH_STATE.ready && (
            <div className={"mb-3"}>
              {/*TODO*/}
              <ADBannerSection/>
            </div>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.valid
          )&& (
            <div className={"mb-3"}>
              <RecommendedProductsSection state={indexPageState}/>
            </div>
          )}


          {(
            indexPageState.user.state === USER_AUTH_STATE.authing ||
            indexPageState.user.state === USER_AUTH_STATE.reject ||
            (
              indexPageState.user.state === USER_AUTH_STATE.success && (
                indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota ||
                indexPageState.order.state === ORDER_STATE.reject
              )
            )
          )&& (
            <div className={"mb-3"}>
              <LoanOverViewSection state={indexPageState}/>
            </div>
          )}



          {/*TODO: Remove me by identify state*/}
          <div className={"mb-3"}>
            <TipsSection state={indexPageState}/>
          </div>

          {(
            indexPageState.user.state === USER_AUTH_STATE.authing
          ) && (
            <>
              <NoticeUserInProgressAuthStatusSections/>
            </>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.authing
          ) && (
            <>
              <NoticeUserRejectedSection/>
            </>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.order.state === ORDER_STATE.reject
          ) && (
              <>
                <NoticeOrderRejectedSection/>
              </>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota
          ) && (
            <>
              <NoticeUserAuthedEmptyQuotaSection/>
            </>
          )}

          {(
            indexPageState.user.state === USER_AUTH_STATE.success &&
            (
              indexPageState.order.state === ORDER_STATE.reject ||
              indexPageState.riskControl.state === RISK_CONTROL_STATE.empty_quota
            )
          ) && (
            <WelcomeBackAndReapplyInTimeSection/>
          )}


        </PageContent>

      </div>

      <div className={"sticky bottom-[63px] px-3 py-3"}>
        {/*TODO*/}
        {(
          indexPageState.user.state === USER_AUTH_STATE.success
        ) && (
          <Button text={"Apply Now"} bgColor={"bg-[#F58B10]"}/>
        )}

        {(
          indexPageState.user.state === USER_AUTH_STATE.authing ||
          indexPageState.order.state === ORDER_STATE.reject
        ) && (
          <>
            <Button text={"View Application Progress"} bgColor={"bg-[#F58B10]"}/>
          </>
        )}

      </div>

      <TabBar/>

    </div>
  )
}
