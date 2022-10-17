import React from "react";
import {Form} from "antd";
import {useForm} from "antd/es/form/Form";
import {Button, message} from "antd/es";

interface AdminForm {
    // onFinish?: (value: any) => void;
    // children: React.ReactElement;
    // onFieldsChange: (changedFields: FieldData[], allFields: FieldData[]) => void

}

const withAdminFormTemplate = (ChildrenComponent: (props) => {}): any => {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    class HOC extends React.PureComponent<any, any> {
        render() {
            // @ts-ignore
            return <ChildrenComponent {...layout}/>
        }
    }
    return HOC;
}

export default withAdminFormTemplate;
