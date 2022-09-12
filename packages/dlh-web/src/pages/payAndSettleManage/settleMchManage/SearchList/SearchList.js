import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";

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

    render() {
        const { allSettlePlatList,form: { getFieldDecorator  }, intl  } = this.props;
        // console.dir(allSettlePlatList);
        return (
            <div>
                <Form>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.repayement.platfrom"})}>
                                {
                                    getFieldDecorator('platId', {
                                        initialValue: ""
                                    })(
                                        <Select initialValue=''>
                                            {allSettlePlatList.length > 0 && allSettlePlatList.map((item, i) => {
                                                return <Select.Option key={i} value={item.id}>{item.platName}({item.platClass})</Select.Option>
                                            })}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id :"page.search.list.business.no"})}>
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
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id :"page.search.list.business.name"})}>
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