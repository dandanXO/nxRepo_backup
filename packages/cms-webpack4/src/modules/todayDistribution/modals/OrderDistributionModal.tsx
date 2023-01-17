import {Button, Modal} from "antd";
import React from "react";
import {useForm} from "antd/es/form/Form";

interface OrderDistributionModalProps {
    show: boolean;
    handleCloseModal: () => void;
    onOk: () => void;
}
export const OrderDistributionModal = (props: OrderDistributionModalProps) => {
    const form = useForm();

    return (
        <Modal
            title={"自选订单分配"}
            open={props.show}
            onCancel={props.handleCloseModal}
            onOk={props.onOk}
            width={'800px'}
            maskClosable={false}
        >

        </Modal>
    )
}
