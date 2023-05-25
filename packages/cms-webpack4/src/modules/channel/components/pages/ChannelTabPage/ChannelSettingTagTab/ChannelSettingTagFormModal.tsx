import { AdminFormCustomModal } from "../../../../../shared/components/common/AdminFormCustomModal";
import { ChannelSettingTagForm } from "./ChannelSettingTagForm";
import React from "react";

import { FormInstance } from "antd";

export interface ChannelSettingTagFormModalProps {
    // modal
    showModalContent: {
        isEdit: boolean;
        show: boolean;
    };
    setShowModalContent: (any) => void;
    onModalOk: () => void;
    onCloseModal:  () => void;
    // form
    form: FormInstance;
    formInitialValues: any;
    onFormFieldsChange: any;
    onFormFinish: any;
    customAntFormFieldError: any;
}

export const ChannelSettingTagFormModal = (props: ChannelSettingTagFormModalProps) => {
    {/*NOTICE: Create, Edit Modal*/
    }
    return (
        <AdminFormCustomModal
            title={"渠道配置标签"}
            width={"600px"}
            showModalContent={props.showModalContent}
            // 關閉
            setShowModalContent={props.setShowModalContent}
            onOk={props.onModalOk}
            onCloseModal={props.onCloseModal}
            // onAutoCompleteTemplate={onModalFormAutoCompleteTemplate}
        >
            <ChannelSettingTagForm
                isEdit={props.showModalContent.isEdit}
                form={props.form}
                initialValues={props.formInitialValues}
                onFieldsChange={props.onFormFieldsChange}
                onFinish={props.onFormFinish}
                customAntFormFieldError={props.customAntFormFieldError}
            />
        </AdminFormCustomModal>
    );
};
