import React from "react";
import Form from "antd/es/form";
import {Select, Typography, Input, Collapse, Space} from "antd/es";
const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select;
import {AdminForm, AdminFormProps} from "../../../../shared/components/common/AdminForm";
import {Switch} from "antd";
import {AppConfiguration} from "../../../services/appManage/domain/AppConfiguration";
import "./style.less";

type AppManageFormProps = {
    isEdit: boolean;
    id?: number;
} & AdminFormProps & {
    idCardOcrList: string[];
    liveDetectList: string[];
    taxCardOcrList: string[];
};

export const AppManageForm = (props: AppManageFormProps) => {
    const hasPartnershipUrl = Form.useWatch('showPartnership', props.form) ? false : true;
    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
        >
            <Form.Item label="APP名稱" name={"appName"} rules={[{ required: true }]}
                extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"APP名稱"} disabled={props.isEdit}/>
            </Form.Item>

            <Form.Item label="PackageID" name={"packageId"} rules={[{ required: true }]}
               extra={"设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。"}
            >
                <Input placeholder={"PackageID"} disabled={props.isEdit}/>
            </Form.Item>

            <Collapse defaultActiveKey={['1', '2']} ghost className={"base-setting"}>
                <Panel header="基本配置" key="1">
                    <div>

                        <Form.Item name="showNbfc" label="NBFC开关" valuePropName="checked" colon={false}>
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>

                        <Form.Item name="loginFirst" label="是否需要先登入" valuePropName="checked" colon={false}>
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>

                        <Form.Item name="kycFirst" label="是否强制跳转到KYC流程" valuePropName="checked" colon={false}>
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>

                        <Form.Item name="showPermission" label="是否显示受权页面" valuePropName="checked" colon={false}>
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>

                        <Form.Item name="showTermAndCondition" label="是否显示条款页面" valuePropName="checked" colon={false}>
                            <Switch checkedChildren="是" unCheckedChildren="否"/>
                        </Form.Item>

                        <Input.Group>
                            <Form.Item name="showPartnership" label="显示合作伙伴开关" valuePropName="checked" style={{marginRight: 20}} colon={false}>
                                <Switch checkedChildren="是" unCheckedChildren="否"/>
                            </Form.Item>

                            <Form.Item name={"partnershipUrl"} style={{ width: 400}}>
                                <Input placeholder={"合作伙伴H5 URL"} disabled={hasPartnershipUrl}/>
                            </Form.Item>
                        </Input.Group>

                    </div>

                </Panel>

                <Panel header="检测服务配置" key="2">
                    <Form.Item label="税卡" name={"taxCardOcr"}>
                        <Select>
                            {props.taxCardOcrList.map((item, i) => <Option key={i} value={item}>{item}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="实名卡" name={"idCardOcr"}>
                        <Select>
                            {props.idCardOcrList.map((item, i) => <Option key={i} value={item}>{item}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="人脸检测服务" name={"liveDetect"}>
                        <Select>
                            {props.liveDetectList.map((item, i) => <Option key={i} value={item}>{item}</Option>)}
                        </Select>
                    </Form.Item>

                </Panel>
            </Collapse>

        </AdminForm>
    )
}
