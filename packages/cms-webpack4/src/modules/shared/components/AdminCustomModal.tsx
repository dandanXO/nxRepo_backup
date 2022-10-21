import {Modal} from "antd/es";
import React from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import "./AdminCustomModal.less";
export interface AdminDeleteModalProps {
    open: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    message?: string;
}

export const AdminCustomModal = (props: AdminDeleteModalProps) => {
    return (
        <Modal wrapClassName="admin-custom-modal" open={props.open} closable={false} width={416} maskClosable={false} okText={"确定"} cancelText={"取消"} onOk={props.onOk} onCancel={props.onCancel}>
            <InfoCircleOutlined style={{ color: "#FAAD14", marginRight: 16 }}/>{props.message}
        </Modal>
    )
}
