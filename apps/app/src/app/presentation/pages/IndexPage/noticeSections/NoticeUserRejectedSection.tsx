import { NoticeSectionContainer } from './index';

export const NoticeUserRejectedSection = () => {
  return (
    <NoticeSectionContainer>
      <div className={'mb-2 text-orange-500'}>Your application has not been approved</div>

      <div className={'paragraph mb-3 font-light'}>
        We regret to inform you that we cannot offer you any loans due to your credit score being below our standards.
      </div>
      <div className={'paragraph mb-3 font-light'}>
        If you have any questions, please contact our customer service center.
      </div>
    </NoticeSectionContainer>
  );
};
