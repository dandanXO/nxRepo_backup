import { NoticeSectionContainer } from './index';

type Props = {
  //
};

export const NoticeUserAuthedEmptyQuotaSection = (props: Props) => {
  return (
    <NoticeSectionContainer>
      <div className={'text-orange-500 mb-2'}>Oops...</div>

      <div className={'paragraph font-light mb-3'}>
        We are sorry that there are currently no suitable options to recommend to you.
      </div>
      <div className={'paragraph font-light mb-3'}>
        If you have any questions, please contact our customer service center.
      </div>
    </NoticeSectionContainer>
  );
};
