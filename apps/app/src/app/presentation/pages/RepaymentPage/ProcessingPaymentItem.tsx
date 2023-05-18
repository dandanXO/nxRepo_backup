// import Button from "../../components/Button";
import Divider from '../../components/Divider';
import {useState} from 'react';
import ListItem from '../../components/ListItem';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { getToken } from '../../../modules/querystring/getToken';
import { GetLoanRecord } from '../../../api/loanService/GetLoanRecord';
import { PagePathEnum } from '../PagePathEnum';
import { Status } from '../../../modules/statusEnum';
import cx from 'classnames'
import {CardHeaderSection} from "./CardHeaderSection";
import {CardCollapseSection} from "./CardCollapseSection";
import {CardContentSection} from "./CardContentSection";

const ProcessingPaymentItem = (props: GetLoanRecord) => {
    const navigate = useNavigate();

    // NOTE: 印度的時間格式要轉成 日/月/年
    const {
        iconUrl = '',
        productName = '',
        status = '',
        orderNo = '',
        orderAmount = '',
        approveRecords = [],
        applyDate = '',
    } = props;

    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };

    const statusColor = Status('PROCESSING').color;
    const statusBackground = Status('PROCESSING').bg;

    return (
        <div className={`border-solid border-ctext-divider border pb-2 mx-4 mb-5 rounded-lg`} onClick={handleCollapse}>

            <CardHeaderSection
              statusBackground={statusBackground}
              iconUrl={iconUrl}
              productName={productName}
              statusColor={statusColor}
              statusName={"Processing"}
            />

            <CardContentSection
              amountName={"Loan Amount"}
              orderAmount={orderAmount}
              onClick={() =>
                navigate(`${PagePathEnum.OrderStatusPage}?token=${getToken()}`, {
                  state: { orderNo, approveRecords },
                })}
            />

            <div className="px-3"> <Divider /></div>

            {collapse && (
                <div className={cx('px-3')}>
                    <ListItem
                        key={'OrderNo.'}
                        title={'Order No.'}
                        text={orderNo ?? ''}
                        titleColor={'text-ctext-secondary'}
                    />
                    <ListItem
                        key={'ApplyDate'}
                        title={'Apply Date'}
                        text={applyDate ? moment(applyDate).format('DD-MM-YYYY') : ''}
                        titleColor={'text-ctext-secondary'}
                    />
                    <Divider />
                </div>
            )}

          <CardCollapseSection collapse={collapse}/>
        </div>
    );
};

export default ProcessingPaymentItem;
