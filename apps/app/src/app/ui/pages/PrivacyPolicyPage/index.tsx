import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {RootState} from '../../../reduxStore';
import {Navigation} from '../../core-components/Navigation';
import {Page} from '../../core-components/Page';
import {loadingSlice} from "../../../reduxStore/loadingSlice";
import {useEffect} from 'react';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const domain: string = useSelector((state: RootState) => state.app.appDomain) || '';
  const url = (domain.includes('https://www.') ? domain :`https://www.${domain}`) + '/privacy.html';
  const dispatch = useDispatch();
  // console.log("domain: ", domain)
  // console.log("url: ", url)

  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(true));
  }, [])

  const oniFrameLoad = () => {
    dispatch(loadingSlice.actions.updatePageLoading(false));
  }
  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Privacy Policy'}
        back={() => {
          navigate(-1);
        }}
      />
      {domain && url && <iframe className={`w-full grow`} src={url} title="" onLoad={oniFrameLoad}/>}
    </Page>
  );
};

export default PrivacyPolicyPage;
