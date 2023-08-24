import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import React from 'react';

import { usePostTelSaleGroupMutation } from '../../../../api/TelTeamManageApi';

const { Item } = Form;

interface IAddGroupFormProps {
    teamId: number;
    onAdd: () => void;
}

const AddGroupForm = ({ teamId, onAdd }: IAddGroupFormProps): JSX.Element => {
    const [trigger, { isLoading }] = usePostTelSaleGroupMutation();

    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            layout="inline"
            style={{ marginBottom: '20px', alignItems: 'center' }}
            onFinish={(values) => {
                if (values.groupName) {
                    trigger({ name: values.groupName, telTeamId: teamId })
                        .unwrap()
                        .then(() => {
                            form.resetFields();
                            onAdd();
                        });
                }
            }}
        >
            <Item label="添加电销组别" name="groupName">
                <Input disabled={isLoading} placeholder="请输入电销组别名称" />
            </Item>
            {!isLoading && (
                <Button size="small" htmlType="submit" type="primary" shape="circle" icon={<PlusOutlined />} />
            )}
            {isLoading && <Spin />}
        </Form>
    );
};

export default AddGroupForm;
