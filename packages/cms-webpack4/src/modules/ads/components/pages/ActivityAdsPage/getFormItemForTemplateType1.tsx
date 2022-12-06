import {ActivityBanner} from "../../../service/types";
import {AdTemplate1BrandCard, AdTemplate1Card} from "../../../import/ActivityAdListPage/components/AdTemplate1";
import {Button, Col, Divider, Form, Input, Row, Select} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import {getDefaultActivity1BannerContent} from "./getDefaultActivity1BannerContent";

export const getFormItemForTemplateType1 = (templateType: number, ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]) => {
    return (
        <Form.Item label="广告列表" required>
            <Form.List name="contents">
                {(fields, {add, remove}) => {
                    // console.log("fields", fields);
                    return (
                        <>
                            <Divider orientation="left" style={{color: "#ec606a"}}>主打广告</Divider>
                            <Row
                                gutter={[8, 8]}
                            >
                                <Col span={24}>
                                    <Form.Item
                                        required
                                        label={"广告标题"}
                                        name={[0, 'payload', 'title']}
                                    >
                                        <Input placeholder="广告标题"/>
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
                            {fields.map(({key, name, ...restField}, index) => {
                                // console.log("name", name)
                                if (index === 0) return null;
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
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label={"广告说明1"}
                                                            {...restField}
                                                            name={[name, 'payload', 'description1']}
                                                            rules={[{required: true}]}
                                                        >
                                                            <Input placeholder="广告说明1"/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
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

                                            <Col span={1}>
                                                <Row>
                                                    <Col span={24}>
                                                        <MinusCircleOutlined onClick={() => remove(name)}/>
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
                                            onClick={() => add(getDefaultActivity1BannerContent(ads.length + 1),
                                                ads.length)} block icon={<PlusOutlined/>}>
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
    )
}
