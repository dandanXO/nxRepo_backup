import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { CommonTable } from 'components';
import styles from './ColumnExpandTable.less';
import { Button } from 'antd';
function ColumnExpandTable ({ intl,extraButtons, tableData, firstColumns, lastColumns, expandColumns ,...props}) {
//將展開的切成三段 (expandColumns為中間插入顯示隱藏的)
    const [isExpand, setIsExpand] = useState(false)
    const [columnList, setColumnList] = useState([...firstColumns, ...lastColumns]);
    const [expandList, setExpandList] = useState(expandColumns);
    const [lastList, setLastList] = useState(lastColumns);
    useEffect(() => {
        setExpandList(expandColumns.map(col => {
            return { ...col, className: isExpand ? styles.hide : styles.show }
        }))
        setLastList(lastColumns.map(col => {
            return { ...col, className: isExpand ? styles.lastColumnsShow : '' }
        }))
    }, [isExpand])

    const handleExpandData = () => {

        setColumnList(!isExpand ? [...firstColumns, ...expandList, ...lastList] : [...firstColumns, ...lastList])
        setIsExpand(!isExpand);

    }

    return (
        <div>
            <div className={styles.buttonWrapper}>
                {extraButtons}
                {expandList.length > 0 && <Button onClick={handleExpandData}><FormattedMessage id={isExpand ? "page.table.Collapse" : "page.table.Expand"} /></Button>}
            </div>
            <CommonTable
                columns={columnList}
                dataSource={tableData}
                scroll={isExpand ? { x: "max-content" } : {}}
                rowKey={(record, index) => index}
                {...props}
            />
        </div>
    );
}

ColumnExpandTable.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(ColumnExpandTable);

