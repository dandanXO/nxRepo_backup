import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { usePostMerchantCreateMutation, usePutMerchantEditMutation } from "../../../api/MerchantApi";
import { Form } from "antd";
import MerchantModal from './MerchantModal';
import MerchantTable from './MerchantTable';

export const MerchantPage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const [postMerchantCreate, { isLoading: isMerchantCreating, isSuccess: postMerchantSuccess }] = usePostMerchantCreateMutation();
    const [putMerchantEdit, { isLoading: isMerchantEditing, isSuccess: putMerchantSuccess }] = usePutMerchantEditMutation();
    const [merchantModalVisible, setMerchantModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const onFinish = (values: any) => {
        isEdit ? putMerchantEdit(values) : postMerchantCreate({ merchantId: values.merchantId, ...values });
        form.resetFields()
    };

    const handleCloseModal = () => {
        setMerchantModalVisible(false)
        form.resetFields()
    }


    return domLoaded ? (
        <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    routes: [
                        { path: '', breadcrumbName: '首页' },
                        { path: '', breadcrumbName: '产品管理' },
                        { path: '', breadcrumbName: '商戶管理' },
                    ],
                },
            }}
        >
            <MerchantTable
                postMerchantSuccess={postMerchantSuccess}
                putMerchantSuccess={putMerchantSuccess}
                setIsEdit={setIsEdit}
                setMerchantModalVisible={setMerchantModalVisible}
                form={form}
            />
            <MerchantModal
                isEdit={isEdit}
                isMerchantEditing={isMerchantEditing}
                isMerchantCreating={isMerchantCreating}
                merchantModalVisible={merchantModalVisible}
                handleCloseModal={handleCloseModal}
                onFinish={onFinish}
                form={form}
            />
        </PageContainer>
    ) : null;
}

