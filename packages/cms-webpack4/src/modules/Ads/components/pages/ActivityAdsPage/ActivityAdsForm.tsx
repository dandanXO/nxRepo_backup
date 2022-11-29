import {Form, FormInstance, Input, Radio, Select, Switch, Tooltip, Space, Button, Col, Row, Divider, Typography} from "antd";
const { Title, Text } = Typography;
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
import {MockAdTemplate1Data} from "../../../import/ActivityAdListPage/MockAdTemplate1Data";

const Container = styled.div`
    // NOTICE: 失效的 position: sticky - 1、包裹的父容器高度与 sticky 元素一致
    //https://www.cnblogs.com/coco1s/p/14180476.html

    box-sizing: border-box;
    width: 360px;
    height: 640px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #aaa;
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
    width: 1000px;
    margin: 0 auto;
`
const Preview = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    height: 640px;
`
export const ActivityAdsForm = (props: IActivityAdsForm) => {

    const templateType = Form.useWatch('templateType', props.form);
    console.log("templateType", templateType);

    const ads = Form.useWatch('ads', props.form);

    // NOTE:
    return (
        <FormContainer>
            <Preview>
                <Title level={5}>预览</Title>
                <div style={{ textAlign: "center"}}>
                    <Text>观赏首页广告</Text>
                </div>
                <Container>
                    <DemoActivityAdListPage
                        type={String(templateType)}
                        data={{
                        brandCard: {
                            title: "新人福利",
                            priceUnit: "PKR",
                            price: "5,000",
                            description: "新人大禮包",
                            action: "",
                            actionName: ""
                        },
                        // cards: props.form.getFieldValue("ads")?.map((data) => {
                        //     return {
                        //         title: data.title,
                        //         description1: data.description1,
                        //         description2: data.description2,
                        //         action: data.action,
                        //         actionName: data.actionName,
                        //     }
                        // }),
                        // cards: MockAdTemplate1Data.cards,
                        // cards: props.form.getFieldValue("ads"),
                        cards: ads,
                    }}/>
                </Container>
            </Preview>

            <AdminForm
                // style={{marginLeft: 50}}
                form={props.form}
                initialValues={props.initialValues}
                onFieldsChange={props.onFieldsChange}
                onFinish={props.onFinish}
            >
                <Form.Item
                    label="广告名称"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="广告名称" disabled={props.isEdit} />
                </Form.Item>

                <Form.Item
                    label={"模板选择"}
                    name={"templateType"}
                    required
                    extra={
                        '设定后即无法直接修改，送出前请务必再次确认。'
                    }
                >
                    <Radio.Group>
                        {props.templateData && props.templateData.map((template, index) => {
                            return (
                                <Radio value={template.id}>{template.name}</Radio>
                            );
                        })}
                    </Radio.Group>
                </Form.Item>

                {/*<Form.Item label="廣告列表" required>*/}
                {/*    <Form.List name="ads">*/}
                {/*        {(fields, { add, remove }) => {*/}
                {/*            return (*/}
                {/*                <>*/}
                {/*                    /!*<Form.Item>*!/*/}
                {/*                    /!*    <Space>*!/*/}
                {/*                    /!*        <CustomLabel>標題</CustomLabel>*!/*/}
                {/*                    /!*        <CustomLabel>描述1</CustomLabel>*!/*/}
                {/*                    /!*        <CustomLabel>描述2</CustomLabel>*!/*/}
                {/*                    /!*        <CustomLabel>按鈕名稱</CustomLabel>*!/*/}
                {/*                    /!*        <CustomLabel>按鈕動作</CustomLabel>*!/*/}
                {/*                    /!*    </Space>*!/*/}
                {/*                    /!*</Form.Item>*!/*/}
                {/*                    {fields.map(({ key, name, ...restField }, index) => (*/}
                {/*                        <>*/}
                {/*                            /!*<Space key={key}*!/*/}
                {/*                            /!*       style={{*!/*/}
                {/*                            /!*           // borderBottom: "1px solid #aaa",*!/*/}
                {/*                            /!*           // marginBottom: 16*!/*/}
                {/*                            /!*       }}*!/*/}
                {/*                            /!*>*!/*/}
                {/*                                {index === 0 && (*/}
                {/*                                    <Space>*/}
                {/*                                        <CustomLabel style={{width: 94}}>標題</CustomLabel>*/}
                {/*                                        <CustomLabel style={{width: 94}}>描述1</CustomLabel>*/}
                {/*                                        <CustomLabel style={{width: 94}}>描述2</CustomLabel>*/}
                {/*                                        <CustomLabel style={{width: 94}}>按鈕名稱</CustomLabel>*/}
                {/*                                        <CustomLabel style={{width: 94}}>按鈕動作</CustomLabel>*/}
                {/*                                    </Space>*/}
                {/*                                )}*/}
                {/*                            /!*</Space>*!/*/}
                {/*                            <Space key={key}*/}
                {/*                                   style={{*/}
                {/*                                       // borderBottom: "1px solid #aaa",*/}
                {/*                                       // marginBottom: 16*/}
                {/*                                   }}*/}
                {/*                            >*/}
                {/*                                <Form.Item*/}
                {/*                                    required*/}
                {/*                                    // label={"標題"}*/}
                {/*                                    {...restField}*/}
                {/*                                    name={[name, 'title']}*/}
                {/*                                    // rules={[*/}
                {/*                                    //     {*/}
                {/*                                    //         transform: (value) => Number(value),*/}
                {/*                                    //         validator: async (_, value) =>NumberValidator(_, value)({*/}
                {/*                                    //             min: 1,*/}
                {/*                                    //             minMessage: "请输入起始期数",*/}
                {/*                                    //         })*/}
                {/*                                    //     },*/}
                {/*                                    // ]}*/}
                {/*                                >*/}
                {/*                                    <Input placeholder="標題" />*/}
                {/*                                </Form.Item>*/}

                {/*                                <Form.Item*/}
                {/*                                    required*/}
                {/*                                    // label={"描述1"}*/}
                {/*                                    {...restField}*/}
                {/*                                    name={[name, 'description1']}*/}
                {/*                                >*/}
                {/*                                    <Input placeholder="描述1"/>*/}
                {/*                                </Form.Item>*/}

                {/*                                <Form.Item*/}
                {/*                                    required*/}
                {/*                                    // label={"描述2"}*/}
                {/*                                    {...restField}*/}
                {/*                                    name={[name, 'description2']}*/}
                {/*                                >*/}
                {/*                                    <Input placeholder="描述2"/>*/}
                {/*                                </Form.Item>*/}
                {/*                                <Form.Item*/}
                {/*                                    required*/}
                {/*                                    // label={"按鈕名稱"}*/}
                {/*                                    {...restField}*/}
                {/*                                    name={[name, 'actionName']}*/}
                {/*                                >*/}
                {/*                                    <Input placeholder="按鈕名稱"/>*/}
                {/*                                </Form.Item>*/}
                {/*                                <Form.Item*/}
                {/*                                    required*/}
                {/*                                    // label={"按鈕動作"}*/}
                {/*                                    {...restField}*/}
                {/*                                    name={[name, 'action']}*/}
                {/*                                >*/}
                {/*                                    <Input placeholder="按鈕動作"/>*/}
                {/*                                </Form.Item>*/}

                {/*                                <MinusCircleOutlined onClick={() => remove(name)} />*/}

                {/*                            </Space>*/}
                {/*                        </>*/}
                {/*                    ))}*/}

                {/*                    <Form.Item>*/}
                {/*                        <Button type="dashed" onClick={() => add({*/}
                {/*                            title: "優惠名稱" + ads.length + 1,*/}
                {/*                            description1: "- 3.5%",*/}
                {/*                            description2: "原利息35%",*/}
                {/*                            action: "",*/}
                {/*                            actionName: "點我借款 >"*/}
                {/*                        }, ads.length)} block icon={<PlusOutlined />}>*/}
                {/*                            添加*/}
                {/*                        </Button>*/}
                {/*                    </Form.Item>*/}

                {/*                </>*/}
                {/*            )*/}
                {/*        }}*/}
                {/*    </Form.List>*/}
                {/*</Form.Item>*/}

                <Form.Item label="广告列表" required>
                    <Form.List name="ads">
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    <Divider orientation="left" style={{ color: "#ec606a"}}>主打广告</Divider>
                                    <Row
                                        gutter={[8, 8]}
                                    >
                                        <Col span={24} >
                                            <Form.Item
                                                required
                                                label={"广告标题"}
                                                name={['ads-main', 'title']}
                                            >
                                                <Input placeholder="广告标题" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                required
                                                label={"價格幣別"}
                                                name={['ads-main', 'priceUnit']}
                                            >
                                                <Input placeholder="价格币别"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                required
                                                label={"幣別價格"}
                                                name={['ads-main', 'price']}
                                            >
                                                <Input placeholder="币别价格"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                required
                                                label={"廣告說明"}
                                                name={['ads-main', 'description']}
                                            >
                                                <Input placeholder="广告说明"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    {fields.map(({ key, name, ...restField }, index) => (
                                        <>
                                            <Divider orientation="left" style={{color: "#73c106"}}>广告 - {index + 1}</Divider>
                                            <Row key={key}
                                                 gutter={[8, 8]}
                                                 style={{
                                                     // borderBottom: "1px solid #aaa",
                                                     // marginBottom: 16
                                                }}
                                            >
                                                {/*{index === 0 && (*/}
                                                {/*    <Space>*/}
                                                {/*        <CustomLabel>標題</CustomLabel>*/}
                                                {/*        <CustomLabel>描述1</CustomLabel>*/}
                                                {/*        <CustomLabel>描述2</CustomLabel>*/}
                                                {/*        <CustomLabel>按鈕名稱</CustomLabel>*/}
                                                {/*        <CustomLabel>按鈕動作</CustomLabel>*/}
                                                {/*    </Space>*/}
                                                {/*)}*/}
                                                <Col span={23}>
                                                    <Row
                                                        gutter={[8, 8]}
                                                    >
                                                        <Col span={24} >
                                                            <Form.Item
                                                                required
                                                                label={"广告标题"}
                                                                {...restField}
                                                                name={[name, 'title']}
                                                                // rules={[
                                                                //     {
                                                                //         transform: (value) => Number(value),
                                                                //         validator: async (_, value) =>NumberValidator(_, value)({
                                                                //             min: 1,
                                                                //             minMessage: "请输入起始期数",
                                                                //         })
                                                                //     },
                                                                // ]}
                                                            >
                                                                <Input placeholder="广告标题" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                required
                                                                label={"广告说明1"}
                                                                {...restField}
                                                                name={[name, 'description1']}
                                                            >
                                                                <Input placeholder="广告说明1"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                required
                                                                label={"广告说明2"}
                                                                {...restField}
                                                                name={[name, 'description2']}
                                                            >
                                                                <Input placeholder="广告说明2"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                required
                                                                label={"按钮名称"}
                                                                {...restField}
                                                                name={[name, 'actionName']}
                                                            >
                                                                <Input placeholder="按钮名称"/>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                required
                                                                label={"按钮动作"}
                                                                {...restField}
                                                                name={[name, 'action']}
                                                            >
                                                                <Input placeholder="按钮动作"/>
                                                            </Form.Item>
                                                        </Col>
                                                        {/*<Col span={12}>*/}
                                                        {/*    <Form.Item*/}
                                                        {/*        required*/}
                                                        {/*        label={"目標網址"}*/}
                                                        {/*        {...restField}*/}
                                                        {/*        name={[name, 'actionURL']}*/}
                                                        {/*    >*/}
                                                        {/*        <Input placeholder="目標網址"/>*/}
                                                        {/*    </Form.Item>*/}
                                                        {/*</Col>*/}
                                                    </Row>


                                                </Col>

                                                <Col span={1}>
                                                    <Row >
                                                        <Col span={24}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </>
                                    ))}
                                    <Row/>

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add({
                                                    title: "優惠名稱" + ads.length + 1,
                                                    description1: "- 3.5%",
                                                    description2: "原利息35%",
                                                    action: "",
                                                    actionName: "點我借款 >"
                                                }, ads.length)} block icon={<PlusOutlined />}>
                                                    添加
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>

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

