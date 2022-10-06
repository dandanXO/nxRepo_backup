import {Form, Input, Radio, Select, Switch} from "antd";
import React, {useCallback, useMemo} from "react";
import {useForm} from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

interface RiskSettingFormProps {

}
const RiskSettingForm = (props: RiskSettingFormProps) => {
    const [form] = useForm()

    const initialValues = useMemo(() => {
        return {
            name: "",
            application: "",
            money: 1,
            status: true,
            comment: "",
        }
    }, [])

    const onFinish = useCallback(() => {

    }, [])

    const onFinishFailed = useCallback(() => {

    }, [])

    const onFieldsChange = useCallback((changedFields, allFields) => {
    }, [])

    const onValuesChange = useCallback((changedFields, allFields) => {
    }, [])

    return (
        <Form
            name="control-hooks"
            form={form}
            initialValues={initialValues}
            labelAlign={"right"}
            labelWrap={false}
            layout={"horizontal"}
            // 当字段被删除时保留字段值
            preserve={true}
            // 提交失败自动滚动到第一个错误字段
            scrollToFirstError={true}
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
        >
            <Form.Item label="风控名称" name="name" required>
                <Input placeholder="风控名称"/>
            </Form.Item>

            <Form.Item label={"風控应用"} name="application" required>
                <Select>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label={"新客分数"} required>
                {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
                    return (
                        <Form.Item key={index}>
                            <Input.Group compact>
                                <Form.Item style={{ margin: '0 8px 0 0' }}>
                                    <Input placeholder={levelTag} disabled/>
                                </Form.Item>
                                <Form.Item name={["newCustomerScore", "value"]} style={{ margin: '0 8px 0 0' }}>
                                    <Input placeholder={"值"}/>
                                </Form.Item>
                                <Form.Item name={["newCustomerScore", "quota"]} style={{ margin: '0 8px 0 0' }}>
                                    <Input placeholder={"可借额度"}/>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    )
                })}
            </Form.Item>

            <Form.Item label={"复借分数"} required>
                {["极好", "良好", "正常", "普通", "拒绝"].map((levelTag, index) => {
                    return (
                        <Form.Item key={index}>
                            <Input.Group compact>
                                <Form.Item style={{ margin: '0 8px 0 0' }}>
                                    <Input placeholder={levelTag} disabled/>
                                </Form.Item>
                                <Form.Item name={["borrowScore", "value"]} style={{ margin: '0 8px 0 0' }}>
                                    <Input placeholder={"值"}/>
                                </Form.Item>
                                <Form.Item name={["borrowScore", "quota"]} style={{ margin: '0 8px 0 0' }}>
                                    <Input placeholder={"可借额度"}/>
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    )
                })}
            </Form.Item>

            <Form.Item label={"借款金额"} name="money">
                <Radio.Group>
                    <Radio value={1}>风控返回</Radio>
                    <Radio value={2}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label={"状态"} name={"status"} valuePropName={"checked"}>
                <Switch checkedChildren={"启用"} unCheckedChildren={"关闭"}></Switch>
            </Form.Item>

            <Form.Item label={"备注"} name="comment">
                <TextArea placeholder={"备注"}/>
            </Form.Item>
        </Form>
    )
}

export default RiskSettingForm;
