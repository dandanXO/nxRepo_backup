import {NoticeSectionContainer} from "./index";

export const NoticeUserInProgressAuthStatusSections = () => {
  return (
    <NoticeSectionContainer>
      <div className={"text-orange-500 mb-2"}>Under review</div>

      <div className={"paragraph font-light mb-3"}>
        Your submitted order has been successfully received.
      </div>
      <div className={"paragraph font-light mb-3"}>
        Please wait patiently for review.
      </div>
    </NoticeSectionContainer>
  )
}
