import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { RootState } from '../../../reduxStore';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';

const OnlineCustomerServicePage = () => {
  const navigate = useNavigate();
  const { indexPage } = useSelector((state: RootState) => state);

  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Customer Service'}
        back={() => {
          navigate(
            `${PageOrModalPathEnum.CustomerServicePage}?token=${getToken()}`
          );
        }}
      />
      <iframe
        className={`w-full grow`}
        src={indexPage?.indexAPI?.customerServiceUrl}
      />
    </Page>
  );
};
export default OnlineCustomerServicePage;
