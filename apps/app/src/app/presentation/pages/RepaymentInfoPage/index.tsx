import { useLocation, useNavigate } from 'react-router';

import { PostRepayCreateResponse } from '../../../api/loanService/PostRepayCreateResponse';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { getToken } from '../../../modules/querystring/getToken';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import { PagePathEnum } from '../PagePathEnum';

const RepaymentInfoPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { payType, orderNo } = state as PostRepayCreateResponse;

  return (
    <Page className="flex flex-col">
      <Navigation
        title={payType}
        back={() => {
          navigate(
            `${
              PagePathEnum.RepaymentDetailPage
            }/repayment-modal?token=${getToken()}&orderNo=${
              orderNo ?? getOrderNo()
            }`,
            {
              state: {},
            }
          );
        }}
        backgroundColor="#E70020"
      />
    </Page>
  );
};

export default RepaymentInfoPage;
