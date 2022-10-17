import {PageContainer} from "@ant-design/pro-components";
import React from "react";
import {Route} from "antd/es/breadcrumb/Breadcrumb";


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
    // modalContent?: (showModalContent: ModalContent, setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>) => React.ReactElement;
    // Fetch
    // loading: boolean;
    // tableDatasource: TableListItemDataType[];
    // Search
    // searchable?: boolean;
    // onSearchClick?: (props: any) => TableListItemDataType[];
    // hideInSearchColumnNames?: Array<string>;

    // setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>
    // showModalContent: ModalContent;
    children: React.ReactElement;
}

// NOTICE: [TypeScript + React: Typing Generic forwardRefs](https://fettblog.eu/typescript-react-generic-forward-refs/)
const AdminPage = <TableListItemDataType,>(props: AdminTableTemplateProps<TableListItemDataType>) => {

    // NOTE: breadcrumb
    const itemRender = (route: Route, params: any, routes: Route[], paths: string[]): React.ReactNode => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <span>{route.breadcrumbName}</span>
        );
    }

    // // NOTE: Modal
    // const [showModalContent, setShowModalContent] = useState<ModalContent>({
    //     show: false,
    //     isEdit: false,
    // });

    return(
        <PageContainer
            // loading={props.loading}
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
            {props.children}
        </PageContainer>
    )
}

export default AdminPage;
