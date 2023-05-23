import { useLocation, useNavigate } from 'react-router';

import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../modules/querystring/getToken';
import { Button } from '../../../../components/layouts/Button';
import { PagePathEnum } from '../../../../pages/PagePathEnum';

const IndiaExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("ExtendConfirmModal.location.state", location.state);

  return (
    <div className={`p-4`}>
      {' '}
      <div className="text-xl font-bold">Extend</div>
      <div className="my-6 font-bold leading-tight">
        Extensions are intended for situations where you are genuinely experiencing financial difficulties and are
        unable to fully repay the amount owed.
      </div>
      <div className="mb-4 font-bold leading-tight">
        We recommend that you prioritize full repayment when possible for a higher credit limit.
      </div>
      <div className={`flex flex-col`}>
        <Button
          className={`mb-2 w-full`}
          text={'Got it and go extension'}
          onClick={() => {
            navigate(`${PagePathEnum.RepaymentDetailPage}/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
              state: {
                currentData: location.state,
              },
            });
          }}
        />
        <Button type={'ghost'} className={`w-full`} text={'Next time'} onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default IndiaExtendConfirmModal;
