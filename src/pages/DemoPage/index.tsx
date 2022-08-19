import {GetAttractionsALLResponseData, useGetAttractionsAllQuery} from "../../api";
import React from "react";
import Page from "../../core/components/Page";

export default () => {
    const { currentData, error, isLoading, isError, isFetching} = useGetAttractionsAllQuery({
        lang: "zh-tw",
        page: 1
    });
    // const [ trigger, {currentData, error, isLoading, isError, isFetching} ] = useLazyGetAttractionsAllQuery({
    //     // lang: "zh-tw",
    //     // page: 1
    // });
    // API.endpoints.getAttractionsAll.useQuery({
    //     lang: "zh-tw",
    //     page: 1
    // });

    // if(isLoading) return <div>isLoading</div>
    // if(isFetching) return <div>isFetching</div>

    if (isError) return (<div>An error has occurred!</div>)
    if (isFetching && !currentData) return (<div>isFetching</div>)

    return (
        <Page>
            {currentData
                ? currentData.data.map((data: GetAttractionsALLResponseData) => (
                    <div>
                        <div>{data.name}</div>
                        <div>{data.address}</div>
                    </div>
                ))
                : 'No data available'}
        </Page>

    )
}
