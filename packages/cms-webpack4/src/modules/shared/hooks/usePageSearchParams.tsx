import React, { useEffect, useState } from "react";
import { setSearchParams, setPathname, selectSearchParams, setSelectedRow } from '../utils/searchParamsSlice';
import { useDispatch, useSelector } from "react-redux";
import { Key } from "antd/es/table/interface";

interface usePageSearchParamsProps {
    searchListParams?: unknown
}

const usePageSearchParams = (props: usePageSearchParamsProps): {
    searchList: Record<any, any>,
    setSearchList: React.Dispatch<unknown>,
    handleToDetailPage: (pathname: string, previousPathname: string, selectedRowParams?: Array<unknown>) => void,
    searchParams: Record<any, any>,
    selectedList: string[],
    setSelectedList: React.Dispatch<Key[]>
} => {

    const { searchListParams } = props;

    const dispatch = useDispatch();
    const { searchParams = {}, selectedRow = [] } = useSelector(selectSearchParams);

    const [searchList, setSearchList] = useState<unknown>(searchListParams);
    const [selectedList, setSelectedList] = useState([]);
    useEffect(() => {
        setSearchList(Object.keys(searchParams).length > 0 ? searchParams : searchListParams);
        setSelectedList(selectedRow.length > 0 ? selectedRow : selectedList);
    }, [searchParams, selectedRow]);


    const handleToDetailPage = (pathname, previousPathname, selectedRowParams = []) => {
        dispatch(setPathname({ pathname: pathname, previousPathname: previousPathname }));
        dispatch(setSearchParams(searchList));
        dispatch(setSelectedRow(selectedRowParams));
    };

    return {
        searchList,
        setSearchList,
        handleToDetailPage,
        searchParams,
        selectedList,
        setSelectedList

    };
};

export default usePageSearchParams;
