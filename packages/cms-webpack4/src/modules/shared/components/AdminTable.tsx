import {Button, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import React, {useEffect, useMemo, useState} from "react";
import {ModalContent} from "../../risk/components/RiskSettingPage";



export enum ButtonsText {
    SearchText= "查詢",
    ResetText = "重置",
    AddText = "添加",
}


interface AdminTableTemplateProps<TableListItemDataType> {
    tableHeaderColumns:  ProColumns<TableListItemDataType, "text">[];
    loading: boolean;
    tableDatasource: TableListItemDataType[];
    onSearchClick?: (props: any) => TableListItemDataType[];
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>
}
export const AdminTable = <TableListItemDataType,>(props: AdminTableTemplateProps<TableListItemDataType>) => {

    // NOTE: actionRef
    // const actionRef = useRef<ActionType>();

    // NOTE: cachedTableHeaderColumns
    // const [cachedTableHeaderColumns, setCachedTableHeaderColumns] = useState<ProColumns<TableListItemDataType, "text">[]>()
    // useEffect(() => {
    //     const cachedTableHeaderColumns = props.tableHeaderColumns.map((column: ProColumns<TableListItemDataType>) => {
    //         if(typeof column.dataIndex === "string" && props.hideInSearchColumnNames.indexOf(column.dataIndex) > -1) {
    //             return {
    //                 ...column,
    //                 hideInSearch: true,
    //             }
    //         } else {}
    //         return column;
    //     })
    //     setCachedTableHeaderColumns(cachedTableHeaderColumns);
    // }, [props.tableHeaderColumns, props.hideInSearchColumnNames])

    // NOTE: cachedDatasource
    const [cachedDatasource, setCachedDatasource] = useState<Array<TableListItemDataType>>();

    useEffect(() => {
        setCachedDatasource(props.tableDatasource);
    }, [props.tableDatasource]);

    // NOTE: search
    const searchConfig = useMemo(() => {
        return {
            searchText: ButtonsText.SearchText,
            resetText: ButtonsText.ResetText,
            collapsed: false,
            labelWidth: 'auto',
            // 默认是否收起
            defaultCollapsed: false,
            // @ts-ignore
            optionRender: ({ searchText, resetText }, { form }) => (
                <Space>
                    <Button onClick={() => {
                        form.resetFields();
                        setCachedDatasource(props.tableDatasource);
                    }}>
                        {resetText}
                    </Button>
                    <Button
                        type={'primary'}
                        onClick={() => {
                            const searchInputKeys = form.getFieldsValue();
                            const searchedDataSource = props.onSearchClick(searchInputKeys);
                            setCachedDatasource(searchedDataSource);
                            form.submit();
                        }}
                    >
                        {searchText}
                    </Button>
                </Space>
            ),
        }
    }, [props.tableDatasource, props.onSearchClick]);

    return (
        <ProTable<TableListItemDataType>
            // Table action 的引用，便于自定义触发
            // actionRef={actionRef}
            // 可以获取到查询表单的 form 实例，用于一些灵活的配置
            // formRef={formRef}
            columns={props.tableHeaderColumns}
            dataSource={cachedDatasource}
            // onDataSourceChange={(dataSource: T[]) => void}
            // editable={{ type: 'multiple', }}
            // tableClassName={tableClassName}
            columnsState={{
                // defaultValue:Record<string, ColumnsState>;
                // value: Record<string, ColumnsState>;
                // persistenceKey: 'pro-table-singe-demos',
                // persistenceType: 'localStorage',
                // onChange(value:Record<string, ColumnsState>)=>void
            }}
            // rowKey="id"
            // @ts-ignore
            search={!props.searchable ? false : searchConfig}
            options={{
                setting: {
                    listsHeight: 400,
                },
                // reload:()=>props.triggerGetList(null)
            }}
            // dateFormatter="string"
            dateFormatter={(value, valueType) => {
                console.log('====>', value, valueType);
                return value.format('YYYY-MM-DD HH:mm:ss');
            }}
            // NOTE: Unknow
            headerTitle={
                <Button key="button" icon={<PlusOutlined />} type="primary" onClick={
                    () => {
                        props.setShowModalContent({
                            show: true,
                            isEdit: false,
                        });
                    }
                }>{ButtonsText.AddText}</Button>
            }
            // NOTE: Antd Design
            pagination={{
                // 每页条数
                pageSize: 10,
                // 是否展示 pageSize 切换器
                showSizeChanger: true,
                // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
                // onChange: (page) => console.log(page),
                // pageSize 变化的回调
                // onShowSizeChange: (current, size) => console.log(current, size)
            }}
            // form={form}
            // onSubmit={(params: U) => void}
            // onReset={() => void}
            loading={props.loading}
            // NOTE:
            // scroll={{ x: 1000 }}
        />
    )
}
