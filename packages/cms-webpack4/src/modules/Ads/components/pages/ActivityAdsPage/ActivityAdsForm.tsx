import {Form, FormInstance, Input, Radio, Select, Switch, Tooltip, Space, Button} from "antd";
import React, {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {AdminForm} from "../../../../shared/components/AdminForm";
import {Store} from "antd/es/form/interface"
import {ActivityAdListPage, DemoActivityAdListPage} from "../../../import/ActivityAdListPage";
import styled from "styled-components";
import {NumberValidator} from "../../../../shared/utils/validation/validator";
import {maxOneUnitFloatReplacer} from "../../../../shared/utils/maxOneUnitFloatReplacer";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {CustomLabel} from "../../../../product/components/pages/ProductPage/ProductForm/RateSettingSection";

const Container = styled.div`
    box-sizing: border-box;
    width: 360px;
    height: 640px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #000;
    margin: 0 auto;
`;
export interface AdsTemplate {
    id: number;
    name: string;
}

interface IActivityAdsForm {
    isEdit: boolean;
    id?: number;
    form: FormInstance;
    initialValues: Store;
    onFieldsChange: (changedFields: any, allFields: any) => void;
    onFinish: () => void;
    templateData: Array<AdsTemplate>;
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
`
const Preview = styled.div`
`
export const ActivityAdsForm = (props: IActivityAdsForm) => {

    const templateType = Form.useWatch('templateType', props.form);
    console.log("templateType", templateType);

    // NOTE:
    return (
        <FormContainer>
            <Preview>
                <Container>
                    <DemoActivityAdListPage type={String(templateType)}/>
                </Container>
            </Preview>
            <AdminForm
                form={props.form}
                initialValues={props.initialValues}
                onFieldsChange={props.onFieldsChange}
                onFinish={props.onFinish}
            >
                <Form.Item
                    label="廣告名称"
                    name="name"
                    rules={[{ required: true }]}
                    extra={
                        '设定后即无法直接修改，需请求技术支持，送出前请务必再次确认。'
                    }
                >
                    <Input placeholder="廣告名称" disabled={props.isEdit} />
                </Form.Item>

                <Form.Item
                    label={"模板選擇"}
                    name={"templateType"}
                    required
                >
                    <Radio.Group>
                        {props.templateData && props.templateData.map((template, index) => {
                            return (
                                <Radio value={template.id}>{template.name}</Radio>
                            );
                        })}
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="廣告列表" required>
                    <Form.List name="productInterestRatePairs">
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    {fields.map(({ key, name, ...restField }, index) => (
                                        <>
                                            <Space key={key} size={8} style={{ marginBottom: 0 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'num']}
                                                    rules={[
                                                        {
                                                            transform: (value) => Number(value),
                                                            validator: async (_, value) =>NumberValidator(_, value)({
                                                                min: 1,
                                                                minMessage: "请输入起始期数",
                                                            })
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="標題" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'preInterest']}
                                                >
                                                    <Input placeholder="前置利息" suffix={"%"}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'postInterest']}
                                                >
                                                    <Input placeholder="后置利息" suffix={"%"}/>
                                                </Form.Item>


                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'plusAmount']}
                                                    required
                                                    rules={[
                                                        {
                                                            transform: (value) => Number(value),
                                                            validator: async (_, value) =>NumberValidator(_, value)({
                                                                min: 0,
                                                                minMessage: "请输入提額金额",
                                                            })
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="提額金额"/>
                                                </Form.Item>


                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        </>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            添加
                                        </Button>
                                    </Form.Item>
                                </>
                            )
                        }}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    label={'状态'}
                    name={'enabled'}
                    valuePropName={'checked'}
                >
                    <Switch
                        checkedChildren={'启用'}
                        unCheckedChildren={'停用'}
                    ></Switch>
                </Form.Item>

            </AdminForm>
        </FormContainer>
    );
}

