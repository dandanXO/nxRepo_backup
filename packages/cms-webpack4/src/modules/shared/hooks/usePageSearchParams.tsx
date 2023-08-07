import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectSearchParams, setPathname, setSearchParams } from '../utils/searchParamsSlice';

interface usePageSearchParamsProps {
    searchListParams?: Record<string, any>;
}

const usePageSearchParams = (
    props: usePageSearchParamsProps,
): {
    setSearchList: React.Dispatch<unknown>;
    searchList: Record<string, any>;
    savePath: (pathname: string, nextPathname: string) => void;
} => {
    const { searchListParams } = props;

    const history = useHistory();
    const dispatch = useDispatch();
    const { pathname, searchParams = {} } = useSelector(selectSearchParams);

    const [searchList, setSearchList] = useState<Record<string, any>>({
        ...searchListParams,
        ...(history.location.pathname === pathname ? searchParams : {}),
    });

    const savePath = useCallback(
        (pathname, nextPathname) => {
            dispatch(setPathname({ pathname: pathname, nextPathname: nextPathname }));
            dispatch(setSearchParams(searchList));
        },
        [searchList],
    );

    return {
        setSearchList,
        searchList,
        savePath,
    };
};

export default usePageSearchParams;
