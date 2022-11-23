
import React, { useCallback, useEffect, useState } from "react";
import { setSearchParams, setPathname, selectSearchParams, setSelectedRow } from '../utils/searchParamsSlice';
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

interface usePageSearchParamsProps {
    // pathname?: string;
    // previousPathname?: string;
    searchListParams?: {}
    // selectedRowParams?: [];
    // setSearchList?: React.Dispatch<React.SetStateAction<Object>>;
    // id?: string | number;
    // type?: any
}


const usePageSearchParams = (props: usePageSearchParamsProps) => {

    const { searchListParams } = props

    const dispatch = useDispatch();
    const { searchParams = {}, selectedRow = [] } = useSelector(selectSearchParams);

    const [searchList, setSearchList] = useState<any>(searchListParams);
    const [selectedList, setSelectedList] = useState([]);
    useEffect(() => {
        setSearchList(Object.keys(searchParams).length > 0 ? searchParams : searchListParams);
        setSelectedList(selectedRow.length > 0 ? selectedRow : selectedList);
    }, [searchParams, selectedRow])


    const handleToDetailPage = (pathname, previousPathname, selectedRowParams) => {
        dispatch(setPathname({ pathname: pathname, previousPathname: previousPathname }));
        dispatch(setSearchParams(searchList));
        selectedRowParams && dispatch(setSelectedRow(selectedRowParams));
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