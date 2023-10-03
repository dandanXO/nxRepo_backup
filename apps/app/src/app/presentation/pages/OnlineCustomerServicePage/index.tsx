import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { getToken } from '../../../modules/querystring/getToken';

const OnlineCustomerServicePage = () => {
  const navigate = useNavigate();
  const { indexPage } = useSelector((state: RootState) => state);

  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Customer Service'}
        back={() => {
          navigate(`${PageOrModalPathEnum.CustomerServicePage}?token=${getToken()}`);
        }}
      />
      <iframe className={`w-full grow`} src={indexPage?.indexAPI?.customerServiceUrl} title="" />
    </Page>
  );
};
export default OnlineCustomerServicePage;
