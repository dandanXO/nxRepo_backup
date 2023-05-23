import { Navigation } from '../../components/layouts/Navigation';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const domain: string = useSelector((state: RootState) => state.app.androidAppInfo?.domain) || '';
  const url = domain + '/privacy.html';

  return (
    <div>
      <Navigation
        title={'Privacy Policy'}
        back={() => {
          navigate(-1);
        }}
      />
      <iframe className={`w-full grow`} src={url} title="" />
    </div>
  );
};

export default PrivacyPolicyPage;
