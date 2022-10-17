import {PageContainer, ProColumns} from "@ant-design/pro-components";
import React, {useEffect, useState} from "react";
import {Route} from "antd/es/breadcrumb/Breadcrumb";
import {AdminTable} from "./AdminTable";

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
    // Fetch
    loading: boolean;
    tableHeaderColumns:  ProColumns<TableListItemDataType, "text">[];
    tableDatasource: TableListItemDataType[];
    // Search
    searchable?: boolean;
    onSearchClick?: (props: any) => TableListItemDataType[];
    // hideInSearchColumnNames?: Array<string>;

}

// NOTICE: [TypeScript + React: Typing Generic forwardRefs](https://fettblog.eu/typescript-react-generic-forward-refs/)
const AdminPage = <TableListItemDataType,>(props: AdminTableTemplateProps<TableListItemDataType>, ref?: React.MutableRefObject<AdminTAbleTemplateRef> ) => {

    // NOTE: breadcrumb
    const itemRender = (route: Route, params: any, routes: Route[], paths: string[]): React.ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <span>{route.breadcrumbName}</span>
        );
    }

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
         <AdminTable
             tableHeaderColumns={props.tableHeaderColumns}
             loading={props.loading}
             tableDatasource={props.tableDatasource}
             onSearchClick={props.onSearchClick}
             setShowModalContent={setShowModalContent}
         />
            {showModalContent && props.modalContent && props.modalContent(showModalContent, setShowModalContent)}
        </PageContainer>
    )
}

const ForwardRefAdminPageTemplate = React.forwardRef(AdminPage);

export default ForwardRefAdminPageTemplate;
