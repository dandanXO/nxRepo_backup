import { NoticeSectionContainer } from './index';

export const NoticeUserInProgressAuthStatusSections = () => {
  return (
    <NoticeSectionContainer dataTestingID='noticeUserInProgress'>
      <div className={'mb-2 text-orange-500'}>Under review</div>

      <div className={'paragraph mb-3 font-light'}>Your submitted order has been successfully received.</div>
      <div className={'paragraph mb-3 font-light'}>Please wait patiently for review.</div>
    </NoticeSectionContainer>
  );
};
