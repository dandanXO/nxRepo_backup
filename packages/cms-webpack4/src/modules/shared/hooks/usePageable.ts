import { useGetChannelListQuery } from "../api/channelListApi";
import { useEffect, useState } from "react";

const usePageable = (data, onChangeFunction, params) => {
    console.log(data, onChangeFunction, params)

    const pageOnChange = (current, pageSize) => {
        onChangeFunction({ ...params, pageNum: current, pageSize: pageSize })
    }

    const pageable = {
        showSizeChanger: true,
        defaultPageSize: 10,
        total: data?.totalRecords,
        current: data?.records?.length === 0 ? 0 : data.currentPage,
        onChange: pageOnChange
    }

    return { pageable }
}

export default usePageable;
