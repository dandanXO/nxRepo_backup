import { NoticeSectionContainer } from './index';

type Props = {};
export const NoticeOrderOrQuotaRejectedSection = (props: Props) => {
    return (
        <NoticeSectionContainer dataTestingID="noticeOrderOrQuotaRejected">
            <div className={'mb-2 text-primary-main font-bold'}>We apologize for the inconvenience</div>
            <div className={'paragraph mb-4 font-normal leading-none text-sm'}>
                We are currently unable to process your loan application. This does not mean that your credit is bad; it is simply due to a high number of current applicants, making it difficult for us to meet everyone's needs immediately.
            </div>
            <div className={'paragraph mb-4 font-normal leading-none text-sm'}>
                Tip: Repaying loans on time can help prioritize your loan application.
            </div>
            <div className={'paragraph mb-5 font-normal leading-none text-sm'}>
                You are welcome to try applying again after the countdown is complete.
            </div>
        </NoticeSectionContainer>
    );
};


