import React from "react";
import {FormInstance} from "antd";
import AdminFormModal from "./AdminFormModal";
import {ModalContent} from "./AdminTable";

interface AdminFormCustomModalProps {
    // NOTE: Modal
    showModalContent: ModalContent;
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
    onOk: () => void;
    onAutoCompleteTemplate?: () => void;
    children?: React.ReactElement;
    // NOTE: Form
    form: FormInstance;
    onCloseModal: () => void;
    autoComplete?: boolean;
    // NOTE: Custom
    width?: string;
    title: string;
}

export const AdminFormCustomModal = (props: AdminFormCustomModalProps) => {

    return (
        <AdminFormModal
            // width={"600px"}
            // title={"渠道配置标签"}
            width={props.width}
            title={props.title}
            show={props.showModalContent.show}
            isEdit={props.showModalContent.isEdit}
            handleCloseModal={() => {
                // console.log("handleCloseModal")
                // NOTE: Form
                props.form.resetFields();
                props.setShowModalContent({
                    show: false,
                    isEdit: false,
                })
                props.onCloseModal();
            }}
            onOk={props.onOk}
            autoComplete={props.autoComplete || false}
            onAutoCompleteTemplate={props.onAutoCompleteTemplate}
        >
            {props.children}
        </AdminFormModal>
    )
}
