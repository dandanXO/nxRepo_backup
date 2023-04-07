import {NoticeSectionContainer} from "./index";

type Props = {
  days: string;
}
export const NoticeOrderOrQuotaRejectedSection = (props: Props) => {
  return (
    <NoticeSectionContainer>

      <div className={"text-orange-500 mb-2"}>Your application has not been approved</div>

      <div className={"paragraph font-light mb-3"}>
          Sorry, we regret to inform you that your loan application did not meet approval criteria.
      </div>
      <div className={"paragraph font-light mb-3"}>
        Please come back in <span className={"text-blue-500"}>{props.days}</span> days, we will assist you to reapply for the loan.
      </div>
      <div className={"paragraph font-light mb-3"}>
        If you have any questions, please contact our customer service center.
      </div>

    </NoticeSectionContainer>
  )
}
