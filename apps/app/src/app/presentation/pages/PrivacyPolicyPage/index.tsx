import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const domain: string = useSelector((state: RootState) => state.app.androidAppInfo?.domain) || '';
  const url = (domain.includes('https://www.') ? domain :`https://www.${domain}`) + '/privacy.html';
 
  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Privacy Policy'}
        back={() => {
          navigate(-1);
        }}
      />
      <iframe className={`w-full grow`} src={url} title="" />
    </Page>
  );
};

export default PrivacyPolicyPage;
