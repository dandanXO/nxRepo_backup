import React, { Component } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from "react-intl";

const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};
class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleClick = () => {
        const { handleSearch, form: { getFieldsValue } } = this.props;
        // const { visible,allSettlePlatList,allSettleTypeList, form: { getFieldDecorator,getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());
    }

    renderMerchants = () => {
        const { allMerchants } = this.props;
        if (!allMerchants) return;
        const ele = allMerchants.map(item => <Option key={item.merchantId} value={item.merchantId} >{item.name}</Option>);
        return [<Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>].concat(ele);
    }


    render() {
        const { allSettlePlatList,form: { getFieldDecorator  }, intl ,isSuperAdmin } = this.props;
        // console.dir(allSettlePlatList);
        return (
            <div>
                <Form>
                    <Row>
                        {isSuperAdmin && (
                            <Col lg={12} xl={8}>
                                <Form.Item {...formItemLayout} label={intl.formatMessage({ id: "page.search.list.merchantName" })}>
                                    {
                                        getFieldDecorator('dlhMerchantId', {
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
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.payment.platId"})}>
                                {
                                    getFieldDecorator('platId', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue=''>
                                            <Option value={''} key={''}><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            {allSettlePlatList.length > 0 && allSettlePlatList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.platName}</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id :"page.search.list.payment.mchNo"})}>
                                {
                                    getFieldDecorator('mchNo', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={intl.formatMessage({id : "page.search.list.business.no.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id :"page.search.list.payment.mchName"})}>
                                {
                                    getFieldDecorator('mchName', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={intl.formatMessage({id : "page.search.list.business.name.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.crete.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: []
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={36} xl={24} style={{textAlign:'right'}}>
                                <Button onClick={this.handleClick} type={'primary'}><FormattedMessage id="page.search.list.search" /></Button>
                        </Col>

                    </Row>
                </Form>
            </div>

        );
    }

}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    allSettlePlatList: PropTypes.array,
    intl: PropTypes.object.isRequired,
}
SearchList.defaultProps = {
    handleSearch() {},
    allSettlePlatList: []
}

export default Form.create()(injectIntl(SearchList));
