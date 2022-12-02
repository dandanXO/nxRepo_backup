import {Button, Col, Divider, Form, FormInstance, Input, Radio, Row, Select, Switch, Typography} from "antd";
import React from "react";
import {AdminForm} from "../../../../shared/components/AdminForm";
// import {Store} from "antd/es/form/interface"
import {DemoActivityAdListPage} from "../../../import/ActivityAdListPage";
import styled from "styled-components";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {IAdsTemplate} from "../../../types/IAdsTemplate";
import {IActivityAdsPageFormStore} from "../../../types/IAdsFormStore";
import {getDefaultActivityBannerContent} from "../../../data/AdsTemplateData";
import {
    AdTemplate1,
    AdTemplate1BrandCard,
    AdTemplate1Card
} from "../../../import/ActivityAdListPage/components/AdTemplate1";
import {AdTemplate2Card} from "../../../import/ActivityAdListPage/components/AdTemplate2";
import {ActivityBanner, AdsTemplate1Payload1, AdsTemplate1Payload2} from "../../../service/types";
// import {IAdsFormStore} from "../../../types/IAdsFormStore";

const { Title, Text } = Typography;

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

interface IActivityAdsForm {
    isEdit: boolean;
    id?: number;
    onFieldsChange: (changedFields: any, allFields: any) => void;
    onFinish: () => void;
    form: FormInstance;
    // initialValues: IAdsFormStore;
    initialValues: IActivityAdsPageFormStore;
    templateData: Array<IAdsTemplate>;
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

// NOTICE: Interface type check with Typescript https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
function instanceOfBrandCard(obj: any): obj is AdTemplate1BrandCard {
    return 'priceUnit' in obj;
}

function instanceOfCard(obj: any): obj is AdTemplate1Card {
    return 'description1' in obj;
}

const getTemplate1AdTemplate1Data = (ads?: ActivityBanner[]): AdTemplate1 | null => {
    if(!ads) return;
    return {
        brandCard: instanceOfBrandCard(ads[0].payload) && {
            title: ads[0].payload.title,
            priceUnit: instanceOfBrandCard(ads[0].payload) && ads[0].payload.priceUnit,
            price: instanceOfBrandCard(ads[0].payload) && ads[0].payload.price,
            description: instanceOfBrandCard(ads[0].payload) && ads[0].payload.description,
        },
        cards: ads.slice(1, ads.length).map((item: ActivityBanner) => {
            return {
                action: item.action,
                actionUrl: item.actionUrl,
                actionName: instanceOfCard(item.payload) && item.payload.actionName,
                title: item.payload.title,
                description1: instanceOfCard(item.payload) && item.payload.description1,
                description2: instanceOfCard(item.payload) && item.payload.description2,
            }
        })
    }
}
export const ActivityAdsForm = (props: IActivityAdsForm) => {

    const templateType = Form.useWatch('templateType', props.form);
    console.log("templateType", templateType);

    const ads = Form.useWatch('contents', props.form);
    console.log("ads", ads);

    const adTemplate1Data = getTemplate1AdTemplate1Data(ads);
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
                        data={adTemplate1Data}/>
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
                                <Radio key={index} value={template.id}>{template.name}</Radio>
                            );
                        })}
                    </Radio.Group>
                </Form.Item>


                <Form.Item label="广告列表" required>
                    <Form.List name="contents">
                        {(fields, { add, remove }) => {
                            // console.log("fields", fields);
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
                                                name={[0, 'payload', 'title']}
                                            >
                                                <Input placeholder="广告标题" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                required
                                                label={"价格币别"}
                                                name={[0, 'payload', 'priceUnit']}
                                            >
                                                <Input placeholder="价格币别"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                required
                                                label={"币别价格"}
                                                name={[0, 'payload', 'price']}
                                            >
                                                <Input placeholder="币别价格"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                required
                                                label={"广告说明"}
                                                name={[0, 'payload', 'description']}
                                            >
                                                <Input placeholder="广告说明"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    {fields.map(({ key, name, ...restField }, index) => {
                                        // console.log("name", name)
                                        if(index === 0) return null;
                                        return (
                                            <div key={index}>
                                                <Divider orientation="left" style={{}}>广告 - {index + 1}</Divider>
                                                <Row key={key}
                                                     gutter={[8, 8]}
                                                     style={{
                                                         // borderBottom: "1px solid #aaa",
                                                         // marginBottom: 16
                                                     }}
                                                >
                                                    <Col span={23}>
                                                        <Row
                                                            gutter={[8, 8]}
                                                        >
                                                            <Col span={24} >
                                                                <Form.Item
                                                                    label={"广告标题"}
                                                                    {...restField}
                                                                    name={[name, 'payload', 'title']}
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Input placeholder="广告标题" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    label={"广告说明1"}
                                                                    {...restField}
                                                                    name={[name, 'payload', 'description1']}
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Input placeholder="广告说明1"/>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    label={"广告说明2"}
                                                                    {...restField}
                                                                    name={[name, 'payload', 'description2']}
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Input placeholder="广告说明2"/>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Form.Item
                                                                    label={"按钮名称"}
                                                                    {...restField}
                                                                    name={[name, 'payload', 'actionName']}
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Input placeholder="按钮名称"/>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Form.Item
                                                                    label={"按钮动作"}
                                                                    {...restField}
                                                                    name={[name, 'action']}
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Select>
                                                                        <Select.Option value="APPLY_LOAN">跳轉至付款頁</Select.Option>
                                                                        <Select.Option value="POP_URL">跳轉至自定義網址</Select.Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={24}>
                                                                <Form.Item
                                                                    noStyle
                                                                    shouldUpdate={(prevValues, curValues) => {
                                                                        // console.log("prevValues")
                                                                        // console.log(prevValues)
                                                                        // console.log("curValues")
                                                                        // console.log(curValues)
                                                                        return prevValues.contents[name].action !== curValues.contents[name].action
                                                                    }}
                                                                >
                                                                    {({ getFieldValue }) => {
                                                                        let action = getFieldValue(['contents', name, 'action']);
                                                                        // console.log("action", action)
                                                                        if (action == "POP_URL") {
                                                                            return (
                                                                                <Form.Item name={[name, 'actionUrl']} label="目標網址" rules={[{ required: true }]}>
                                                                                    <Input placeholder="目標網址"/>
                                                                                </Form.Item>
                                                                            )
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                    }}
                                                                </Form.Item>
                                                            </Col>
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
                                            </div>
                                        )
                                    })}
                                    <Row/>

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add(getDefaultActivityBannerContent(ads.length + 1),
                                                        ads.length)} block icon={<PlusOutlined />}>
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

