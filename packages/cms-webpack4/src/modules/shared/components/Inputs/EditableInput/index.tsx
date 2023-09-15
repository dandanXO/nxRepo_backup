import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Spin } from 'antd';
import React, { useState } from 'react';

interface IEditableInputProps {
    originValue: string;
    onDelete: () => void;
    onUpdate: (name: string) => void;
    loading?: boolean;
}

const EditableInput = ({ originValue, onDelete, onUpdate, loading }: IEditableInputProps): JSX.Element => {
    const [text, setText] = useState(originValue);

    return (
        <Space>
            <Input
                disabled={loading}
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
                bordered={false}
                style={{
                    borderBottom: '1px solid #1d8bf5',
                }}
            />
            {!loading && text === originValue && (
                <Button type="primary" size="small" icon={<DeleteOutlined onClick={onDelete} />} danger />
            )}
            {!loading && text !== originValue && (
                <>
                    <Button
                        type="primary"
                        size="small"
                        icon={
                            <CheckOutlined
                                onClick={() => {
                                    onUpdate(text);
                                }}
                            />
                        }
                    />
                    <Button size="small" icon={<CloseOutlined />} onClick={() => setText(originValue)} />
                </>
            )}
            {loading && <Spin size="small" />}
        </Space>
    );
};

export default EditableInput;
