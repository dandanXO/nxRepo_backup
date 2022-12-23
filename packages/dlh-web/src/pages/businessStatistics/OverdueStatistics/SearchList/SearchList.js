import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Row, Col, Button, Select } from 'antd';
import {injectIntl, FormattedMessage} from "react-intl";

const Option = Select.Option;
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
        const { form: { getFieldsValue }, handleSearch } = this.props;
        handleSearch(getFieldsValue());
    }
    
    retu = () => {
        const { form: { getFieldsValue }, exportRecord } = this.props;
        exportRecord(getFieldsValue());
    }

    renderMerchants = () => {
        const { allMerchants } = this.props;
        if (!allMerchants) return;
        const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }


    render() {
        const { form: { getFieldDecorator  }, initTime , intl,isSuperAdmin } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        {isSuperAdmin && (
                            <Col span={6}>
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
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.overdue.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.no.restrict"}), intl.formatMessage({id : "page.search.list.no.restrict"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.collection.day"})}>
                                {
                                    getFieldDecorator('days', {
                                        initialValue: ''
                                    })(
                                        <Select>
                                            <Option value={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option value={'1'}><FormattedMessage id="page.search.list.one.day" /></Option>
                                            <Option value={'3'}><FormattedMessage id="page.search.list.three.day" /></Option>
                                            <Option value={'5'}><FormattedMessage id="page.search.list.five.day" /></Option>
                                            <Option value={'7'}><FormattedMessage id="page.search.list.seven.day" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                                <Button type={'primary'} style={{marginLeft:'10px'}} disabled={this.props.btnDisable} onClick={this.retu}><FormattedMessage id="page.table.export" /></Button>
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