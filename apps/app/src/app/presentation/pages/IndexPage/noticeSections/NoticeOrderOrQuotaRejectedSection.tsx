import { NoticeSectionContainer } from './index';

type Props = {};
export const NoticeOrderOrQuotaRejectedSection = (props: Props) => {
  return (
    <NoticeSectionContainer>
      <div className={'mb-2 text-orange-500'}>Your application has not been approved</div>

      <div className={'paragraph mb-3 font-light'}>
        Sorry, we regret to inform you that your loan application did not meet approval criteria.
      </div>

      <div className={'paragraph mb-3 font-light'}>
        If you have any questions, please contact our customer service center.
      </div>
    </NoticeSectionContainer>
  );
};
