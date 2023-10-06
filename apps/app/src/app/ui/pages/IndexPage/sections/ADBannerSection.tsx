import { useDispatch } from 'react-redux';

import { IndexPageProps } from '../../../../reduxStore';
import { IndexPageSagaAction } from '../userUsecaseSaga/indexPageActions';

type Props = IndexPageProps;

export const ADBannerSection = (props: Props) => {
  const dispatch = useDispatch();
  // NOTE: User Event
  const onUserClickToOpenBrowser = (url: string) => {
    window.location.href = url;
  };

  const onUserClickToVerify = () => {
    dispatch(IndexPageSagaAction.user.authenticateSaga());
  };

  return (
    <div className={'flex flex-col'}>
      {props.state.openIndexAPI?.banners.map((banner, index) => {
        return (
          <div key={index} data-testing-id="adBanner" className={'ad-banner'}>
            <img
              className={'rounded-lg text-center text-white'}
              src={banner.imageUrl}
              onClick={onUserClickToVerify}
              // onClick={() => onUserClickToOpenBrowser(banner.jumpUrl || '')}
            />
          </div>
        );
      })}
    </div>
  );
};
