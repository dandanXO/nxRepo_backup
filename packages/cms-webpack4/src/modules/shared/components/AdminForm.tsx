import {Form} from "antd/es";
import {Store} from "antd/es/form/interface"
import {FormInstance} from "antd";
import React from "react";

export interface AdminFormProps {
    children?: React.ReactElement | React.ReactElement[];

    name?: string;
    form: FormInstance;
    initialValues: Store;
    onFieldsChange: (changedFields: any, allFields: any) => void;
    onFinish: () => void;
    onFinishFailed: () => void;
    onValuesChange: (changedFields, allFields) => void;
}

export const AdminForm = (props: AdminFormProps) => {
    return (
        <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            // NOTE: common
            labelAlign={"right"}
            labelWrap={false}
            layout={"horizontal"}
            // 当字段被删除时保留字段值
            preserve={true}
            // 提交失败自动滚动到第一个错误字段
            scrollToFirstError={true}
            // NOTE: other
            name={props.name || "control-hooks"}
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}
            onValuesChange={props.onValuesChange}
        >
            {props.children}
        </Form>
    )
}
