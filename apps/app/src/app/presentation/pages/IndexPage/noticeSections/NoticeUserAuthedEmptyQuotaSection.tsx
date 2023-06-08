import { NoticeSectionContainer } from './index';

type Props = {
    //
};

export const NoticeUserAuthedEmptyQuotaSection = (props: Props) => {
    return (
        <NoticeSectionContainer dataTestingID="noticeUserAuthedEmptyQuota">
            <div className={'mb-2 text-orange-500 '}>Oops...</div>
            <div className={'paragraph mb-3 font-light leading-none'}>
                Our system is currently undergoing an upgrade, which may result in certain features being temporarily unavailable.
            </div>
            <div className={'paragraph mb-3 font-light leading-none'}>
                We are working hard to resolve this issue. Thank you for your understanding and patience.
            </div>
        </NoticeSectionContainer>
    );
};

