import { NoticeSectionContainer } from './index';

type Props = {
  //
};

export const NoticeUserAuthedEmptyQuotaSection = (props: Props) => {
  return (
    <NoticeSectionContainer dataTestingID="noticeUserAuthedEmptyQuota">
      <div className={'text-primary-main mb-2 text-sm font-bold'}>Oops...</div>
      <div className={'paragraph text-ctext-primary mb-3 text-sm leading-none'}>
        Our system is currently undergoing an upgrade, which may result in
        certain features being temporarily unavailable.
      </div>
      <div className={'paragraph text-ctext-primary mb-3 text-sm leading-none'}>
        We are working hard to resolve this issue. Thank you for your
        understanding and patience.
      </div>
    </NoticeSectionContainer>
  );
};
