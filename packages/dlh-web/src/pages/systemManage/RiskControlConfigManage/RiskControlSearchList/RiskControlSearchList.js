import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input,Select } from 'antd';
import PropTypes from 'prop-types';
const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
class RiskControlSearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleClick = () => {
        const { handleSearch, form: { getFieldsValue } } = this.props;
      
        handleSearch(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator  }  } = this.props;
        return (
            <div>
                <Form>
                <Row gutter={24}>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'配置名称'}>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入配置名称'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        {/* <Col span={6}>
                            <Form.Item {...formItemLayout} label={'配置代码'}>
                                {
                                    getFieldDecorator('key', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={'请输入配置代码'}/>
                                    )
                                }
                            </Form.Item>
                        </Col> */}
                        {/* <Col span={6}>
                            <Form.Item {...formItemLayout} label={'开关类型'}>
                                {
                                    getFieldDecorator('iscontrol', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'1'}>是</Option>
                                            <Option value={'0'}>否</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={'参数类型'}>
                                {
                                    getFieldDecorator('type', {
                                        initialValue: ""
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'0'}>默认类型</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col> */}
                       <Col lg={12} xl={8}>
                            <Form.Item>
                                <Button onClick={this.handleClick} type={'primary'}>查询</Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </div>

        );
    }

}
RiskControlSearchList.propTypes = {
    handleSearch: PropTypes.func
}
RiskControlSearchList.defaultProps = {
    handleSearch() {}
}

export default Form.create()(RiskControlSearchList);