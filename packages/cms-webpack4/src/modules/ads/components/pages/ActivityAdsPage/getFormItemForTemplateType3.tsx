import {ActivityBanner} from "../../../service/types";
import {AdTemplate1BrandCard, AdTemplate1Card} from "../../../import/ActivityAdListPage/components/AdTemplate1";
import {Col, Divider, Form, Input, Row, Select} from "antd";
import React from "react";

export const getFormItemForTemplateType3 = (templateType: number, ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]) => {
    const adTitles = ["主广告", "广告"]
    return (
        <Form.Item label="广告列表" required>
            <Form.List name="contents">
                {(fields, {add, remove}) => {
                    // console.log("fields", fields);
                    return (
                        <>
                            <Divider orientation="left" style={{}}>{adTitles[0]}</Divider>
                            <Row
                                gutter={[8, 8]}
                            >
                                <Col span={24}>
                                    <Form.Item
                                        required
                                        label={"广告标题"}
                                        name={[0, 'payload', 'title']}
                                    >
                                        <Input placeholder="广告标题1"/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        required
                                        label={"广告说明1"}
                                        name={[0, 'payload', 'description1']}
                                    >
                                        <Input placeholder="广告说明1"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        required
                                        label={"广告说明2"}
                                        name={[0, 'payload', 'description2']}
                                    >
                                        <Input placeholder="广告说明2"/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label={"按钮名称"}
                                        name={[0, 'payload', 'actionName']}
                                        rules={[{required: true}]}
                                    >
                                        <Input placeholder="按钮名称"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={"按钮动作"}
                                        name={[0, 'action']}
                                        rules={[{required: true}]}
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
                                            return prevValues.contents[0].action !== curValues.contents[0].action
                                        }}
                                    >
                                        {({getFieldValue}) => {
                                            let action = getFieldValue(['contents', 0, 'action']);
                                            // console.log("action", action)
                                            if (action == "POP_URL") {
                                                return (
                                                    <Form.Item
                                                        name={[0, 'actionUrl']}
                                                        label="目標網址"
                                                        rules={[{required: true}]}
                                                    >
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
                            {fields.map(({key, name, ...restField}, index) => {
                                // console.log("name", name)
                                if (index === 0) return null;
                                return (
                                    <div key={index}>
                                        <Divider orientation="left" style={{}}>{adTitles[index]}</Divider>
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
                                                    <Col span={24}>
                                                        <Form.Item
                                                            label={"广告标题"}
                                                            {...restField}
                                                            name={[name, 'payload', 'title']}
                                                            rules={[{required: true}]}
                                                        >
                                                            <Input placeholder="广告标题"/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Form.Item
                                                            label={"广告说明1"}
                                                            {...restField}
                                                            name={[name, 'payload', 'description1']}
                                                            rules={[{required: true}]}
                                                        >
                                                            <Input placeholder="广告说明1"/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Form.Item
                                                            label={"广告说明2"}
                                                            {...restField}
                                                            name={[name, 'payload', 'description2']}
                                                            rules={[{required: true}]}
                                                        >
                                                            <Input placeholder="广告说明2"/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Form.Item
                                                            label={"按钮名称"}
                                                            {...restField}
                                                            name={[name, 'payload', 'actionName']}
                                                            rules={[{required: true}]}
                                                        >
                                                            <Input placeholder="按钮名称"/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label={"按钮动作"}
                                                            {...restField}
                                                            name={[name, 'action']}
                                                            rules={[{required: true}]}
                                                        >
                                                            <Select>
                                                                <Select.Option
                                                                    value="APPLY_LOAN">跳轉至付款頁</Select.Option>
                                                                <Select.Option
                                                                    value="POP_URL">跳轉至自定義網址</Select.Option>
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
                                                            {({getFieldValue}) => {
                                                                let action = getFieldValue(['contents', name, 'action']);
                                                                // console.log("action", action)
                                                                if (action == "POP_URL") {
                                                                    return (
                                                                        <Form.Item name={[name, 'actionUrl']}
                                                                                   label="目標網址"
                                                                                   rules={[{required: true}]}>
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
                                        </Row>
                                    </div>
                                )
                            })}
                            <Row/>
                        </>
                    )
                }}
            </Form.List>
        </Form.Item>
    )


}
