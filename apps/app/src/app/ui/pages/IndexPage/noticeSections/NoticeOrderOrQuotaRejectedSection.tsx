import { IndexPageProps } from 'apps/app/src/app/reduxStore';

import { NoticeSectionContainer } from './index';

type Props = IndexPageProps;

export const NoticeOrderOrQuotaRejectedSection = (props: Props) => {
  const withinOneDay = Number(props.state.timeout.refreshableDate.days) < 1;
  return (
    <NoticeSectionContainer dataTestingID="noticeOrderOrQuotaRejected">
      <div className={'text-primary-main mb-2 text-sm font-bold'}>
        Application Denied
      </div>
      {withinOneDay ? (
        <div
          className={'paragraph text-ctext-primary mb-4 text-sm leading-none'}
        >
          Your application has been declined due to insufficient credit score.
          You are welcome to try applying again in 24 hours.
        </div>
      ) : (
        <div>
          <div
            className={'paragraph text-ctext-primary mb-4 text-sm leading-none'}
          >
            We regret to inform you that your application has been denied due to
            your current credit score not meeting the requirements.
          </div>
          <div
            className={'paragraph text-ctext-primary mb-5 text-sm leading-none'}
          >
            You We kindly request you to try again later.
          </div>
        </div>
      )}
    </NoticeSectionContainer>
  );
};
