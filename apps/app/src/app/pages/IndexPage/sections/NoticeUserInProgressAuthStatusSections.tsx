import {PageContentNotificationContainer} from "../PageContentNotificationContainer";

export const NoticeUserInProgressAuthStatusSections = () => {
  return (
    <PageContentNotificationContainer>
      <div className={"text-orange-500 mb-2"}>Under review</div>

      <div className={"paragraph font-light mb-3"}>
        Your submitted order has been successfully received.
      </div>
      <div className={"paragraph font-light mb-3"}>
        Please wait patiently for review.
      </div>
    </PageContentNotificationContainer>
  )
}
