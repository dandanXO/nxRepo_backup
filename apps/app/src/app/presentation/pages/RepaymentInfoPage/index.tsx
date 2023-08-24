import { useNavigate } from 'react-router';

import { getToken } from '../../../modules/querystring/getToken';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import { PagePathEnum } from '../PagePathEnum';

const RepaymentInfoPage = () => {
  const navigate = useNavigate();

  return (
    <Page className="flex flex-col">
      <Navigation
        title="STP"
        back={() => {
          navigate(`${PagePathEnum.RepaymentPage}?token=${getToken()}`);
        }}
      />
    </Page>
  );
};

export default RepaymentInfoPage;
