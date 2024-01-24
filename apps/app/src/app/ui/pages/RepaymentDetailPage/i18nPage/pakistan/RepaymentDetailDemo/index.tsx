import {useTranslation} from 'react-i18next';

import Money from '../../../../../components/Money';
import Divider from '../../../../../core-components/Divider';
import ListItem from '../../../../../core-components/ListItem';
import {i18nLoanDetailsPage} from '../../../translations';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";

interface IRepaymentDetailDemo {
  loanAmount: number;
}

const RepaymentDetailDemo = (props: IRepaymentDetailDemo) => {
  const {t} = useTranslation(i18nLoanDetailsPage.namespace);

  const isFetching = false;

  const loanAmount = Number(props.loanAmount);
  const bankTransCost = Number((loanAmount * 0.03).toFixed(0));
  const cibCost = 19;
  const nadraVerysisCost = 40;
  // const repaymentAmount =
  //   loanAmount + bankTransCost + cibCost + nadraVerysisCost;

  const repaymentAmountForDemo = useSelector((state: RootState) => state.repaymentDetailPage.repaymentData.repaymentAmountForDemo);

  return (
    <div className={``}>
      <ListItem
        title={t('Disbursal Amount')}
        text={<Money money={loanAmount}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('Markup Fee')}
        text={<Money money={0}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('Processing Fee')}
        text={<Money money={0}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('Other Charges')}
        text={<Money money={0}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('Overdue Days')}
        text={'0'}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('Overdue Fee')}
        text={<Money money={0}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('Banking Trans. Cost')}
        text={<Money money={bankTransCost}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('CIB Cost')}
        text={<Money money={cibCost}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <ListItem
        title={t('NADRA Verysis Cost')}
        text={<Money money={nadraVerysisCost}/>}
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
      <Divider/>
      <ListItem
        title={t('Repayment Amount')}
        text={<Money money={Number(repaymentAmountForDemo)}/>}
        className="font-bold"
        titleColor="text-ctext-secondary"
        textColor="text-ctext-primary"
        isFetching={isFetching}
      />
    </div>
  );
};

export default RepaymentDetailDemo;
