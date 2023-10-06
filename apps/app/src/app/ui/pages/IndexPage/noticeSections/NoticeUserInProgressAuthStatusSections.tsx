import { NoticeSectionContainer } from './index';

export const NoticeUserInProgressAuthStatusSections = () => {
  return (
    <NoticeSectionContainer dataTestingID="noticeUserInProgress">
      <div className={'text-primary-main mb-2 text-sm font-bold'}>
        Under review
      </div>
      <div className={'paragraph text-ctext-primary mb-3 text-sm leading-none'}>
        Your submitted order has been successfully received.
      </div>
      <div className={'paragraph text-ctext-primary mb-3 text-sm leading-none'}>
        Please wait patiently for review.
      </div>
    </NoticeSectionContainer>
  );
};
