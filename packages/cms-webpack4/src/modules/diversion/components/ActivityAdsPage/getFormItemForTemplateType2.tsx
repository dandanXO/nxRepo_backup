// import { ActivityBanner } from "../../../export/service/types";
// import { AdTemplate1BrandCard, AdTemplate1Card } from "../../../import/ActivityAdListPage/components/AdTemplate1";
import { Col, Divider, Form, Input, Row, Select } from 'antd';
import React from 'react';

export const getFormItemForTemplateType2 =
    (): // templateType: number, ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]
    JSX.Element => {
        const adTitles = ['左侧广告', '右上广告', '右下广告'];
        return (
            <Form.Item label="广告列表" required>
                <Form.List name="contents">
                    {(fields) => {
                        // console.log("fields", fields);
                        return (
                            <>
                                <Divider orientation="left" style={{}}>
                                    {adTitles[0]}
                                </Divider>
                                <Row gutter={[8, 8]}>
                                    <Col span={24}>
                                        <Form.Item required label={'广告标题1'} name={[0, 'payload', 'title1']}>
                                            <Input placeholder="广告标题1" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item required label={'广告标题2'} name={[0, 'payload', 'title2']}>
                                            <Input placeholder="广告标题2" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item required label={'价格币别'} name={[0, 'payload', 'priceUnit']}>
                                            <Input placeholder="价格币别" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item required label={'币别价格'} name={[0, 'payload', 'price']}>
                                            <Input placeholder="币别价格" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={'按钮名称'}
                                            name={[0, 'payload', 'actionName']}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="按钮名称" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'按钮动作'} name={[0, 'action']} rules={[{ required: true }]}>
                                            <Select>
                                                <Select.Option value="APPLY_LOAN">强制下款</Select.Option>
                                                <Select.Option value="POP_URL">跳转至自定义网址</Select.Option>
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
                                                return prevValues.contents[0].action !== curValues.contents[0].action;
                                            }}
                                        >
                                            {({ getFieldValue }) => {
                                                const action = getFieldValue(['contents', 0, 'action']);
                                                // console.log("action", action)
                                                if (action == 'POP_URL') {
                                                    return (
                                                        <Form.Item
                                                            name={[0, 'actionUrl']}
                                                            label="目标网址"
                                                            rules={[{ required: true }]}
                                                        >
                                                            <Input placeholder="目标网址" />
                                                        </Form.Item>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            }}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {fields.map(({ key, name, ...restField }, index) => {
                                    // console.log("name", name)
                                    if (index === 0) return null;
                                    return (
                                        <div key={index}>
                                            <Divider orientation="left" style={{}}>
                                                {adTitles[index]}
                                            </Divider>
                                            <Row
                                                key={key}
                                                gutter={[8, 8]}
                                                style={
                                                    {
                                                        // borderBottom: "1px solid #aaa",
                                                        // marginBottom: 16
                                                    }
                                                }
                                            >
                                                <Col span={23}>
                                                    <Row gutter={[8, 8]}>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                label={'广告标题'}
                                                                {...restField}
                                                                name={[name, 'payload', 'title']}
                                                                rules={[{ required: true }]}
                                                            >
                                                                <Input placeholder="广告标题" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={24}>
                                                            <Form.Item
                                                                label={'按钮名称'}
                                                                {...restField}
                                                                name={[name, 'payload', 'actionName']}
                                                                rules={[{ required: true }]}
                                                            >
                                                                <Input placeholder="按钮名称" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                label={'按钮动作'}
                                                                {...restField}
                                                                name={[name, 'action']}
                                                                rules={[{ required: true }]}
                                                            >
                                                                <Select>
                                                                    <Select.Option value="APPLY_LOAN">
                                                                        强制下款
                                                                    </Select.Option>
                                                                    <Select.Option value="POP_URL">
                                                                        跳转至自定义网址
                                                                    </Select.Option>
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
                                                                    return (
                                                                        prevValues.contents[name].action !==
                                                                        curValues.contents[name].action
                                                                    );
                                                                }}
                                                            >
                                                                {({ getFieldValue }) => {
                                                                    const action = getFieldValue([
                                                                        'contents',
                                                                        name,
                                                                        'action',
                                                                    ]);
                                                                    // console.log("action", action)
                                                                    if (action == 'POP_URL') {
                                                                        return (
                                                                            <Form.Item
                                                                                name={[name, 'actionUrl']}
                                                                                label="目标网址"
                                                                                rules={[{ required: true }]}
                                                                            >
                                                                                <Input placeholder="目标网址" />
                                                                            </Form.Item>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                }}
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })}
                                <Row />
                            </>
                        );
                    }}
                </Form.List>
            </Form.Item>
        );
    };
