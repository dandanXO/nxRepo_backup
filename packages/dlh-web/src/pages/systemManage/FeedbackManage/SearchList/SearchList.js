import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

const {RangePicker} = DatePicker;
const Option = Select.Option;


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, submit } = this.props;
        const params = getFieldsValue();
        submit(params);
    }

    renderTypeData = () => {
        const { typeData } = this.props;
        const ele = typeData.map(item => <Option key={item.id} value={item.title} >{item.title}</Option>);
        return [<Option key={''} value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }
    render() {
        const {form: {getFieldDecorator}, intl} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.feedback.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.mobile"})}>
                                {
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.mobile.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.client"})}>
                                {
                                    getFieldDecorator('deviceModel', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'android'}><FormattedMessage id="page.search.list.android" /></Option>
                                            <Option value={'ios'}><FormattedMessage id="page.search.list.ios" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.question.type"})}>
                                {
                                    getFieldDecorator('typeName', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            {this.renderTypeData()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={24} xl={16} style={{textAlign:'right'}}>
                            <Button type="primary" htmlType="submit"><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

SearchList.propTypes = {
    submit: PropTypes.func,
    typeData: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    submit: () => {

    },
    typeData: []
}

export default Form.create()(injectIntl(SearchList));
