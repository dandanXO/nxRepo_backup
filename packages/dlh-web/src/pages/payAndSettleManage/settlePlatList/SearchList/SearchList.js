import React, { Component } from 'react';
import { Form, DatePicker, Row, Col, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "react-intl";


const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
class SearchList extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleClick = () => {
        const { handleSearch, form: { getFieldsValue } } = this.props;
        handleSearch(getFieldsValue());
    }

    render() {
        const { form: { getFieldDecorator  } , intl } = this.props;
        return (
            <div>
                <Form>
                    <Row>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.platform.name"})}>
                                {
                                    getFieldDecorator('platName', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={intl.formatMessage({id : "page.search.list.platform.anme.enter"})}/>
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label={intl.formatMessage({id : "page.search.list.platform.type"})}>
                                {
                                    getFieldDecorator('platClass', {
                                        initialValue: ""
                                    })(
                                        <Input placehoder={intl.formatMessage({id : "page.search.list.platform.type.enter"})}/>
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
    intl: PropTypes.object.isRequired,
}

SearchList.defaultProps = {
    handleSearch() {}
}

export default Form.create()(injectIntl(SearchList));