import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router';
import Select from "../../../../components/Select";

import { Status } from '../../../../../modules/statusEnum';
import Divider from '../../../../components/Divider';
import ListItem from '../../../../components/ListItem';
import Money from '../../../../components/Money.tsx';
import { Button } from '../../../../components/layouts/Button';
import { selectStyles } from '../../../../components/layouts/selectStyles';
import { formatDate } from "../../../../../modules/format/formatDate";
import Modal from '../../../../components/Modal';

type paymentMethodValueType = {
    value: string;
    label: string;
};
const PakistanExtendModal = (props: any) => {
    const navigate = useNavigate();
    const {
        repayConfirmDetail: { extendDate, extensionFee, extensionPayAmount = '' },
        orderNo = '',
        productName = '',
        dueDate = '',
        overdueDays = '',
        penaltyInterest = '',
        reductionAmount,
        paidAmount,
        status = '',
    } = props.currentData ?? {};

    return (
        <Modal >
            <div className='p-4'>
                <div className="text-ctext-primary mb-4 text-xl font-bold">Extend</div>
                <ListItem
                    title={'Product'}
                    text={productName ?? ''}
                    titleColor="text-ctext-secondary"
                    textColor="text-ctext-primary"
                />
                <ListItem title={'No.'} text={orderNo ?? ''} titleColor="text-ctext-secondary" textColor="text-ctext-primary" />
                <ListItem
                    title={'Due Date'}
                    text={dueDate ? formatDate(moment(dueDate)) : ''}
                    titleColor="text-ctext-secondary"
                    textColor="text-ctext-primary"
                />
                {/*NOTE: 展期費用*/}
                <ListItem
                    title={'Extension Fee'}
                    text={<Money money={extensionFee} />}
                    titleColor="text-ctext-secondary"
                    textColor="text-ctext-primary"
                />
                <ListItem
                    title={'Overdue Days'}
                    text={overdueDays ?? ''}
                    titleColor="text-ctext-secondary"
                    textColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
                />
                {/*NOTE: 展期罰金*/}
                <ListItem
                    title={'Overdue Fee'}
                    text={<Money money={penaltyInterest} />}
                    titleColor="text-ctext-secondary"
                    textColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
                />

                {/*NOTE: 減免金額*/}
                <ListItem
                    title={'Reduction Amount'}
                    text={<Money money={reductionAmount} isNagetive={true} />}
                    titleColor="text-ctext-secondary"
                    textColor="text-ctext-primary"
                />

                {/*NOTE: 已還金額*/}
                <ListItem
                    title={'Amount Repaid'}
                    text={<Money money={paidAmount} isNagetive={true} />}
                    titleColor="text-ctext-secondary"
                    textColor="text-ctext-primary"
                />

                <ListItem
                    title={'Extension Due Date'}
                    text={extendDate ? formatDate(moment(extendDate)) : ''}
                    titleColor="text-ctext-secondary"
                    textColor="text-primary-main"
                />

                <Divider />

                {/*NOTE: 總金額*/}
                <ListItem
                    className="mt-3 font-bold"
                    title={'Total Extension Fee' as string}
                    text={<Money money={extensionPayAmount} />}
                    titleColor="text-ctext-primary"
                />

                <div className="bg-cstate-disable-main -mx-4 mt-6 mb-5 h-2"></div>
                <div className="text-left text-xs font-bold text-black">{'Payment Method'}</div>
                <Select
                    styles={selectStyles}
                    options={props.repayTypesList || []}
                    value={props?.repayType}
                    onChange={(item: any) => {
                        props.setRepayType(item as paymentMethodValueType);
                    }}
                />

                <div className={`mt-6 flex flex-row text-white`}>
                    <div className={`mr-1.5 grow`}>
                        <Button type={'ghost'} ghostTheme={'tertiary'} onClick={() => navigate(-2)} text={'Cancel'} />
                    </div>
                    <div className={`ml-1.5 grow`}>
                        <Button onClick={props.handleConfirm} primaryTypeGradient={true} text={'Confirm'} disable={props.isPostExtendCreateLoading} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PakistanExtendModal;
