import React from "react";
import {Form, FormInstance} from "antd";
import { Rule } from 'rc-field-form/lib/interface'

const { Item } = Form

interface IHelperFormItemProps {
    children: React.ReactNode;
    label: string
    name: string
    help: string
    required?: boolean
    layout?: any
    style?: React.CSSProperties;
    rules?: Rule[]
}

export const HelperFormItem = ({
    layout, label, style, required, children, name, rules, help
}: IHelperFormItemProps) => {

    return (
        <Item
            {...layout}
            label={label}
            required={required}
            style={style}
            help={false}
        >
            <Item
                name={name}
                label={label}
                rules={rules}
                help=''
                noStyle
            >
                {children}
            </Item>
            <Item
                dependencies={[name]}
                noStyle
            >
                {
                    ({ getFieldError }) => {
                        const filedErrors = getFieldError(name)
                        if(filedErrors.length > 0) {
                            return <div style={{ color: 'red', marginBottom: '3px'}}>{filedErrors.map((part) => <div key={part}>{part}</div>)}</div>
                        } else {
                            return <div style={{ color: 'gray', marginBottom: '3px' }}>{help}</div>
                        }
                    }
                }
            </Item>

        </Item>
    )
}
