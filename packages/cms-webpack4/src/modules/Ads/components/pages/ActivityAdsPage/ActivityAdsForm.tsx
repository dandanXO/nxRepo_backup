import {Form, FormInstance, Input, Radio, Switch, Typography} from "antd";
import React from "react";
import {AdminForm} from "../../../../shared/components/AdminForm";
// import {Store} from "antd/es/form/interface"
import {DemoActivityAdListPage} from "../../../import/ActivityAdListPage";
import styled from "styled-components";
import {IAdsTemplate} from "../../../types/IAdsTemplate";
import {IActivityAdsPageFormStore} from "../../../types/IAdsFormStore";
import {
    AdTemplate1,
    AdTemplate1BrandCard,
    AdTemplate1Card
} from "../../../import/ActivityAdListPage/components/AdTemplate1";
import {
    AdTemplate2,
    AdTemplate2BrandCard,
    AdTemplate2Card
} from "../../../import/ActivityAdListPage/components/AdTemplate2";
import {ActivityBanner} from "../../../service/types";
import {getFormItemForTemplateType} from "./getFormItemForTemplateType";
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

const getTemplate1AdTemplate1Data = (ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]): AdTemplate1 | null => {
    if(!ads) return;
    return {
        brandCard: instanceOfBrandCard(ads[0].payload) && {
            title: ads[0].payload.title,
            priceUnit: instanceOfBrandCard(ads[0].payload) && ads[0].payload.priceUnit,
            price: instanceOfBrandCard(ads[0].payload) && ads[0].payload.price,
            description: instanceOfBrandCard(ads[0].payload) && ads[0].payload.description,
        },
        cards: ads.slice(1, ads.length).map((item: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>) => {
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

function instanceOfBrandCard2(obj: any): obj is AdTemplate2BrandCard {
    return 'priceUnit' in obj;
}

function instanceOfCard2(obj: any): obj is AdTemplate2Card {
    return 'title' in obj;
}


const getTemplate2AdTemplate1Data = (ads?: ActivityBanner<AdTemplate2BrandCard, AdTemplate2Card>[]): AdTemplate2 | null => {
    if(!ads) return;
    return {
        brandCard: {
            title1: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.title1,
            title2: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.title2,
            priceUnit: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.priceUnit,
            price: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.price,
            actionName: instanceOfBrandCard2(ads[0].payload) && ads[0].payload.actionName,
            action: ads[0].action,
            actionUrl: ads[0].actionUrl,
        },
        topCard: {
            title: instanceOfCard2(ads[1].payload) && ads[1].payload.title,
            actionName: instanceOfCard2(ads[1].payload) && ads[1].payload.actionName,
            action: ads[1].action,
            actionUrl: ads[1].actionUrl,
        },
        bottomCard: {
            title: instanceOfCard2(ads[2].payload) && ads[2].payload.title,
            actionName: instanceOfCard2(ads[2].payload) && ads[2].payload.actionName,
            action: ads[2].action,
            actionUrl: ads[2].actionUrl,
        },
    }
}

export const ActivityAdsForm = (props: IActivityAdsForm) => {

    const templateType = Form.useWatch('templateType', props.form);
    console.log("templateType", templateType);

    const ads = Form.useWatch('contents', props.form);
    console.log("ads", ads);
    let adTemplate1Data;
    if(templateType === 1) {
        adTemplate1Data = getTemplate1AdTemplate1Data(ads);
    } else if(templateType === 2) {
        adTemplate1Data = getTemplate2AdTemplate1Data(ads);
    }

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

                {getFormItemForTemplateType(templateType, ads)}

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

