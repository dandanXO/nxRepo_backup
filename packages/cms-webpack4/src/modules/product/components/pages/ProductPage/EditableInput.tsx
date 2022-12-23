
import { Form, Input, Modal } from "antd";
import { useEffect, useRef, useState } from "react";

interface EditableInputProps {
    productId?: number;
    name?: string;
    initValue?: string | number;
    rules?: object;
    placeholder?: string;
    handleSave?: (productId: number, fieldValue: object) => void;

}


export const EditableInput = ({ productId, name, rules, placeholder, initValue, handleSave, }: EditableInputProps) => {


    const inputRef = useRef(null)
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState<string | number>(initValue)
    const handleEdit = (e) => {

        const fieldValue = Object.values(form.getFieldsValue())[0] as string | number;
        if (Number(inputValue) === Number(fieldValue)) return;
        if (fieldValue === '') {
            form.setFieldsValue({ [name]: initValue });
            return;
        } else {
            handleSave(productId, { [name]: Number(fieldValue) });
            setInputValue(fieldValue);
        }
    }
    useEffect(() => {
        form.setFieldsValue({ [name]: initValue });
    }, [initValue])



    return <Form form={form} initialValues={{ [name]: initValue }} key={name + productId}>
        <Form.Item name={name} rules={[{ required: true, ...rules }]} style={{ marginBottom: 0, width: '100%' }} >
            <Input
                style={{ border: 'none' }}
                placeholder={placeholder}
                onBlur={handleEdit}
                ref={inputRef}
                onPressEnter={() => inputRef.current.blur()}
            />
        </Form.Item>

    </Form>


}
