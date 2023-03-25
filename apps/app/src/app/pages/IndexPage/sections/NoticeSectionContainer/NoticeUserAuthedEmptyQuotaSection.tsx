import {NoticeSectionContainer} from "./index";

export const NoticeUserAuthedEmptyQuotaSection = () => {
  return (
    <NoticeSectionContainer>

      <div className={"text-orange-500 mb-2"}>Oops...</div>

      <div className={"paragraph font-light mb-3"}>
        We are sorry that there are currently no suitable options to recommend to you.
      </div>
      <div className={"paragraph font-light mb-3"}>
        The audit results will be updated after 12 hours. Please come back to reapply, and we will do our best to assist you.
      </div>
      <div className={"paragraph font-light mb-3"}>
        If you have any questions, please contact our customer service center.
      </div>

    </NoticeSectionContainer>
  )
}
