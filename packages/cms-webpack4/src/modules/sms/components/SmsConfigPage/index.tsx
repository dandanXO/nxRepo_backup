import AdminPage from '../../../shared/components/common/AdminPage';
import useAddOrEditFormModal from '../../../shared/hooks/useAddOrEditModal';
import { usePostMerchantCreateMutation, usePutMerchantEditMutation } from '../../api/MerchantApi';
import SmsConfigModal from './SmsConfigModal';
import SmsConfigTable from './SmsConfigTable';

const SmsConfigPage = (): JSX.Element => {
    const { form, showModal, setShowModal, isEdit, setIsEdit, handleAddOrEdit, isSuccess } = useAddOrEditFormModal(
        usePostMerchantCreateMutation,
        usePutMerchantEditMutation,
    );

    const onFinish = (values: any) => {
        const formValues = isEdit ? { merchantId: values.merchantId, ...values } : values;
        handleAddOrEdit(formValues);
    };

    return (
        <AdminPage
            navigator={{
                ancestor: { path: '/', breadcrumbName: '首页' },
                parent: { path: null, breadcrumbName: '短信管理' },
                self: { path: null, breadcrumbName: '短信配置' },
            }}
        >
            <>
                <SmsConfigTable setShowModal={setShowModal} isAddOrEditSuccess={isSuccess} setIsEdit={setIsEdit} />
                <SmsConfigModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    onFinish={onFinish}
                    form={form}
                    isSuccess={isSuccess}
                    isEdit={isEdit}
                />
            </>
        </AdminPage>
    );
};

export default SmsConfigPage;
