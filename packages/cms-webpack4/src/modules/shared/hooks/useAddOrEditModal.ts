import React, { useEffect, useState } from "react";
import { Form, FormInstance } from "antd";
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks";

const useAddOrEditFormModal = (postAddData: UseMutation<any>,putEditData: UseMutation<any>): {
    form: FormInstance,
    showModal: boolean,
    setShowModal: React.Dispatch<boolean>,
    isEdit: boolean,
    setIsEdit: React.Dispatch<boolean>,
    handleAddOrEdit: (values: FormDataEntryValue) => void,
    isSuccess: boolean
} => {

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [postModalForm, { isSuccess }] = isEdit ?   putEditData() : postAddData();
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
