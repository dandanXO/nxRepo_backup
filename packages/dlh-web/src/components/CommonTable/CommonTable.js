import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import styles from './CommonTable.less';
import { injectIntl, FormattedMessage } from "react-intl";
import { connect } from 'react-redux';
class CommonTable extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.initPageInfo = {
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions:
            props.pagination && props.pagination.pageSizeOptions //特殊分頁需求，如1000/2000
              ? props.pagination.pageSizeOptions
              : ["10", "20", "30", "40", "50", "100", "200", "300", "400", "500"],
            showTotal (total) {
                return <div><FormattedMessage id="page.table.total" />{total}<FormattedMessage id="page.table.record" /></div>;
            }
        }
    }

    render() {
        const { dataSource, columns, pagination, handlePageChange, loading, title, rowSelection, size, scroll, intl, globalTableSize, tableSize = "", ...props } = this.props;
        const pageInfo = pagination ? { ...pagination, ...this.initPageInfo } : false;
        // const tableStyle = globalTableSize ? "" : styles.smallTable;
        const tableStyle = styles.smallTable;
        return (
            <div className={`${styles.tableContainer} ${tableStyle}`}>
                <Table
                    loading={loading}
                    dataSource={dataSource}
                    bordered
                    columns={columns}
                    rowSelection={rowSelection}
                    rowKey={'id'}
                    onChange={handlePageChange}
                    locale={{emptyText: intl.formatMessage({id : "page.table.no.data"})}}
                    title={title}
                    size={size}
                    scroll={scroll}
                    pagination={pageInfo}
                    {...props}/>
            </div>

        );
    }
}

CommonTable.propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array.isRequired,
    pagination: PropTypes.object,
    loading: PropTypes.bool,
    handlePageChange: PropTypes.func,
    title: PropTypes.any,
    pageSize: PropTypes.number,
    rowSelection: PropTypes.object,
    size: PropTypes.string,
    scroll: PropTypes.object,
    intl: PropTypes.object.isRequired,
};
CommonTable.defaultProps = {
    dataSource: [],
    loading: false,
    pagination: {},
    handlePageChange() {},
    title: null,
    pageSize: 10,
    rowSelection: null,
    size: 'default',
    scroll: {}
}
const mapStateToProps = (state) => {
    const { globalSettingState } = state;
    return {
        globalTableSize: globalSettingState.tableSize
    };
};

// export default connect(mapStateToProps)(injectIntl(CommonTable));
export default injectIntl(CommonTable);

