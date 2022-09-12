import React from 'react';
import { Row, Col, Icon, Popconfirm, Tooltip } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './SortItem.less';
import {injectIntl, FormattedMessage} from "react-intl";

const typeName = {
    1: <FormattedMessage id="windowPage.pass" />,
    2: <FormattedMessage id="windowPage.unqualified" />, 
    3: <FormattedMessage id="windowPage.not.applied" />
}
const statusName = {
    0: <FormattedMessage id="windowPage.off.shelf" />,
    1: <FormattedMessage id="windowPage.on.shelf" />
}

class SortItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleEdit = (info) => {
        this.props.handleEdit(info);
    }
    handleDelete = (info) => {
        this.props.handleDelete(info);
    }

    render() {
        const { info, isLast, intl } = this.props;
        const cls = isLast ? styles.isLast: '';
        return (
            <Row className={`${styles.row} ${cls}`}>
                <Col  className={styles.col} span={2}>
                    {
                        info['createTime'] ? moment(Number(info['createTime'])).format('YYYY-MM-DD HH:mm:ss') : ''
                    }
                </Col>
                <Col  className={styles.col} span={2}>{info.name || ''}</Col>
                <Col  className={styles.col} span={3}>
                    <Tooltip title={info.title}>
                        {info.title || ''}
                    </Tooltip>
                </Col>
                <Col  className={styles.col} span={2}>{info.quota || ''}</Col>
                <Col  className={styles.col} span={2}>
                    {
                        info['rate'] ? `${info['rate']}${info['rateUnit'] || ''}` : ''
                    }
                </Col>
                <Col  className={styles.col} span={2}>
                    {
                        info['loanSpeed'] ? `${info['loanSpeed']}${info['loanUnit'] || ''}` : ''
                    }
                </Col>
                <Col  className={styles.col} span={3}>
                    <Tooltip title={info.url}>
                        {info.url || ''}
                    </Tooltip>

                    </Col>
                <Col  className={styles.col} span={2}>
                    {
                        info.logo && <img className={styles.img} src={info.logo}/>
                    }
                </Col>
                <Col  className={styles.col} span={2}>
                    {
                       statusName[info['status']]
                    }
                </Col>
                <Col  className={styles.col} span={2}>
                    {
                        typeName[info['type']]
                    }
                </Col>
                <Col className={styles.col} span={2}>
                    <div className={styles.operator}>
                        <div onClick={() => this.handleEdit(info)}><Icon type={'edit'}/></div>
                        <Popconfirm title={intl.formatMessage({id : "windowPage.confirm.delete"})} onConfirm={() => this.handleDelete(info)}>
                            <div><Icon type={'delete'}/></div>
                        </Popconfirm>
                    </div>
                </Col>
            </Row>
        );
    }

}
SortItem.propTypes = {
    info: PropTypes.object,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    isLast: PropTypes.bool,
    intl: PropTypes.object.isRequired,
};
SortItem.defaultProps = {
    info: {},
    handleEdit(){},
    handleDelete(){},
    isLast: false
};

export default injectIntl(SortItem)