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
    
    renderTeam = () => {
        const { teamsData } = this.props;
        return teamsData.map(item => <Option key={item.id} value={item.id} >{item.name}</Option>)
    }

    downloadCollectReport = () => {
        const { form: { getFieldsValue }, downloadReport } = this.props;

        const { time, collectTeamId, leng } = getFieldsValue()
        const isArr = Array.isArray(time) && time.length > 0;
        const params = {
            startDate: isArr ? time[0].format('YYYY-MM-DD') : '',
            endDate: isArr ? time[1].format('YYYY-MM-DD') : '',
            collectTeamId,
            leng
        }

       downloadReport(params);

    }

    render() {
        const { form: { getFieldDecorator }, initTime, intl } = this.props;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <Row gutter={60}>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.report.date"})}>
                                {
                                    getFieldDecorator('time', {
                                        initialValue: initTime
                                    })(
                                        <RangePicker placeholder={[intl.formatMessage({id : "page.search.list.select"}), intl.formatMessage({id : "page.search.list.select"})]}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.collect-team"})}>
                                {
                                    getFieldDecorator('collectTeamId', {
                                        initialValue: ""
                                    })(
                                        <Select >
                                           <Option key={'teamOption'} value=""><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                           {this.renderTeam()}
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.table.leng"})}>
                                {
                                    getFieldDecorator('leng', {
                                        initialValue: ""
                                    })(
                                        <Select >
                                            <Option key={'lengOption'} value=""><FormattedMessage id="page.search.list.no.restrict" /></Option>
                                            <Option key={'lengTrue'} value="true"><FormattedMessage id="page.table.yes" /></Option>
                                            <Option key={'lengFalse'} value="false"><FormattedMessage id="page.table.no" /></Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item style={{textAlign:'right'}}>
                                <Button type={'primary'} htmlType={'submit'}><FormattedMessage id="page.search.list.search" /></Button>
                           </Form.Item>
                        </Col>
                    </Row>
                    <Col span={24}>
                            <Form.Item style={{textAlign:'left'}}>
                                <Button type={'danger'} onClick={this.downloadCollectReport}><FormattedMessage id="page.table.export" /></Button>
                           </Form.Item>
                        </Col>
                </Form>
            </div>

        );
    }
}
SearchList.propTypes = {
    handleSearch: PropTypes.func,
    intl: PropTypes.object.isRequired,
    teamsData: PropTypes.array,
    initTime: PropTypes.array

};
SearchList.defaultProps = {
    handleSearch: () => { },
    teamsData: [],
    initTime: []
};

export default Form.create()(injectIntl(SearchList));