import React from "react";

import AdminFormModal from "../../shared/components/AdminFormModal";
import {FormInstance} from "antd";
import {ModalContent} from "./RiskSettingPage";

interface RiskSettingModelProps {
    showModalContent: ModalContent;
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
    form: FormInstance;
    onOk: () => void;
    onAutoCompleteTemplate: () => void;
    children: React.ReactElement;
}
const RiskSettingModal = (props: RiskSettingModelProps) => {

    return (
        <AdminFormModal
            width={"600px"}
            show={props.showModalContent.show}
            isEdit={props.showModalContent.isEdit}
            hasAddForm={true}
            hasEditForm={true}
            addTitle={"添加风控配置"}
            editTitle={"修改风控配置"}
            handleCloseModal={() => {
                // console.log("handleCloseModal")
                props.form.resetFields();
                props.setShowModalContent({
                    show: false,
                    isEdit: false,
                })
            }}
            onOk={props.onOk}
            autoComplete={true}
            onAutoCompleteTemplate={props.onAutoCompleteTemplate}
        >
            {props.children}

        </AdminFormModal>
    )
}
export default RiskSettingModal;
