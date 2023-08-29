import { useLocation, useNavigate } from 'react-router';

import { PostRepayCreateResponse } from '../../../api/loanService/PostRepayCreateResponse';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { getToken } from '../../../modules/querystring/getToken';
import { CopyButton } from '../../components/Buttons';
import { Label } from '../../components/Labels';
import Money from '../../components/Money.tsx';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';
import { PagePathEnum } from '../PagePathEnum';

const RepaymentInfoPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { payType, orderNo, payload } = state as PostRepayCreateResponse;

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
      <div className="mx-6 mt-9 flex flex-col items-center">
        <div className="text-ctext-secondary">Total de la Factura</div>
        <div className="mt-2 mb-4 flex text-4xl font-bold">
          <Money money={payload?.orderAmount || 0} />
        </div>
        {payload?.beneficiario && (
          <Label
            className="mb-2"
            title="Beneficiario"
            value={payload.beneficiario}
          />
        )}
        {payload?.clabe && (
          <Label
            className="mb-2"
            title="CLABE"
            value={payload.clabe}
            extra={
              <CopyButton
                className="rounded-full bg-[#E70020]"
                text="Copiar"
                value={payload.clabe}
              />
            }
          />
        )}
      </div>
    </Page>
  );
};

export default RepaymentInfoPage;
