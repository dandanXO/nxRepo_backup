import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin } from 'antd';
import React from 'react';

const { Item } = Form;

interface IAddTeamFormProps {
    onAdd: (name: string) => void;
    loading?: boolean;
}

const AddTeamForm = ({ onAdd, loading }: IAddTeamFormProps): JSX.Element => {
    return (
        <Form
            layout="inline"
            style={{ marginBottom: '20px', alignItems: 'center' }}
            onFinish={(values) => {
                if (values.teamName) {
                    onAdd(values.teamName);
                }
            }}
        >
            <Item label="添加电销团队" name="teamName">
                <Input disabled={loading} placeholder="请输入电销团队名称" />
            </Item>

            {!loading && (
                <Button size="small" htmlType="submit" type="primary" shape="circle" icon={<PlusOutlined />} />
            )}
            {loading && <Spin />}
        </Form>
    );
};

export default AddTeamForm;
