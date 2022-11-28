import {ActivityAdListPage} from "../../../import/ActivityAdListPage";
import React, {useCallback, useMemo, useState} from "react";
import {ActivityAdsForm} from "./ActivityAdsForm";
import {useForm} from "antd/es/form/Form";
import {ModalContent} from "../../../../shared/components/AdminTable";
import {FormResponseData} from "../../../../risk/components/pages/RiskSettingPage";

interface IUseAdminFormModal {
    // initialValues: any
    onFieldsChange: any;
}

const useAdminFormModal = (props: IUseAdminFormModal) => {
    const [form] = useForm()

    // NOTICE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTE: Edit
    const [editID, setEditID] = useState<number>();

    return {
        // initialValues,
        form,
        showModalContent,
        setShowModalContent,
        editID,
    }
}
export const ActivityAdsPage = () => {
    const {
        form,
        showModalContent,
        setShowModalContent,
        editID,
    } = useAdminFormModal({
        onFieldsChange: {},
    });

    // NOTE: 1. Initial Data
    const initialValues = useMemo(() => {
        // NOTICE: select and switch need initialValue if you want to select one
        return {
            name: "新年廣告",
            templateType: 1,
            enabled: true,
            // useRcQuota: true,
        } as DeepPartial<FormResponseData>;
    }, [])

    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields, allFields) => {
    }, [])

    // NOTICE: Form.3 onFinish
    const onFinish = useCallback(() => {}, []);

    return (
        <div>
            <ActivityAdsForm
                form={form}
                isEdit={showModalContent.isEdit}
                id={editID}
                initialValues={initialValues}
                onFieldsChange={onFieldsChange}
                onFinish={onFinish}
                templateData={[
                    {id: 1, name: "樣板1"},
                    {id: 2, name: "樣板2"},
                    {id: 3, name: "樣板3"},
                ]}
             />
        </div>
    )
}
