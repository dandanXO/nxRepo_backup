import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import { useCallback, useState } from 'react';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { formatPrice } from '../../../../../modules/format/formatPrice';
import Money from '../../../../components/Money.tsx';
import { Checkbox, ICheckboxProps } from '../../../../components/Checkbox';
import { FinalProductType } from '../../../../pages/IndexPage';
import { IChargeFeeDetails } from 'apps/app/src/app/api/loanService/GetReservationResponse';
import { i18nProduct } from '../translations';
import { useTranslation } from 'react-i18next';


type Props = {
  product: FinalProductType;
  checkable?: boolean;
  checkboxProps?: ICheckboxProps;
  chargeFeeDetails?: IChargeFeeDetails[];
}

export const MexicoProduct = (props: Props ) => {
    const { checkable = false } = props;
    const [expand, setExpand] = useState(false);
    const toggleExpand = useCallback(() => {
        setExpand(!expand);
    }, [expand]);

    const { t } = useTranslation(i18nProduct.namespace);

    return (
        <div className={cx('product mb-2 flex flex-col  text-sm ')} >
            <div className='flex flex-row justify-between items-center'>
            {checkable &&
                <div className='mr-2'>
                    <Checkbox {...props?.checkboxProps} />
                </div>
            }
            <div className={'brand flex flex-row justify-between pb-1 grow'} onClick={toggleExpand}>
                <div className={'left flex flex-row items-center'}>
                    <div className={'mr-3 h-10 w-10 rounded-md'}>
                        <img src={props.product.logoUrl} />
                    </div>
                    <div className={'text-ctext-primary'}>{props.product.productName}</div>
                </div>
                <div className={'right flex flex-row items-center text-ctext-primary'}>
                    <div><Money money={props.product.calculating.finalLoanPrice ?? 0} /></div>
                    {expand ? <MdExpandLess size={30} className={'fill-cstate-disable-main'} /> : <MdExpandMore size={30} className={'fill-cstate-disable-main'} />}
                </div>
            </div>
            </div>

            {expand && (
                <div className={'expandable-brand flex flex-col bg-cbg-tertiary py-3 px-4 text-ctext-secondary text-xs mt-2'}>
                    <div className={'item mb-2 flex flex-row justify-between '}>
                        <div className={'key'}>{t('Loan Amount')}</div>
                        <div className={'value'}><Money money={props.product.calculating.finalLoanPrice} /></div>
                    </div>
                    {
                      props?.chargeFeeDetails &&
                      props?.chargeFeeDetails.length > 0 &&
                      props?.chargeFeeDetails.map(i => {
                        return (
                          <div className={'item mb-2 flex flex-row justify-between '}>
                            <div className={'key'}>{i.title} </div>
                            <div className={'value'}><Money money={i.feeAmount ?? 0} /></div>
                          </div>
                        )
                      })
                    }

                    <div className={'item mb-2 flex flex-row justify-between '}>
                        <div className={'key'}>{t('Disbursal Amount')}</div>
                        <div className={'value'}><Money money={props.product.calculating.disbursalPrice ?? 0} /></div>
                    </div>

                    <div className={'item flex flex-row justify-between '}>
                        <div className={'key'}>{t('Due Date')}</div>
                        <div className={'value'}>{props.product.calculating.dueDate}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
