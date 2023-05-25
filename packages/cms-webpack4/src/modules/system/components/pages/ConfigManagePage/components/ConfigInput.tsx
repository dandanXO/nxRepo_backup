import React, {  useState } from "react";
import { Button, Form,  Space,Input, } from 'antd';
import { ConfigList } from "../../../../api/types/configManageTypes/getConfigList";
import { CheckOutlined,CloseOutlined  } from '@ant-design/icons';
const { TextArea } = Input;
type ConfigInputProps=ConfigList&{
    saveValue:any;
    inputKey:string;
}

function ConfigInput(props:ConfigInputProps): JSX.Element {
    const { value,inputType,channelId,saveValue,inputKey } = props;

    const [form] = Form.useForm();
    const [isEdit,setIsEdit] = useState(false);

    const handleOnChange = ()=>{
        setIsEdit(true);
    };

    const handleReset = ()=>{
        form.setFieldsValue({ [inputKey]: value });
        setIsEdit(false);

    };
    const onFinish = (value)=>{
        saveValue(inputKey, channelId, Object.values(value));

    };
    return (
        <Form style={{ display: 'flex' }} form={form} onFinish={onFinish} initialValues={{ [inputKey]: value }}>
            <Space>
                {isEdit && <Space>
                    <Button htmlType="submit" icon={<CheckOutlined />} type="primary" size="small" />
                    <Button onClick={handleReset} icon={<CloseOutlined />} type="ghost" size="small" />
                </Space>}
                <Form.Item style={{ marginBottom: '0' ,width: '200px' }} rules={[{ required: true, message: '不能為空' }]} label="" name={inputKey} >
                    {inputType === 'textarea' ?
                        <TextArea  onChange={handleOnChange}/> :
                        <Input onChange={handleOnChange}/>}
                </Form.Item>
            </Space>
        </Form>
    );
}

export default ConfigInput;
