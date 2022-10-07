import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import React, {forwardRef, useEffect, useMemo, useRef, useState} from "react";
import {Button, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Route} from "antd/es/breadcrumb/Breadcrumb";

// Redecalare forwardRef
declare module "react" {
    function forwardRef<T, P = {}>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export interface ModalContent {
    show: boolean;
    isEdit: boolean;
}
export interface AdminTAbleTemplateRef {
    setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>
    showModalContent: ModalContent;
}
export interface AdminTableTemplateProps<TableListItemDataType> {
    navigator: {
        parent: {
            path: string;
            breadcrumbName: string;
        },
        ancestor: {
            path: string;
            breadcrumbName: string;
        },
        self: {
            path: string;
            breadcrumbName: string;
        }
    },
    modalContent?: (showModalContent: ModalContent, setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>) => React.ReactElement;
    tableHeaderColumns:  ProColumns<TableListItemDataType, "text">[];
    tableDatasource: TableListItemDataType[];
    // Search
    searchable?: boolean;
    onSearchClick?: (props: any) => TableListItemDataType[];
    // hideInSearchColumnNames?: Array<string>;

}

enum ButtonsText {
    SearchText= "查詢",
    ResetText = "重置",
    AddText = "添加",
}

// NOTICE: [TypeScript + React: Typing Generic forwardRefs](https://fettblog.eu/typescript-react-generic-forward-refs/)
const AdminPageTemplate = <TableListItemDataType,>(props: AdminTableTemplateProps<TableListItemDataType>, ref?: React.MutableRefObject<AdminTAbleTemplateRef> ) => {

    // NOTE: breadcrumb
    const itemRender = (route: Route, params: any, routes: Route[], paths: string[]): React.ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <span>{route.breadcrumbName}</span>
        );
    }

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

    // NOTE: actionRef
    // const actionRef = useRef<ActionType>();

    // NOTE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTE: ref
    useEffect(() => {
        // NOTICE: [TypeScript + React: Typing Generic forwardRefs](https://fettblog.eu/typescript-react-generic-forward-refs/)
        if(ref) {
            ref.current = {
                showModalContent,
                setShowModalContent,
            }
        }
    })
    return(
        <PageContainer
            // loading
            header={{
                ghost: true,
                breadcrumb: {
                    itemRender,
                    routes: [
                        {
                            path: props.navigator.ancestor.path || "/#/",
                            breadcrumbName: props.navigator.ancestor.breadcrumbName || '首页',
                        },
                        {
                            path: props.navigator.parent.path,
                            breadcrumbName: props.navigator.parent.breadcrumbName,
                        },
                        {
                            path: props.navigator.self.path,
                            breadcrumbName: props.navigator.self.breadcrumbName,
                        },
                    ],
                },
            }}
        >
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
                            setShowModalContent({
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

            />
            {showModalContent && props.modalContent && props.modalContent(showModalContent, setShowModalContent)}
        </PageContainer>
    )
}

const ForwardRefAdminPageTemplate = React.forwardRef(AdminPageTemplate);

export default ForwardRefAdminPageTemplate;
