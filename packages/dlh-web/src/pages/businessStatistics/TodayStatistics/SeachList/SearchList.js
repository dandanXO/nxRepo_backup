import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, DatePicker, Form, Row, Select} from 'antd';
import {axios} from 'utils';
import {FormattedMessage, injectIntl} from "react-intl";
import styles from '../TodayStatistics.less'

const {RangePicker} = DatePicker;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList: []
        };
    }

    submit = (e) => {
        e.preventDefault();
        const { form: { getFieldsValue }, handleSearch, type } = this.props;
        handleSearch({ type, obj: getFieldsValue() });
    }

    retu = () => {
        const { form: { getFieldsValue }, exportRecord, type } = this.props;
        exportRecord({ type, obj: getFieldsValue() });
    }

    componentDidMount() {
        try {
            const _this = this;
            axios({
                url: '/hs/admin/orderToday/queryDisPerOrGroup',
                method: 'post',
                data: {pageSize: 1000, pageNum: 1}
            }).then((res) => {
                if (res && res.code == '200') {
                    _this.setState({
                        nameList: res.data
                    });
                }
            });
        } catch (e) {

        }
    }

    render() {
        const { form: { getFieldDecorator }, initTime, intl, type } = this.props;
        let { nameList } = this.state;
        return (
            <div className={styles.searchList}>
                <Form onSubmit={this.submit}>
                    <Row gutter={40}>
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.table.due.time"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime.time
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id: "page.search.list.select"}), intl.formatMessage({id: "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id: "page.search.list.distribute.time"})}>
                                {
                                    getFieldDecorator('distributeTime', {
                                        initialValue: initTime.distributeTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id: "page.search.list.select"}), intl.formatMessage({id: "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        {type === 'collector' &&
                            <Col span={6}>
                                <Form.Item  {...formItemLayout} label={intl.formatMessage({ id: "page.search.customer.service" })}>
                                    {
                                        getFieldDecorator('collectorId', { initialValue: '' })(
                                            <Select>
                                                <Select.Option key='' value=''><FormattedMessage id="page.search.list.no.restrict" /></Select.Option>
                                                <Select.Option key='0' value='0'><FormattedMessage id="page.search.unassign" /></Select.Option>
                                                {nameList.length > 0 && nameList.map((item, i) => {
                                                    return <Select.Option key={i} value={item.collector_id}>{item.true_name}</Select.Option>
                                                })}
                                            </Select>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        }
                        <Col span={type === 'collector' ? 6 : 12}>
                            <Form.Item style={{textAlign: 'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search"/></Button>
                                <Button type={'danger'} style={{marginLeft: '10px'}} disabled={this.props.btnDisable} onClick={this.retu}><FormattedMessage id="page.table.export"/></Button>
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
    handleSearch: () => {
    },
    initTime: [],
    collectorId: null
};

export default Form.create()(injectIntl(SearchList));