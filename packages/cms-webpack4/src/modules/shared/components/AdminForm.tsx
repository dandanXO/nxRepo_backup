import React from "react";

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
