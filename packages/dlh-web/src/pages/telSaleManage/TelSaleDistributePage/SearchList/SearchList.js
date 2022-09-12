import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { injectIntl, FormattedMessage } from "react-intl";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleSearch } = this.props;
        handleSearch(getFieldsValue());
    }
    render () {
        const { form: { getFieldDecorator }, intl, init } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.mobile" })}>
                                {
                                    getFieldDecorator('phoneNo', {
                                        initialValue: ''
                                    })(
                                        <Input placeholder={intl.formatMessage({ id: "page.search.list.mobile.enter" })} />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.order.status"})}>
                                {
                                    getFieldDecorator('status', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'0'}><FormattedMessage id="page.table.unregistered" /></Option>
                                            <Option value={'1'}><FormattedMessage id="page.table.not.verified" /></Option>
                                            <Option value={'2'}><FormattedMessage id="page.table.verified" /></Option>
                                            <Option value={'3'}><FormattedMessage id="page.table.loaning" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item style={{ textAlign: 'left' }}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /> </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => { }
};


export default Form.create()(injectIntl(SearchList));