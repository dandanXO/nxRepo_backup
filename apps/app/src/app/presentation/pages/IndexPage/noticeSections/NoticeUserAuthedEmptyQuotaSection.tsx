import { NoticeSectionContainer } from './index';

type Props = {
  //
};

export const NoticeUserAuthedEmptyQuotaSection = (props: Props) => {
  return (
    <NoticeSectionContainer>
      <div className={'mb-2 text-orange-500'}>Oops...</div>

      <div className={'paragraph mb-3 font-light'}>
        We are sorry that there are currently no suitable options to recommend to you.
      </div>
      <div className={'paragraph mb-3 font-light'}>
        If you have any questions, please contact our customer service center.
      </div>
    </NoticeSectionContainer>
  );
};
