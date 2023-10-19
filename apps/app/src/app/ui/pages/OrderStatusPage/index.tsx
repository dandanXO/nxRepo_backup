import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { isShowNavigation } from '../../../device/isShowNavigation';
import { ApproveRecord } from '../../../externel/backend/loanService/ApproveRecord';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Navigation } from '../../core-components/Navigation';
import { PageContent } from '../../core-components/PageContent';
import { OrderStatusItem } from './OrderStatusItem';

const OrderStatusPage = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { approveRecords } = location.state;

  return (
    <div>
      {isShowNavigation() && (
        <Navigation
          title={'Order Status'}
          back={() => {
            navigate(
              `${PageOrModalPathEnum.RepaymentPage}?token=${getToken()}`
            );
          }}
        />
      )}
      <PageContent>
        {approveRecords?.length > 0 &&
          approveRecords &&
          approveRecords?.map((record: ApproveRecord, index: number) => {
            return (
              <OrderStatusItem
                key={record.title}
                title={record.title}
                content={record.content}
                date={moment(record.createTime).format('DD-MM-YYYY HH:mm:ss')}
                isHightLight={index === 0}
              />
            );
          })}
      </PageContent>
    </div>
  );
};

export default OrderStatusPage;