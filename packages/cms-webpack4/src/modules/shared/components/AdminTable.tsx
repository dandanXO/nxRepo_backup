import {Button, FormInstance, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ProColumns, ProTable} from "@ant-design/pro-components";
import React, {useEffect, useMemo, useState} from "react";

export interface ModalContent {
    show: boolean;
    isEdit: boolean;
}


export enum ButtonsText {
    SearchText= "查詢",
    ResetText = "重置",
    AddText = "添加",
}


interface AdminTableTemplateProps<TableListItemDataType> {
    tableHeaderColumns:  ProColumns<TableListItemDataType, "text">[];
    loading?: boolean;
    tableDatasource: TableListItemDataType[];
    onSearchClick?: (props: any) => TableListItemDataType[];
    setShowModalContent?: React.Dispatch<React.SetStateAction<ModalContent>>;
    hasAddForm: boolean;
    hasEditForm?: boolean;
    searchable?: boolean;
    addText?: string;
    onAddCallback?: () => void;
    isSearchFromClient?: boolean;
    onFormSearchCallback?: (form: FormInstance) => void;
    onFormResetCallback?: () => void;
    // NOTE: setting
    triggerGetList?: () => void;
}
export const AdminTable = <TableListItemDataType,>({
                                                       tableHeaderColumns,
                                                       loading,
                                                       tableDatasource,
                                                       onSearchClick,
                                                       setShowModalContent,
                                                       hasAddForm = true,
                                                       hasEditForm = true,
                                                       searchable = true,
                                                       addText = ButtonsText.AddText,
                                                       onAddCallback,
                                                       isSearchFromClient = true,
                                                       onFormSearchCallback,
                                                       onFormResetCallback,
                                                       triggerGetList,
}: AdminTableTemplateProps<TableListItemDataType>) => {
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
        setCachedDatasource(tableDatasource);
    }, [tableDatasource]);

    // NOTE: search
    const searchConfig = useMemo(() => {
        return {
            searchText: ButtonsText.SearchText,
            resetText: ButtonsText.ResetText,
            labelWidth: 'auto',
            // 默认是否收起
            defaultCollapsed: false,
            // @ts-ignore
            optionRender: ({ searchText, resetText }, { form }) => (
                <Space>
                    <Button onClick={() => {
                        form.resetFields();
                        setCachedDatasource(tableDatasource);
                        onFormResetCallback();
                    }}>
                        {resetText}
                    </Button>
                    <Button
                        type={'primary'}
                        onClick={() => {
                            if(onSearchClick && isSearchFromClient) {
                                const searchInputKeys = form.getFieldsValue();
                                const searchedDataSource = onSearchClick(searchInputKeys);
                                setCachedDatasource(searchedDataSource);
                                form.submit();
                            }
                            if(!isSearchFromClient && onFormSearchCallback) {
                                onFormSearchCallback(form);
                                form.submit();
                            }
                        }}
                    >
                        {searchText}
                    </Button>
                </Space>
            ),
        }
    }, [tableDatasource, onSearchClick]);

    const [currentPaginationPageSize, setCurrentPaginationPageSize] = useState(10);

    return (
        <ProTable<TableListItemDataType>
            // Table action 的引用，便于自定义触发
            // actionRef={actionRef}
            // 可以获取到查询表单的 form 实例，用于一些灵活的配置
            // formRef={formRef}
            columns={tableHeaderColumns}
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
            search={!searchable ? false : searchConfig}
            options={{
                setting: {
                    listsHeight: 400,
                },
                // NOTICE: refresh icon
                reload: ()=> triggerGetList(),
            }}
            // dateFormatter="string"
            dateFormatter={(value, valueType) => {
                // console.log('====>', value, valueType);
                return value.format('YYYY-MM-DD HH:mm:ss');
            }}
            // NOTE: Unknow
            headerTitle={
                <>
                    {hasAddForm && (
                        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => onAddCallback && onAddCallback()}>{addText}</Button>
                    )}
                </>
            }
            // NOTE: Antd Design
            pagination={{
                // NOTE: Changing Page Size
                // 每页条数
                pageSize: currentPaginationPageSize,
                // 是否展示 pageSize 切换器
                showSizeChanger: true,
                // pageSize 变化的回调
                onShowSizeChange: (current, pageSize) => {
                    console.log(current, pageSize);
                    setCurrentPaginationPageSize(pageSize);
                },

                // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
                // onChange: (page) => console.log(page),

            }}
            // form={form}
            // onSubmit={(params: U) => void}
            // onReset={() => void}
            loading={loading}
            // NOTE:
            // scroll={{ x: 1000 }}
            // 收起按钮的 render
            // collapseRender={(collapsed: boolean,showCollapseButton?: boolean,) => ReactNode}
            // 默认是否收起
            // defaultCollapsed={true}
            // 是否收起
            // collapsed={false}
            // 收起按钮的事件
            // onCollapse(collapsed: boolean) => void;
            // 是否显示收起之后显示隐藏个数
            // showHiddenNum={false}
        />
    )
}
