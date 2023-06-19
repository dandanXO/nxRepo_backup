import { Form, FormInstance, Input, Select, Switch, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { AdminForm } from '../../../../../shared/components/common/AdminForm';
import { DeepPartial } from '../../../../../shared/types/custom';
import { AdsScenarioData } from '../../../data/AdsScenarioData';
import { AdsTemplateData } from '../../../data/AdsTemplateData';
import { getTemplate1AdTemplate1Data } from '../../../export/mapper/getTemplate1AdTemplate1Data';
import { getTemplate2AdTemplate1Data } from '../../../export/mapper/getTemplate2AdTemplate1Data';
import { getTemplate3AdTemplate1Data } from '../../../export/mapper/getTemplate3AdTemplate1Data';
import { IActivityAdsPageFormStore } from '../../../export/types/IAdsFormStore';
import { DemoActivityAdListPage } from '../../../import/ActivityAdListPage';
import { getFormItemForTemplateType } from './getFormItemForTemplateType';

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
    initialValues: DeepPartial<IActivityAdsPageFormStore>;
    // templateData: Array<IAdsTemplate>;
    // scenarioData: IAdsScenario[];
    modal: any;
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 1000px;
    margin: 0 auto;
`;
const Preview = styled.div`
    //position: sticky;
    //top: 0;
    //left: 0;
    height: 640px;
`;

export const ActivityAdsForm = (props: IActivityAdsForm): JSX.Element => {
    const templateType = Form.useWatch('templateType', props.form);
    // console.log("templateType", templateType);

    const contents: any | undefined = Form.useWatch('contents', props.form);
    // console.log("contents", contents);

    let adTemplate1Data;
    if (templateType === 1) {
        adTemplate1Data = getTemplate1AdTemplate1Data(contents as any);
    } else if (templateType === 2) {
        adTemplate1Data = getTemplate2AdTemplate1Data(contents as any);
    } else if (templateType === 3) {
        adTemplate1Data = getTemplate3AdTemplate1Data(contents as any);
    }

    // NOTE:
    return (
        <AdminForm
            form={props.form}
            initialValues={props.initialValues}
            onFieldsChange={props.onFieldsChange}
            onFinish={props.onFinish}
        >
            <FormContainer>
                <Preview>
                    <Title level={5}>预览</Title>
                    <div style={{ textAlign: 'center' }}>
                        <Text>观赏首页广告</Text>
                    </div>
                    <Container>
                        <DemoActivityAdListPage type={String(templateType)} data={adTemplate1Data} />
                    </Container>
                </Preview>

                <AdminForm
                    form={props.form}
                    initialValues={props.initialValues}
                    onFieldsChange={props.onFieldsChange}
                    onFinish={props.onFinish}
                >
                    <Form.Item label="广告名称" name="name" rules={[{ required: true }]}>
                        <Input placeholder="广告名称" />
                    </Form.Item>

                    <Form.Item
                        label={'模板选择'}
                        name="templateType"
                        rules={[{ required: true }]}
                        extra={'设定后即无法直接修改，送出前请务必再次确认。'}
                    >
                        <Select
                            disabled={props.isEdit}
                            placeholder={'选择'}
                            onClick={() => {
                                // props.modal.confirm({
                                //     title: "切換版型會遺失目前的內容",
                                //     // NOTICE: 得用下面寫法否則 editID 會找不到
                                //     onOk:  () => {
                                //         // console.log("defaultFormValues: ", defaultFormValues);
                                //         // form.setFieldsValue(defaultFormValues);
                                //     },
                                //     // onOk: onDeleteModalOK,
                                //     onCancel: () => {
                                //
                                //     },
                                // });
                            }}
                        >
                            {AdsTemplateData &&
                                AdsTemplateData.map((template, index) => {
                                    return (
                                        <Select.Option key={index} value={template.id}>
                                            {template.name}
                                        </Select.Option>
                                    );
                                })}
                        </Select>
                    </Form.Item>

                    <Form.Item label={'目标场景'} name="scenario" rules={[{ required: true }]}>
                        <Select placeholder={'选择'}>
                            {AdsScenarioData &&
                                AdsScenarioData.map((template, index) => {
                                    return (
                                        <Select.Option key={index} value={template.value}>
                                            {template.name}
                                        </Select.Option>
                                    );
                                })}
                        </Select>
                    </Form.Item>

                    {getFormItemForTemplateType(templateType, contents)}

                    <Form.Item label={'状态'} name={'enabled'} valuePropName={'checked'}>
                        <Switch checkedChildren={'启用'} unCheckedChildren={'停用'}></Switch>
                    </Form.Item>
                </AdminForm>
            </FormContainer>
        </AdminForm>
    );
};
