import {Modal} from "antd/es";
import React from "react";

export interface AdminDeleteModalProps {
    open: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    message?: string;
}

export const AdminDeleteModal = (props: AdminDeleteModalProps) => {
    return (
        <Modal open={props.open} closable={false} width={416} maskClosable={false} okText={"确定"} cancelText={"取消"} onOk={props.onOk} onCancel={props.onCancel}>
            是否要删除?
        </Modal>
    )
}
