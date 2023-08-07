import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import { PagePathEnum } from '../PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';

const OnlineCustomerServicePage = () => {
  const navigate = useNavigate();
  const { indexPage } = useSelector((state: RootState) => state);

  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Customer Service'}
        back={() => {
          navigate(`${PagePathEnum.CustomerServicePage}?token=${getToken()}`);
        }}
      />
      <iframe className={`w-full grow`} src={indexPage?.indexAPI?.customerServiceUrl} title="" />
    </Page>
  );
};
export default OnlineCustomerServicePage;
