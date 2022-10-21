import {Modal} from "antd/es";
import React from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import "./AdminDeleteModal.less";
export interface AdminDeleteModalProps {
    open: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    message?: string;
}

export const AdminDeleteModal = (props: AdminDeleteModalProps) => {
    return (
        <Modal wrapClassName="admin-delete-modal" open={props.open} closable={false} width={416} maskClosable={false} okText={"确定"} cancelText={"取消"} onOk={props.onOk} onCancel={props.onCancel}>
            <InfoCircleOutlined style={{ color: "#FAAD14", marginRight: 16 }}/>确认要删除此笔数据吗?
        </Modal>
    )
}
