import { NoticeSectionContainer } from './index';

export const NoticeUserInProgressAuthStatusSections = () => {
  return (
    <NoticeSectionContainer dataTestingID='noticeUserInProgress'>
      <div className={'mb-2 text-primary-main'}>Under review</div>

      <div className={'paragraph mb-3 leading-none'}>Your submitted order has been successfully received.</div>
      <div className={'paragraph mb-3 leading-none'}>Please wait patiently for review.</div>
    </NoticeSectionContainer>
  );
};
