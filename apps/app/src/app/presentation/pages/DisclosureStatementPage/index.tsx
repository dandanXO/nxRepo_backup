import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';

const DisclosureStatementPage = () => {
  const navigate = useNavigate();
  const domain: string = useSelector((state: RootState) => state.app.androidAppInfo?.domain) || '';
  const url = (domain.includes('https://www.') ? domain :`https://www.${domain}`) + '/permission.html';

  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Disclosure Statement'}
        back={() => {
          navigate(-1);
        }}
      />
      <iframe className={`w-full grow`} src={url} title="" />
    </Page>
  );
};
export default DisclosureStatementPage;
