import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
const {RangePicker} = DatePicker;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = (e) => {
        e.preventDefault();
        const { handleSearch, form: { getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());

    }


    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'添加时间'}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={['请选择', '请选择']}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'iCloud账号'}>
                                {
                                    getFieldDecorator('icloudNo', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={'请输入iCloud账号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'订单号'}>
                                {
                                    getFieldDecorator('allocationOrderNo', {
                                        initialValue: ""
                                    })(
                                        <Input placeholder={'请输入订单号'}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'账号状态'}>
                                {
                                    getFieldDecorator('state', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'1'}>待分配</Option>
                                            <Option value={'2'}>已分配</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={'激活状态'}>
                                {
                                    getFieldDecorator('actived', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'0'}>未激活</Option>
                                            <Option value={'1'}>已激活</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
SearchList.propTypes = {
    handleSearch: PropTypes.func
};
SearchList.defaultProps = {
    handleSearch: () => {},
};

export default Form.create()(SearchList);