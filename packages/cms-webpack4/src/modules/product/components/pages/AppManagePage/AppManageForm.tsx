import React from "react";
import Form from "antd/es/form";
import {Select, Typography, Input, Collapse, Space} from "antd/es";
const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;
import {AdminForm, AdminFormProps} from "../../../../shared/components/AdminForm";
import {Switch} from "antd";

type AppManageFormProps = {
    isEdit: boolean;
    id?: number;
} & AdminFormProps & {

};

export const AppManageForm = (props: AppManageFormProps) => {
    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
        >
            <Form.Item label="APP名稱" name={"name"} rules={[{ required: true }]}
                extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"APP名稱"}/>
            </Form.Item>

            <Form.Item label="PackageID" name={"packageId"} rules={[{ required: true }]}
               extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"PackageID"} disabled={props.isEdit}/>
            </Form.Item>

            <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="基本配置" key="1">
                    <Form.Item>

                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="top" label="是否需要先登入" valuePropName="checked">
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>
                    </Form.Item>



                    <Form.Item name="top" label="是否强制跳转到KYC流程" valuePropName="checked">
                        <Switch checkedChildren="是" unCheckedChildren="否"/>
                    </Form.Item>

                    <Form.Item name="top" label="是否显示受权页面" valuePropName="checked">
                        <Switch checkedChildren="是" unCheckedChildren="否"/>
                    </Form.Item>

                    <Form.Item name="top" label="是否显示条款页面" valuePropName="checked">
                        <Switch checkedChildren="是" unCheckedChildren="否"/>
                    </Form.Item>

                    <Input.Group compact>

                        <Form.Item name="top" valuePropName="checked">
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>
                        <Form.Item name="top" label="显示合作伙伴开关" valuePropName="checked">
                        </Form.Item>
                        <Form.Item name={"packageId"}>
                            <Input placeholder={"合作伙伴H5 URL"} disabled={props.isEdit}/>
                        </Form.Item>
                    </Input.Group>

                </Panel>
                <Panel header="检测服务配置" key="2">
                    <Form.Item label="税卡" name={"name"}>
                        <Select>
                            <Select.Option value="mins">分钟</Select.Option>
                            <Select.Option value="hours">小时</Select.Option>
                            {/*{props?.merchantList?.map((i) => <Option key={i.merchantId} value={i.merchantId}>{i.name}</Option>)}*/}
                        </Select>
                    </Form.Item>

                    <Form.Item label="实名卡" name={"name"}>
                        <Select>
                            <Select.Option value="mins">分钟</Select.Option>
                            <Select.Option value="hours">小时</Select.Option>
                            {/*{props?.merchantList?.map((i) => <Option key={i.merchantId} value={i.merchantId}>{i.name}</Option>)}*/}
                        </Select>
                    </Form.Item>

                    <Form.Item label="人脸检测服务" name={"name"}>
                        <Select>
                            <Select.Option value="mins">分钟</Select.Option>
                            <Select.Option value="hours">小时</Select.Option>
                            {/*{props?.merchantList?.map((i) => <Option key={i.merchantId} value={i.merchantId}>{i.name}</Option>)}*/}
                        </Select>
                    </Form.Item>

                </Panel>
            </Collapse>

        </AdminForm>
    )
}
