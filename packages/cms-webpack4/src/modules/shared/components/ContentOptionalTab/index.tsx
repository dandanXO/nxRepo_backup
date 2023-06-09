import React from "react";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";

interface IContentOptionalTabProps {
    items?: {
        render: React.FC<any>,
        key: string
    }[];
    dataHook?: { hook: UseQuery<any>, params?:any }
}

export const ContentOptionalTab = ({
    items, dataHook
}:IContentOptionalTabProps) => {

    let props = {}

    if(dataHook) {
        const { data, isFetching } = dataHook.hook(dataHook.params)
        if (isFetching) return null;
        props = data
    }


    return (
        <div style={{ margin: '16px' }}>
            {
                items?.map((part) => {
                    return <React.Fragment key={part.key}>{part.render(props)}</React.Fragment>
                })
            }
        </div>
    )
}
