import React from "react";
import {FormInstance} from "antd";
import AdminFormModal from "../../../../../shared/components/atoms/AdminFormModal";
import {ModalContent} from "../../../../../shared/components/atoms/AdminTable";

interface ChannelSettingTagModalProps {
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
}
export const ChannelSettingTagModal = (props: ChannelSettingTagModalProps) => {

    return (
        <AdminFormModal
            width={"600px"}
            title={"渠道配置标签"}
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
