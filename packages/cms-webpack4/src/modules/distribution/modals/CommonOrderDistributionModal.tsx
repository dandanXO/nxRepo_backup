import {Button, Form, Modal, Select} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useForm} from "antd/es/form/Form";
import {TreeCheckbox} from "../components/TreeCheckbox";
import {useLazyGetCollectorQuery} from "../services/TodayDistributionAPI";
import {normalizeCollector} from "../components/TreeCheckbox/normalizeCollector";
import {Stage} from "../types";
import {Typography} from "antd/es";
import {StageData} from "../pages/TodayDistributionPage";
import {useLazyGetOverdueCollectorQuery} from "../services/OverdueDistributionAPI";

interface OrderDistributionModalProps {
    show: boolean;
    handleCloseModal: () => void;
    onOk: (checkedCollector: number[]) => void;
    isSelectedByOrder: boolean;
    setDistributionStage: (distributionStage: Stage) => void;
    summaryData?: StageData;
    type: "today" | "overdue",
    stage?: string;
}
export const CommonOrderDistributionModal = (props: OrderDistributionModalProps) => {
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

    const [triggerGetOverdueCollector , {
        // data,
        currentData: currentOverdueData,
    }] = useLazyGetOverdueCollectorQuery();

    useEffect(() => {
        if(props.type === "today") {
            triggerGetCollector(null);
        } else {
            triggerGetOverdueCollector(null);
        }

    }, []);

    const [checkedCollector, setCheckedCollector] = useState([]);

    const [checkedJob, setCheckedJob] = useState([]); //设置选择的 level3，人ㄩㄢf

    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //设置选择的 level1, level2 row

    const onTreeCheckboxCheck = (collectors) => {
        setCheckedCollector(collectors)
    }

    const treeCheckboxData = useMemo(() => {
        const data = props.type === "today" ? currentData : currentOverdueData;
        let restrictedStageArray = []
        if(props.type === "today") {
            if(props.stage == Stage.T0) {
                restrictedStageArray = [Stage.T_1, Stage.S1, Stage.S2, Stage.S3, Stage.S4];
            } else {
                restrictedStageArray = [Stage.T0, Stage.S1, Stage.S2, Stage.S3, Stage.S4];
            }
        } else {
            if(props.stage == Stage.S1) {
                restrictedStageArray = [Stage.T0, Stage.S2, Stage.S3, Stage.S4];
            } else if (props.stage == Stage.S2) {
                restrictedStageArray = [Stage.T0, Stage.S1, Stage.S3, Stage.S4];
            } else if (props.stage == Stage.S3) {
                restrictedStageArray = [Stage.T0, Stage.S2, Stage.S1, Stage.S4];
            } else if (props.stage == Stage.S4) {
                restrictedStageArray = [Stage.T0, Stage.S2, Stage.S3, Stage.S1];
            }
        }
        return normalizeCollector(data, [Stage.NONE, ...restrictedStageArray]);
    }, [currentData, currentOverdueData]);

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

    const [distributionStage, setDistributionStage] = useState(props.type === "today" ? Stage.T0 : Stage.S1);
    console.log("distributionStage", distributionStage);
    console.log("summaryData", props?.summaryData);

    return (
        <Modal
            title={"分配订单"}
            open={props.show}
            onCancel={() => {
                props.handleCloseModal();
                handleUnselectedAllCollector();
            }}
            onOk={() => {
                props.onOk(checkedCollector);
                handleUnselectedAllCollector();
            }}
            width={'1000px'}
            maskClosable={false}
        >
            {!props.isSelectedByOrder && (
                <div>
                    <Form.Item name="merchantId" label="逾期等级" rules={[{ required: true }]}>
                        <Select placeholder={"选择"} defaultValue={distributionStage} onSelect={(value) => {
                            // console.log("value", value);
                            setDistributionStage(value);
                            props.setDistributionStage(value)
                        }}>
                            {props.type === "today" ? (
                                    <React.Fragment>
                                        <Select.Option key={1} value={Stage.T_1}>{Stage.T_1}</Select.Option>
                                        <Select.Option key={2} value={Stage.T0}>{Stage.T0}</Select.Option>
                                    </React.Fragment>
                            ): (
                                    <React.Fragment>
                                        <Select.Option key={1} value={Stage.S1}>{Stage.S1}</Select.Option>
                                        <Select.Option key={2} value={Stage.S2}>{Stage.S2}</Select.Option>
                                        <Select.Option key={3} value={Stage.S3}>{Stage.S3}</Select.Option>
                                        <Select.Option key={4} value={Stage.S4}>{Stage.S4}</Select.Option>
                                    </React.Fragment>
                                )}
                        </Select>
                    </Form.Item>
                    <Form.Item name="productName" label="待分案单量">
                        {props?.summaryData[distributionStage]?.todoTotal}
                    </Form.Item>
                </div>
            )}
            <div>
                <Button style={{marginRight: 8}} onClick={handleSelectedAllCollector}>全选</Button>
                <Button style={{marginRight: 8}} onClick={handleUnselectedAllCollector}>清空重选</Button>
                <Typography.Text>已选择 {checkedCollector.length} 个催收人员</Typography.Text>
            </div>
            {props?.summaryData[distributionStage]?.todoTotal > 0 && (
                <TreeCheckbox
                    data={treeCheckboxData}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    onCheck={onTreeCheckboxCheck}
                    checkedJob={checkedJob}
                    setCheckedJob={setCheckedJob}
                />
            )}
        </Modal>
    )
}
