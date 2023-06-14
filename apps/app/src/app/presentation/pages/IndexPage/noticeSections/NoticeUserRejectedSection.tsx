import { NoticeSectionContainer } from './index';

export const NoticeUserRejectedSection = () => {
  return (
    <NoticeSectionContainer dataTestingID="noticeUserRejected">
      <div  className={'mb-2 text-primary-main font-bold'}>Your application was not approved</div>

      <div className={'paragraph mb-3 leading-none'}>
        We regret to inform you that we cannot offer you any loans due to your credit score being below our standards.
      </div>
      <div className={'paragraph mb-3 leading-none'}>
        If you have any questions, please contact our customer service center.
      </div>
    </NoticeSectionContainer>
  );
};
