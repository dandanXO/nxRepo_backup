import { Modal } from 'antd';
import { Key } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';

import { OrderListResponse } from '../../api/types/getOrderList';

interface IModifyExpiredDateModalProps {
    open: boolean;
    orderList: OrderListResponse[];
    selectedRows: Key[];
    handleCloseModal: () => void;
    onOk: () => void;
}

const ModifyExpiredDateModal = ({
    open,
    orderList,
    selectedRows,
    handleCloseModal,
    onOk,
}: IModifyExpiredDateModalProps): JSX.Element => {
    const lastModifyDatetime = orderList.reduce((acc, current) => {
        if (!selectedRows.includes(current.id)) return acc;
        if (!current.expireDate) return acc;

        const expiredDate = moment(current.expireDate, 'YYYY-MM-DD HH:mm:ss');
        console.log(expiredDate);
        return acc;
    }, null);

    return (
        <Modal title="变更到期日" open={open} onOk={onOk} onCancel={handleCloseModal} maskClosable={false}>
            <div>ModifyExpiredDateModal</div>
            <div>
                {orderList.map((key) => (
                    <div>{key.expireDate}</div>
                ))}
            </div>
        </Modal>
    );
};

export default ModifyExpiredDateModal;
