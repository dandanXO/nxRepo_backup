import { useGetChannelListQuery } from "../api/channelListApi";
import { useEffect, useState } from "react";

const usePageable = (data) => {
console.log(data)
    const pageable = {
        showSizeChanger: true,
        defaultPageSize: 10,
        total: data?.totalRecords,
        current: data?.records?.length === 0 ? 0 : data.currentPage,
    }

    return { pageable }
}

export default usePageable;
