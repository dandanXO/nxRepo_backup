import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './ExpandableTable.less';
import { CommonTable } from 'components';
import { FormattedMessage, injectIntl } from "react-intl";

class ExpandableTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isExand: true,
            expandKeys: []
        };   
    }

    handleExpandRemarks = (type,data) => {
        this.setState({
            expandKeys: type ? [] : data && data.map((i) => i.id),
            isExand:type
        });
    };
 
    handleToggleExpandRemark = (isExand, { id }) => {
        const { expandKeys } = this.state;
        const newExpand = isExand
            ? [...expandKeys, id]
            : expandKeys.filter((i) => i !== id);
        this.setState({ expandKeys: newExpand });
    };

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.dataSource !== nextProps.dataSource) {
    //         this.handleExpandRemarks(this.state.isExand, nextProps.dataSource)
    //     }
    // }

    renderHeaderExpandIcon = (data) => {
        
        return (
            <span className={styles.expandIcon}>
                <div
                    onClick={() => this.handleExpandRemarks(true,data)}
                    style={{display: this.state.expandKeys.length ? "inline-block" : "none"}}
                    className="ant-table-row-expand-icon ant-table-row-expanded"
                />
                <div
                    onClick={() => this.handleExpandRemarks(false,data)}
                    style={{display: this.state.expandKeys.length ? "none" : "inline-block",}}
                    className="ant-table-row-expand-icon ant-table-row-collapsed"
                />
            </span>
        );
    };

   
    render() {
        const { dataSource, expandedRowRender } = this.props;
        const { expandKeys } = this.state
        
        return (

            <div className={styles.expandTableStyle}>
                {this.renderHeaderExpandIcon(dataSource)}
                <CommonTable
                    expandedRowRender={expandedRowRender}
                    expandedRowKeys={expandKeys} // 目前展開的row的arr
                    onExpand={(isExand, record) => this.handleToggleExpandRemark(isExand, record)}
                    {...this.props}
                />
            </div>
        );
    }
}

ExpandableTable.propTypes = {
    dataSource: PropTypes.array,
    expandedRowRender:PropTypes.func,
};
ExpandableTable.defaultProps = {
    dataSource: [],
    expandedRowRender(){},
}
export default injectIntl(ExpandableTable);