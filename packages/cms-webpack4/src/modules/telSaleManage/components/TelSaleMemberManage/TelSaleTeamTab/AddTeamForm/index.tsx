import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

const { Item } = Form;

interface IAddTeamFormProps {
    onAdd: (name: string) => void;
}

const AddTeamForm = ({ onAdd }: IAddTeamFormProps): JSX.Element => {
    return (
        <Form
            layout="inline"
            style={{ marginBottom: '20px' }}
            onFinish={(values) => {
                if (values.teamName) {
                    onAdd(values.teamName);
                }
            }}
        >
            <Item label="添加电销团队" name="teamName">
                <Input placeholder="请输入电销团队名称" />
            </Item>

            <Button htmlType="submit" type="primary" shape="circle" icon={<PlusOutlined />} />
        </Form>
    );
};

export default AddTeamForm;
