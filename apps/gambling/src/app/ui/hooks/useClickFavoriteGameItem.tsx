import { useState } from "react";
import { AppLocalStorageKey } from "../../persistant/AppLocalStorageKey";
import { AppLocalStorage } from "../../persistant/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import { GameItem } from "../components-bs/GameTypeSection";
import { appSlice } from "../../reduxStore/appSlice";

type TTotalFavoriteLocalState = {
  local: { [key: number]: number [] },
  localArr: {
    [key: number]: {
      gameId: number,
      name: string,
      img: string,
      label: string,
      type: string
    }[]
  }
}

export const useClickFavoriteGameItem = (props?: any) => {
  const { isLogin } = useSelector((state: RootState) => state.app);
  const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')

  const favoriteLocal = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocal) || '{}')
  const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocalArr) || '{}')
  const [totalFavoriteLocalState, setTotalFavoriteLocalState] = useState<TTotalFavoriteLocalState>({
    local: favoriteLocal,
    localArr: favoriteLocalArr
  })
  const dispatch = useDispatch();

  const userFavorite = totalFavoriteLocalState.local[userInfo?.user_id] || []

  const onClickFavoriteGameItem = (item: GameItem) => {
    if (!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      const userFavoriteArr = totalFavoriteLocalState.localArr[userInfo?.user_id] || []
      const isFavoriteID = userFavorite?.find((favorite: number) => favorite === Number(item.gameId))

      const newUserFavorite = isFavoriteID ?
        userFavorite.filter((favorite: number) => favorite !== isFavoriteID) :
        item.gameId ? [Number(item.gameId), ...userFavorite] : userFavorite
      const newTotalFavoriteLocal = { ...totalFavoriteLocalState.local, [userInfo.user_id]: newUserFavorite }

      const newUserFavoriteArr = isFavoriteID ?
        userFavoriteArr.filter((favorite: { gameId: number }) => favorite.gameId !== isFavoriteID) :
        item.gameId ? [{ gameId: Number(item.gameId), name: item.name || '', img: item.imageURL || '', label: item.label || '', type: item.type || '' }, ...userFavoriteArr] : userFavoriteArr
      const newTotalFavoriteLocalArr = { ...totalFavoriteLocalState.localArr, [userInfo.user_id]: newUserFavoriteArr }

      setTotalFavoriteLocalState({
        local: newTotalFavoriteLocal,
        localArr: newTotalFavoriteLocalArr
      })
      AppLocalStorage.setItem(AppLocalStorageKey.favoriteLocal, JSON.stringify(newTotalFavoriteLocal))
      AppLocalStorage.setItem(AppLocalStorageKey.favoriteLocalArr, JSON.stringify(newTotalFavoriteLocalArr))
    }
  }

  return {
    onClickFavoriteGameItem,
    userFavorite,
    totalFavoriteLocalState
  }
}
