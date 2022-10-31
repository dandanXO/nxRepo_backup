import React from "react";
import {FormInstance} from "antd";
import AdminFormModal from "./AdminFormModal";
import {ModalContent} from "./AdminTable";

interface AdminFormCustomModalProps {
    // NOTE: Modal
    showModalContent: ModalContent;
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
    onOk: () => void;
    onCloseModal: () => void;
    title: string;

    onAutoCompleteTemplate?: () => void;
    children?: React.ReactElement;
    autoComplete?: boolean;
    // NOTE: Custom
    width?: string;

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
