import {PageContainer} from "@ant-design/pro-components";
import React from "react";
import {itemRender} from "../itemRender";


export interface AdminTableTemplateProps {
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
const AdminPage = (props: AdminTableTemplateProps) => {

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
                    itemRender: itemRender,
                    routes: [
                        {
                            // path: props.navigator.ancestor.path || "/#/",
                            path: props.navigator.ancestor.path || "/",
                            breadcrumbName: props.navigator.ancestor.breadcrumbName || '首页',
                        },
                        {
                            path: props.navigator.parent.path || null,
                            breadcrumbName: props.navigator.parent.breadcrumbName,
                        },
                        {
                            path: props.navigator.self.path || null,
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
