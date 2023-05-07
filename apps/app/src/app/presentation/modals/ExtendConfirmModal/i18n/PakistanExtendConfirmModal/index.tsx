import { useNavigate, useLocation } from 'react-router';

import { PagePathEnum } from '../../../../pages/PagePathEnum';
import { getOrderNo } from '../../../../../modules/location/getOrderNo';
import { getToken } from '../../../../../modules/location/getToken';
import { Button } from '../../../../components/layouts/Button';

const PakistanExtendConfirmModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("ExtendConfirmModal.location.state", location.state)
  return (
    <div className={`p-4`}>
      {' '}
      <div className="text-xl font-bold">Extend</div>
      <div className="font-bold my-6 leading-tight">
        Extensions are intended for situations where you are genuinely
        experiencing financial difficulties and are unable to fully repay the
        amount owed.
      </div>
      <div className="font-bold mb-6 leading-tight">
        We recommend that you prioritize full repayment when possible for a
        higher credit limit.
      </div>
      <div className={`flex flex-row `}>
        <Button
          onClick={() => navigate(-1)}
          text={'Next time'}
          className={`w-full mr-1`}
        />
        <Button
          type={'ghost'}
          className={`w-full ml-1`}
          text={'Go extension'}
          onClick={() => {
            navigate(
              `${
                PagePathEnum.RepaymentDetailPage
              }/extend-modal?token=${getToken()}&orderNo=${getOrderNo()}`,
              {
                state: {
                  currentData: location.state,
                },
              }
            );
          }}
        />
      </div>
    </div>
  );
};

export default PakistanExtendConfirmModal;
