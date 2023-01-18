import {Button, Modal, Table} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {TreeCheckbox} from "../components/TreeCheckbox";
import {useLazyGetCollectorQuery} from "../services/TodayDistributionAPI";
import {normalizeCollector} from "../components/TreeCheckbox/normalizeCollector";
import {Stage} from "../types";
import {Typography} from "antd/es";

interface OrderDistributionModalProps {
    show: boolean;
    handleCloseModal: () => void;
    onOk: () => void;
}
export const OrderDistributionModal = (props: OrderDistributionModalProps) => {
    const form = useForm();

    const [triggerGetCollector , {
        // data,
        currentData,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        isUninitialized,
    }] = useLazyGetCollectorQuery();

    useEffect(() => {
        triggerGetCollector(null);
    })

    const [checkedCollector, setCheckedCollector] = useState([]);

    const [checkedJob, setCheckedJob] = useState([]); //设置选择的 level3，人ㄩㄢf

    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //设置选择的 level1, level2 row

    const onTreeCheckboxCheck = (collectors) => {
        setCheckedCollector(collectors)
    }

    const treeCheckboxData = useMemo(() => {
        return normalizeCollector(currentData, [Stage.NONE]);
    }, [currentData]);

    const handleSelectedAllCollector = useCallback(() => {
        setSelectedRowKeys(treeCheckboxData["allKey"]);
        setCheckedJob(treeCheckboxData["allCollectorKey"]);
        setCheckedCollector(treeCheckboxData["allCollectorKey"]);
    }, [treeCheckboxData]);

    const handleUnselectedAllCollector = useCallback(() => {
        setSelectedRowKeys([]);
        setCheckedJob([]);
        setCheckedCollector([]);
    }, []);

    return (
        <Modal
            title={"分配订单"}
            open={props.show}
            onCancel={props.handleCloseModal}
            onOk={props.onOk}
            width={'1000px'}
            maskClosable={false}
        >
            <div>
                <Button style={{marginRight: 8}} onClick={handleSelectedAllCollector}>全选</Button>
                <Button style={{marginRight: 8}} onClick={handleUnselectedAllCollector}>清空重选</Button>
                <Typography.Text>已选择 {checkedCollector.length} 个催收人员</Typography.Text>
            </div>
            <TreeCheckbox
                data={treeCheckboxData}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                onCheck={onTreeCheckboxCheck}
                checkedJob={checkedJob}
                setCheckedJob={setCheckedJob}
            />
        </Modal>
    )
}
