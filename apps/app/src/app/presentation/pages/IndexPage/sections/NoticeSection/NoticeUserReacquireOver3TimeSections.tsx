import {NoticeSectionContainer} from "./index";

export const NoticeUserReacquireOver3TimeSections = () => {
  return(
    <NoticeSectionContainer>
      <div className={"text-orange-500 mb-2"}>Your application has not been approved</div>

      <div className={"paragraph font-light mb-3"}>
        We regret to inform you that we cannot offer you any loans due to your credit score being below our standards.
      </div>
      <div className={"paragraph font-light mb-3"}>
        If you have any questions, please contact our customer service center.
      </div>
    </NoticeSectionContainer>
  )
}