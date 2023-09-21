import { IndexPageProps } from '../../../../reduxStore';

type Props = IndexPageProps;

export const ADBannerSection = (props: Props) => {
  // NOTE: User Event
  const onUserClickToOpenBrowser = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className={'flex flex-col'}>
      {props.state.openIndexAPI?.banners.map((banner, index) => {
        return (
          <div key={index} data-testing-id="adBanner" className={'ad-banner'}>
            <img
              className={'rounded-lg text-center text-white'}
              src={banner.imageUrl}
              // onClick={() => onUserClickToOpenBrowser(banner.jumpUrl || '')}
            />
          </div>
        );
      })}
    </div>
  );
};
