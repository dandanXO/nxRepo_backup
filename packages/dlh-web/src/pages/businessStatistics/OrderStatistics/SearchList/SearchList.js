import React, {Component} from 'react';
import { Form, Row, Col, Input, DatePicker, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


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

    render() {
        const {form: {getFieldDecorator}, intl} = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={40}>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.name"})}>
                                {
                                    getFieldDecorator('nameTrue', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({id : "page.search.list.name.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
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
                        {/* <Col span={8}>
                            <Form.Item {...formItemLayout} label={'手机号'}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}>不限</Option>
                                            <Option value={'9'}>放款成功待还款</Option>
                                            <Option value={'10'}>已结清</Option>
                                            <Option value={'11'}>已逾期</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col> */}
                        <Col span={24} style={{textAlign:'right'}}>
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
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    submit: () => {

    }
}

export default Form.create()(injectIntl(SearchList));