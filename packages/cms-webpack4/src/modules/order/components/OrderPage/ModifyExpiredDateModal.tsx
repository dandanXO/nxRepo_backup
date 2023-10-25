import { DatePicker, Form, Modal } from 'antd';
import { Key } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';

import { usePutOrderExpiryMutation } from '../../api/OrderApi';
import { OrderListResponse } from '../../api/types/getOrderList';

const { Item } = Form;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

interface IModifyExpiredDateModalProps {
    open: boolean;
    orderList: OrderListResponse[];
    selectedRows: Key[];
    handleCloseModal: () => void;
    onModified: () => void;
}

const ModifyExpiredDateModal = ({
    open,
    onModified,
    orderList,
    selectedRows,
    handleCloseModal,
}: IModifyExpiredDateModalProps): JSX.Element => {
    const [triggerPutOrderExpiry, { isLoading }] = usePutOrderExpiryMutation();
    const [form] = Form.useForm();

    const lastModifyDatetime = orderList.reduce((acc, current) => {
        if (!selectedRows.includes(current.id)) return acc;
        if (!current.expireDate) return acc;

        const expiredDate = moment(current.expireDate, 'YYYY-MM-DD HH:mm:ss');
        if (!acc) {
            return expiredDate;
        } else {
            if (expiredDate > acc) return expiredDate;
        }
        return acc;
    }, null);

    const lastModifyDate = moment((lastModifyDatetime as moment.Moment).format('YYYY-MM-DD'), 'YYYY-MM-DD');

    const onOk = () => {
        form.submit();
    };

    const onFinish = (values) => {
        triggerPutOrderExpiry({
            expiryTime: `${values.expiryTime.format('YYYY-MM-DD')} 00:00:00`,
            orderIds: selectedRows,
        })
            .unwrap()
            .then(() => {
                onModified();
            });
    };

    return (
        <Modal
            title="变更到期日"
            open={open}
            onOk={onOk}
            onCancel={handleCloseModal}
            maskClosable={false}
            confirmLoading={isLoading}
            cancelButtonProps={{ disabled: isLoading }}
            closable={!isLoading}
        >
            <div>
                <Form {...layout} form={form} onFinish={onFinish}>
                    <Item label="最近到期日">{lastModifyDate.format('YYYY/MM/DD')}</Item>
                    <Item label="变更到期日" name="expiryTime" rules={[{ required: true }]}>
                        <DatePicker disabledDate={(date) => date < lastModifyDate} />
                    </Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ModifyExpiredDateModal;
