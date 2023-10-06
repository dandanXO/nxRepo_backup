import {NoticeSectionContainer} from './index';

type Props = {
    //
};

export const NoticeUserAuthedEmptyQuotaSection = (props: Props) => {
    return (
        <NoticeSectionContainer dataTestingID="noticeUserAuthedEmptyQuota">
            <div className={'mb-2 text-sm text-primary-main font-bold'}>Oops...</div>
            <div className={'paragraph mb-3 text-sm text-ctext-primary leading-none'}>
                Our system is currently undergoing an upgrade, which may result in certain features being temporarily unavailable.
            </div>
            <div className={'paragraph mb-3 text-sm text-ctext-primary leading-none'}>
                We are working hard to resolve this issue. Thank you for your understanding and patience.
            </div>
        </NoticeSectionContainer>
    );
};


