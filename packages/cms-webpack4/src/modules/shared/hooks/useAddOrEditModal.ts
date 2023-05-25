
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "antd";

// interface UseAddOrEditModalProps {
//     postAddOrEdit?: any;
//     pustEdit?: any;
//     // showModal?: boolean;
//     // setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
//     // handleCloseModal?: () => void;
//     // onFinish?: any;
//     // form?: any;
   
// }

const useAddOrEditFormModal = (postAddData,putEditData) => {

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [postModalForm, { isLoading, isSuccess }] = isEdit ?   putEditData() : postAddData();
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [showModal]);

    const handleAddOrEdit = (values) => {
        postModalForm(values);
        setShowModal(false);
    };

    return {
        form,
        showModal,
        setShowModal,
        isEdit,
        setIsEdit,
        handleAddOrEdit,
        isSuccess,
    };
};

export default useAddOrEditFormModal;