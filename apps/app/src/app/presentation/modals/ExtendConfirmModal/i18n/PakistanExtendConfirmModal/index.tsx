import { useNavigate, useLocation } from 'react-router';

import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { getOrderNo } from '../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../modules/querystring/getToken';
import { Button } from '../../../../components/layouts/Button';

const PakistanExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("ExtendConfirmModal.location.state", location.state)
  return (
    <div className={`p-4`}>
      {' '}
      <div className="text-xl font-bold">Extend</div>
      <div className="my-6 font-bold leading-tight">
        Extensions are intended for situations where you are genuinely experiencing financial difficulties and are
        unable to fully repay the amount owed.
      </div>
      <div className="mb-6 font-bold leading-tight">
        We recommend that you prioritize full repayment when possible for a higher credit limit.
      </div>
      <div className={`flex flex-row `}>
        <Button onClick={() => navigate(-1)} text={'Next time'} className={`mr-1 w-full`} />
        <Button
          type={'ghost'}
          className={`ml-1 w-full`}
          text={'Go extension'}
          onClick={() => {
            navigate(`${PagePathEnum.RepaymentDetailPage}/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`, {
              state: {
                currentData: location.state,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default PakistanExtendConfirmModal;
