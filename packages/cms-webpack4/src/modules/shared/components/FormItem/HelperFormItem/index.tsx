import React from "react";
import {Form, FormInstance} from "antd";
import { Rule } from 'rc-field-form/lib/interface'

const { Item } = Form

interface IHelperFormItemProps {
    form: FormInstance
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
    layout, label, style, required, children, name, rules, form, help
}: IHelperFormItemProps) => {

    return (
        <Item
            {...layout}
            label={label}
            required={required}
            style={style}
        >
            <Item
                name={name}
                rules={rules}
                help=''
            >
                {children}
            </Item>
            <Item
                shouldUpdate={(prevValues, nextValues) => true}
                style={{ marginTop: '-50px', fontSize: '14px' }}
            >
                {
                    ({ getFieldError }) => {
                        const filedErrors = getFieldError(name)
                        if(filedErrors.length > 0) {
                            return filedErrors.map((part) => <div key={part} style={{ color: 'red'}}>{part}</div>)
                        } else {
                            return <div style={{ color: 'gray' }}>{help}</div>
                        }
                    }
                }
            </Item>

        </Item>
    )
}
