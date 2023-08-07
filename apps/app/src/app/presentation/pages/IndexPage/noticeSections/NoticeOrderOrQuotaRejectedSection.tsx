import { IndexPageProps } from 'apps/app/src/app/reduxStore';
import { NoticeSectionContainer } from './index';

type Props = IndexPageProps;

export const NoticeOrderOrQuotaRejectedSection = (props: Props) => {
    const withinOneDay = Number(props.state.timeout.refreshableDate.days) < 1;
    return (
        <NoticeSectionContainer dataTestingID="noticeOrderOrQuotaRejected">
            <div className={'mb-2 text-primary-main font-bold'}>Application Denied</div>
            {withinOneDay ?
             (<div className={'paragraph mb-4 font-normal leading-none text-sm'}>
                Your application has been declined due to insufficient credit score. You are welcome to try applying again in 24 hours.
             </div>) : 
             (<div>
                <div className={'paragraph mb-4 font-normal leading-none text-sm'}>
                    We regret to inform you that your application has been denied due to your current credit score not meeting the requirements.
                </div>
                <div className={'paragraph mb-5 font-normal leading-none text-sm'}>
                    You
                    We kindly request you to try again later.
                </div>
             </div>
            )}
            
        </NoticeSectionContainer>
    );
};


