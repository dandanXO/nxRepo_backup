import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../components/layouts/Navigation';

const DisclosureStatementPage = () => {
  const navigate = useNavigate();
  const domain: string = useSelector((state: RootState) => state.app.androidAppInfo?.domain) || '';
  const url = domain + '/permission.html';
  return (
    <div>
      <Navigation
        title={'Disclosure Statement'}
        back={() => {
          navigate(-1);
        }}
      />
      <iframe className={`w-full grow`} src={url} title="" />
    </div>
  );
};
export default DisclosureStatementPage;
