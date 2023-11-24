import { useEffect, useState } from "react";
import { AppLocalStorageKey } from "../../persistant/AppLocalStorageKey";
import { AppLocalStorage } from "../../persistant/localstorage";
import { TTotalFavoriteLocalState } from "../pages/IndexPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import { GameItem } from "../components-bs/GameTypeSection";
import { appSlice } from "../../reduxStore/appSlice";

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
        item.gameId ? [...userFavorite, Number(item.gameId)] : userFavorite
      const newTotalFavoriteLocal = { ...totalFavoriteLocalState.local, [userInfo.user_id]: newUserFavorite }

      const newUserFavoriteArr = isFavoriteID ?
        userFavoriteArr.filter((favorite: { gameId: number }) => favorite.gameId !== isFavoriteID) :
        item.gameId ? [...userFavoriteArr, { gameId: Number(item.gameId), name: item.name || '', img: item.imageURL || '', label: item.label || '', type: item.type || '' }] : userFavoriteArr
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
    userFavorite
  }
}