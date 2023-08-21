import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import React from 'react';

import { usePostTelSaleTeamMutation } from '../../../../api/TelTeamManageApi';

const { Item } = Form;

interface IAddTeamFormProps {
    onAdd: () => void;
}

const AddTeamForm = ({ onAdd }: IAddTeamFormProps): JSX.Element => {
    const [trigger, { isLoading }] = usePostTelSaleTeamMutation();

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="inline"
            style={{ marginBottom: '20px', alignItems: 'center' }}
            onFinish={async (values) => {
                if (values.teamName) {
                    trigger({ name: values.teamName })
                        .unwrap()
                        .then(() => {
                            form.resetFields();
                            onAdd();
                        });
                }
            }}
        >
            <Item label="添加电销团队" name="teamName">
                <Input disabled={isLoading} placeholder="请输入电销团队名称" />
            </Item>

            {!isLoading && (
                <Button size="small" htmlType="submit" type="primary" shape="circle" icon={<PlusOutlined />} />
            )}
            {isLoading && <Spin />}
        </Form>
    );
};

export default AddTeamForm;
