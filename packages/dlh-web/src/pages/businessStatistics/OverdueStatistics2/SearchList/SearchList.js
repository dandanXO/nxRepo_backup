import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const { RangePicker } = DatePicker;
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
        const { form: { getFieldsValue }, handleSearch, type } = this.props;
        handleSearch(type, getFieldsValue());
    }
    
    renderMerchants = () => {
        const { allMerchants } = this.props;
        if (!allMerchants) return;
        const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }

    render() {
        const { form: { getFieldDecorator }, initTime, intl, isSuperAdmin } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        {isSuperAdmin && (
                            <Col span={8}>
                                <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.merchantName" })}>
                                    {
                                        getFieldDecorator('merchantId', {
                                            initialValue: ''
                                        })(
                                            <Select>
                                                {this.renderMerchants()}
                                            </Select>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.loan.date"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.no.restrict"}), intl.formatMessage({id : "page.search.list.no.restrict"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
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
    initTime: PropTypes.array,
    intl: PropTypes.object.isRequired,
};
SearchList.defaultProps = {
    handleSearch: () => {},
    initTime: []
};

export default Form.create()(injectIntl(SearchList));