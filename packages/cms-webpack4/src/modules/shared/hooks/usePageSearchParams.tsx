
import React, { useCallback, useEffect, useState } from "react";
import { setSearchParams, setPathname, selectSearchParams, setSelectedRow } from '../utils/searchParamsSlice';
import { useDispatch, useSelector } from "react-redux"
import {RootState} from "../store";

interface usePageSearchParamsProps {
    searchListParams?: {}
}

const usePageSearchParams = (props: usePageSearchParamsProps) => {
    const dispatch = useDispatch();

    const { searchListParams } = props
    const { searchParams = {}, selectedRow = [] } = useSelector((state: RootState) => state.searchParams);

    const [searchList, setSearchList] = useState<any>(searchListParams);
    const [selectedList, setSelectedList] = useState([]);

    useEffect(() => {
        setSearchList(Object.keys(searchParams).length > 0 ? searchParams : searchListParams);
        setSelectedList(selectedRow.length > 0 ? selectedRow : selectedList);
    }, [searchParams, selectedRow])


    const handleToDetailPage = (pathname, previousPathname, selectedRowParams = []) => {
        dispatch(setPathname({ pathname: pathname, previousPathname: previousPathname }));
        dispatch(setSearchParams(searchList));
        dispatch(setSelectedRow(selectedRowParams));
    }

    return {
        searchList,
        setSearchList,
        handleToDetailPage,
        searchParams,
        selectedList,
        setSelectedList

    }
}

export default usePageSearchParams
