import { useState } from 'react';


function useFavoriteList({ userID, pathname }) {

    const pathName = pathname.includes("today") ? "today" : pathname.includes("overdue") ? "overdue" : pathname;
    const [favoriteList, setFavorite] = useState(JSON.parse(localStorage.getItem(`${userID}-${pathName}`)) || [])

    const handleAddFavorite = (favorite, list) => {

        const newList = [...favoriteList, { name: favorite, list }];
        localStorage.setItem(`${userID}-${pathName}`, JSON.stringify(newList));
        setFavorite(newList)
    }
    const handleRemoveFavorite = (e, favorite) => {
        e.preventDefault();
        const favoriteIndex = favoriteList.findIndex(list => list.name === favorite.name && list.list === favorite.list);
        favoriteList.splice(favoriteIndex, 1);
        localStorage.setItem(`${userID}-${pathName}`, JSON.stringify([...favoriteList]));
        setFavorite([...favoriteList])

    }
    return { favoriteList, handleAddFavorite, handleRemoveFavorite }

}

export default useFavoriteList;
