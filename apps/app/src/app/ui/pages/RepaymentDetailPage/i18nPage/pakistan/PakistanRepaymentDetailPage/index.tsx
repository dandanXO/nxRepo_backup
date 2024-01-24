import {RootState} from 'apps/app/src/app/reduxStore';
import cx from 'classnames';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {AmountPaidIcon} from '@frontend/mobile/shared/ui';

import {getToken} from '../../../../../../application/getToken';
import {GetLoanDetailResponse} from '../../../../../../externel/backend/loanService/GetLoanDetailResponse';
import {getOrderNo} from '../../../../../../externel/window/querystring/getOrderNo';
import {formatDate} from '../../../../../../modules/format/formatDate';
import Money from '../../../../../components/Money';
import {Button} from '../../../../../core-components/Button';
import Divider from '../../../../../core-components/Divider';
import ListItem from '../../../../../core-components/ListItem';
import {Status} from '../../../../../statusEnum';
import {useDynamicChargeFeeList} from '../../../hooks/useDynamicChargeFeeList';
import {i18nLoanDetailsPage} from '../../../translations';
import RepaymentDetailDemo from '../RepaymentDetailDemo';

type IRepaymentDetailPage = {
  currentData?: GetLoanDetailResponse;
  isFetching?: boolean;
};
const PakistanRepaymentDetailPage = (props: IRepaymentDetailPage) => {
  const navigate = useNavigate();
  const {currentData, isFetching = true} = props || {};
  const {
    status = '',
    productName = '',
    orderNo = '',
    dueDate = '',
    overdueDays = '',
    paidAmount = '',
    repayRecords = [],
    totalRepayAmount = '',
    // chargeFeeDetail,
    extendDate = '',
    extensionFee = '',
    // totalDueAmount = '',
    extendable,
    reductionAmount = 0,
    penaltyInterest = 0,
    loanAmount = 0,
    // dailyFee = 0,
    balance = 0,
    coupon = 0,
    applyDate = '',
    extensibleOverdueDays = 0,
  } = currentData ?? {};

  const repaymentDate =
    repayRecords.length > 0
      ? repayRecords[repayRecords.length - 1].repayDate
      : '';

  const finalItems = useDynamicChargeFeeList(
    props.currentData?.chargeFeeDetail?.items || undefined
  );
  const {t} = useTranslation(i18nLoanDetailsPage.namespace);

  const renderStatusTag = (status: string) => {
    return (
      <div className={`${Status(status)?.color} ${Status(status)?.bg} px-1`}>
        {t(Status(status)?.text)}
      </div>
    );
  };
  const {app} = useSelector((state: RootState) => state);

  const isTodayRepayment =
    formatDate(moment(applyDate)) === formatDate(moment()) &&
    status === 'UNPAID';

  return (
    <div>
      {currentData &&
        currentData?.status !== 'PAY_OFF' &&
        currentData?.status !== 'EXTEND' && (
          <div
            className={`bg-cstate-info-variant text-cstate-info-main py-2 text-center text-sm`}
          >
            {t('Get more amount after instant payment')}
          </div>
        )}
      <div className={`px-6 pt-3`}>
        <ListItem
          title={t('Product')}
          text={productName ?? ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Order No.')}
          text={orderNo ?? ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Status')}
          text={status ? renderStatusTag(status) : ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Apply Date')}
          text={applyDate ? formatDate(moment(applyDate)) : ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Due Date')}
          text={dueDate ? formatDate(moment(dueDate)) : ''}
          titleColor="text-ctext-secondary"
          textColor="text-ctext-primary"
          isFetching={isFetching}
        />

        {status === 'PAY_OFF' && (
          <ListItem
            title={t('Repayment Date')}
            text={repaymentDate ? formatDate(moment(repaymentDate)) : ''}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        {status === 'EXTEND' && (
          <ListItem
            title={t('Extension Date')}
            text={extendDate ? formatDate(moment(extendDate)) : ''}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        <Divider/>

        {/*NOTICE: 合同金*/}
        {/*<ListItem title={'Loan Amount'} text={<Money money={orderAmount}/>} titleColor="text-ctext-secondary" />*/}

        {isTodayRepayment ? (
          <RepaymentDetailDemo loanAmount={loanAmount}/>
        ) : (
          <>
            {status !== 'EXTEND' && (
              <ListItem
                title={t('Disbursal Amount')}
                text={<Money money={loanAmount}/>}
                titleColor="text-ctext-secondary"
                textColor="text-ctext-primary"
                isFetching={isFetching}
              />
            )}

            {status !== 'EXTEND' &&
              finalItems?.map((item: any) => {
                if (!item) return null;
                return (
                  <ListItem
                    title={item.itemName}
                    text={<Money money={item.value}/>}
                    titleColor="text-ctext-secondary"
                    textColor="text-ctext-primary"
                    isFetching={isFetching}
                  />
                );
              })}

            {/* {status !== 'EXTEND' && (
          <ListItem
            title={'Daily Fee'}
            text={<Money money={dailyFee} />}
            titleColor="text-ctext-secondary"
            textColor="text-ctext-primary"
          />
        )} */}
            {status === 'EXTEND' && (
              <ListItem
                title={t('Extension Fee')}
                text={<Money money={extensionFee}/>}
                titleColor="text-ctext-secondary"
                textColor="text-ctext-primary"
                isFetching={isFetching}
              />
            )}

            <ListItem
              title={t('Overdue Days')}
              text={overdueDays ?? ''}
              titleColor="text-ctext-secondary"
              textColor={
                status === 'OVERDUE'
                  ? Status(status).color
                  : 'text-ctext-primary'
              }
              isFetching={isFetching}
            />
            <ListItem
              title={t('Overdue Fee')}
              text={<Money money={penaltyInterest}/>}
              titleColor="text-ctext-secondary"
              textColor={
                status === 'OVERDUE'
                  ? Status(status).color
                  : 'text-ctext-primary'
              }
              isFetching={isFetching}
            />

            <Divider/>

            {status !== 'EXTEND' && (
              <ListItem
                title={t('coupon')}
                text={<Money money={coupon} isNagetive={true}/>}
                titleColor="text-ctext-secondary"
                textColor="text-ctext-primary"
                isFetching={isFetching}
              />
            )}

            <ListItem
              title={t('Reduction Amount')}
              text={<Money money={reductionAmount} isNagetive={true}/>}
              titleColor="text-ctext-secondary"
              textColor="text-ctext-primary"
              isFetching={isFetching}
            />

            <ListItem
              titleColor="text-ctext-secondary"
              title={
                <div className={`item-center flex flex-row items-center`}>
                  <div className={` mr-1`}>{t('Amount Repaid')}</div>
                  <div
                    onClick={() => {
                      navigate(
                        `amount-repaid-record-modal?token=${getToken()}&orderNo=${
                          orderNo ?? getOrderNo()
                        }`,
                        {
                          state: {repayRecords},
                        }
                      );
                    }}
                  >
                    <img src={AmountPaidIcon}/>
                  </div>
                </div>
              }
              text={<Money money={paidAmount} isNagetive={true}/>}
              textColor="text-ctext-primary"
              isFetching={isFetching}
            />

            <Divider/>
            {/*NOTE: 總應還金額*/}
            {status !== 'EXTEND' && (
              <ListItem
                title={t('Repayment Amount')}
                text={<Money money={balance}/>}
                className="font-bold"
                titleColor={
                  status === 'OVERDUE'
                    ? Status(status).color
                    : 'text-ctext-primary'
                }
                textColor={
                  status === 'OVERDUE'
                    ? Status(status).color
                    : 'text-ctext-primary'
                }
                isFetching={isFetching}
              />
            )}

            {/*NOTE: 總展期金額 (Extension Fee + Overdue Fee) 欄位後端有提供 狀態為EXTEND -> totalRepayAmount */}
            {status === 'EXTEND' && (
              <ListItem
                title={t('Total Extension Fee')}
                text={<Money money={totalRepayAmount}/>}
                titleColor="text-ctext-primary"
                textColor="text-ctext-primary"
                className="font-bold"
                isFetching={isFetching}
              />
            )}
          </>
        )}
        <div className={`my-3 flex flex-row text-white`}>
          {extendable !== undefined && extendable && (
            <div
              onClick={() => {
                navigate(
                  `extend-confirm-modal?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: currentData,
                  }
                );
              }}
              className={`mr-1.5 grow `}
            >
              <Button type={'ghost'} text={t('Extend')}/>
            </div>
          )}
          {status !== 'PAY_OFF' && status !== 'EXTEND' && (
            <div
              onClick={() => {
                if (currentData === undefined) return;
                navigate(
                  `repayment-modal?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: currentData,
                  }
                );
              }}
              className={cx(`grow`, {
                'ml-1.5': extendable,
              })}
            >
              <Button text={t('Repay')} primaryTypeGradient={true}/>
            </div>
          )}
        </div>

        {(status === 'UNPAID' || status === 'OVERDUE') && (
          <>
            <div className={`text-ctext-secondary mb-4 text-xs leading-none`}>
              <div>{t('Attention')}：</div>
              <ul className="list-outside list-decimal pl-3 pt-1">
                <li>
                  {t(
                    'Before repayment, please make sure that you have enough balance on your bank account.'
                  )}
                </li>
                <li>
                  {t('Overdue for more than')}{' '}
                  <span className={`text-primary-main`}>
                    {extensibleOverdueDays + t(' days')}{' '}
                  </span>
                  {t(
                    'will not be able to extend or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our services.'
                  )}
                </li>
                <li>
                  {t(
                    'Email us if you have any questions about your responsibilities or for more information.'
                  )}{' '}
                  <span className={`text-primary-main`}>
                    {app?.init?.csEmail || ''}
                  </span>
                </li>
              </ul>
            </div>
            <div className={`my-3 flex flex-col`}>
              <div className="bg-cstate-disable-assistant mx-[-24px] h-2.5 "></div>
              <div className={`text-ctext-primary my-3 text-xs leading-none`}>
                {t(
                  'After completing the repayment, take a screenshot and upload your repayment receipt here ▼'
                )}
              </div>
              {/*TODO: 先兼容 querystring*/}
              <div
                className={`mb-2 grow`}
                onClick={() => {
                  // console.log('Upload Receipt---------', orderNo);
                  navigate(
                    `/v2/upload-payment-receipt?token=${getToken()}&orderNo=${
                      orderNo ?? getOrderNo()
                    }`,
                    {
                      state: {orderNo},
                    }
                  );
                }}
              >
                <Button
                  type={'ghost'}
                  className={`w-full`}
                  ghostTheme={'secondary'}
                  text={t('Upload Receipt')}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PakistanRepaymentDetailPage;
