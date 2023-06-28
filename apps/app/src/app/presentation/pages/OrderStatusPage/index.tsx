import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';

import { ApproveRecord } from '../../../api/loanService/ApproveRecord';
import { getToken } from '../../../modules/querystring/getToken';
import { isShowNavigation } from '../../../modules/window/isShowNavigation';
import { Navigation } from '../../components/layouts/Navigation';
import { PageContent } from '../../components/layouts/PageContent';
import { PagePathEnum } from '../PagePathEnum';
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
            navigate(`${PagePathEnum.RepaymentPage}?token=${getToken()}`);
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
