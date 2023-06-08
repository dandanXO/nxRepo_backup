import { NoticeSectionContainer } from './index';

export const NoticeUserReacquireOver3TimeSections = () => {
  return (
    <NoticeSectionContainer dataTestingID="noticeUserReacquireOver3Time">
      <div className={'mb-2 text-orange-500'}>Your application was not approved</div>

      <div className={'paragraph mb-3 font-light leading-none'}>
        We regret to inform you that we cannot offer you any loans due to your credit score being below our standards.
      </div>
      <div className={'paragraph mb-3 font-light leading-none'}>
        If you have any questions, please contact our customer service center.
      </div>
    </NoticeSectionContainer>
  );
};