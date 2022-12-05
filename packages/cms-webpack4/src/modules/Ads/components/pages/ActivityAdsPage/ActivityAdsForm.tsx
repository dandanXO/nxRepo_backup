import {Form, FormInstance, Input, Radio, Switch, Typography} from "antd";
import React from "react";
import {AdminForm} from "../../../../shared/components/AdminForm";
// import {Store} from "antd/es/form/interface"
import {DemoActivityAdListPage} from "../../../import/ActivityAdListPage";
import styled from "styled-components";
import {IAdsTemplate} from "../../../types/IAdsTemplate";
import {IActivityAdsPageFormStore} from "../../../types/IAdsFormStore";
import {AdTemplate2BrandCard, AdTemplate2Card} from "../../../import/ActivityAdListPage/components/AdTemplate2";
import {getFormItemForTemplateType} from "./getFormItemForTemplateType";
import {getTemplate1AdTemplate1Data} from "./getTemplate1AdTemplate1Data";
import {getTemplate2AdTemplate1Data} from "./getTemplate2AdTemplate1Data";
import {getTemplate3AdTemplate1Data} from "./getTemplate3AdTemplate1Data";
import {IAdsScenario} from "../../../types/IAdsScenario";
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
    scenarioData: IAdsScenario[];
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

    const ads = Form.useWatch('contents', props.form);
    console.log("ads", ads);

    let adTemplate1Data;
    if(templateType === 1) {
        adTemplate1Data = getTemplate1AdTemplate1Data(ads);
    } else if(templateType === 2) {
        adTemplate1Data = getTemplate2AdTemplate1Data(ads);
    } else if(templateType === 3) {
        adTemplate1Data = getTemplate3AdTemplate1Data(ads);
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
                    label={"目标场景"}
                    name={"scenario"}
                    required
                >
                    <Radio.Group>
                        {props.scenarioData && props.scenarioData.map((template, index) => {
                            return (
                                <Radio key={index} value={template.value}>{template.name}</Radio>
                            );
                        })}
                    </Radio.Group>
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

