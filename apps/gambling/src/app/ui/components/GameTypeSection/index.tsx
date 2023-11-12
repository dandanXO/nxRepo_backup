import useBreakpoint from "../../hooks/useBreakpoint";
import {DesktopGameItem} from "./GameItem";
import {MobileGameItem} from "./MobileGameItem";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {appSlice} from "../../../reduxStore/appSlice";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {TTotalFavoriteLocalState} from "../../pages/IndexPage";
import cx from "classnames";
import {environment} from "../../../../environments/environment"
import {MobileGameList} from "./MobileGameList";
import {GameList} from "./GameList";
import {MobileGameTypeHeader} from "./MobileGameTypeHeader";
import {GameTypeHeader} from "./GameTypeHeader";

type GameItem = {
  name: string;
  imageURL?: string;
  gameId?: string;
  label?:string;
  type?:string;
}
export type IGameTypeSectionList = {
  gameTypeName: string;
  data?: GameItem[]
  onClick?: () => void;
  isViewAll?: boolean;
  totalFavoriteLocalState: TTotalFavoriteLocalState
  setTotalFavoriteLocalState: Dispatch<SetStateAction<TTotalFavoriteLocalState>>;
  setViewType?:Dispatch<SetStateAction<string>>;
}


export const GameTypeSectionList = (props: IGameTypeSectionList) => {
  const userInfo = JSON.parse(AppLocalStorage.getItem('userInfo') || '{}')
  const { totalFavoriteLocalState, setTotalFavoriteLocalState } = props;

  const {isMobile} = useBreakpoint();

  const MainGameList = isMobile ? MobileGameList : GameList
  const MainGameItem = isMobile ? MobileGameItem : DesktopGameItem

  const [listSize, setListSize] = useState(15);
  const displayedItems = props?.data && props?.data.slice(0, listSize);

  const loadMore = () => {
    setListSize(listSize + 10); // 每次點擊按鈕增加10筆
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  const onClickGameItem = (item: GameItem) => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(`${PageOrModalPathEnum.GamePage}?gameId=${item.gameId}&label=${item.type === "null" ? item.label : item.type}`)
    }
  }

  const onClickFavoriteGameItem = (item: GameItem) => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      const userFavorite = totalFavoriteLocalState.local[userInfo.user_id] || []
      const userFavoriteArr = totalFavoriteLocalState.localArr[userInfo.user_id] || []
      const isFavoriteID = userFavorite?.find((favorite:number) => favorite === Number(item.gameId))

      const newUserFavorite = isFavoriteID ?
        userFavorite.filter((favorite:number) => favorite !== isFavoriteID):
        item.gameId ? [...userFavorite, Number(item.gameId)]: userFavorite
      const newTotalFavoriteLocal = { ...totalFavoriteLocalState.local, [userInfo.user_id]: newUserFavorite }

      const newUserFavoriteArr = isFavoriteID ?
        userFavoriteArr.filter((favorite: { gameId: number }) => favorite.gameId !== isFavoriteID):
        item.gameId ? [...userFavoriteArr, { gameId: Number(item.gameId),name: item.name || '', img: item.imageURL || '', label: item.label || '', type: item.type || '' }]: userFavoriteArr
      const newTotalFavoriteLocalArr = { ...totalFavoriteLocalState.localArr, [userInfo.user_id]: newUserFavoriteArr }

      setTotalFavoriteLocalState({
        local: newTotalFavoriteLocal,
        localArr: newTotalFavoriteLocalArr
      })
      AppLocalStorage.setItem('favoriteLocal', JSON.stringify(newTotalFavoriteLocal))
      AppLocalStorage.setItem('favoriteLocalArr', JSON.stringify(newTotalFavoriteLocalArr))
    }
  }

  const [animating, setAnimating] = useState(true)
  useEffect(() => {
    setAnimating(true)
  }, [props.gameTypeName])

  useEffect(() => {
    if (animating) {
      setTimeout(() => {
        setAnimating(false)
      }, 800)
    }
  }, [animating])


  return (
    <section className={"flex flex-col mb-4"}>

      {props.gameTypeName ==='null' ? <div></div> : isMobile ? (
        <MobileGameTypeHeader key={props.gameTypeName} gameTypeName={props.gameTypeName} onClick={props.onClick}/>
      ): (
        <GameTypeHeader key={props.gameTypeName} gameTypeName={props.gameTypeName} count={props.data?.length} onClick={props.onClick} isViewAll={props.isViewAll} setViewType={props.setViewType}/>
      )}

      <MainGameList
        className={cx("list", {
          'animate-[gameListShow_0.8s_ease]':animating && isMobile,
          "flex flex-row flex-wrap justify-start items-center": !isMobile
        })}
      >
        {displayedItems && displayedItems.map((item, index) => {
          return (
            <MainGameItem
              key={index}
              name={item.name}
              imageURL={`${environment.s3URLImages}/${item.gameId}.jpg`}
              onClick={() => onClickGameItem(item)}
              favorite={(totalFavoriteLocalState.local[userInfo.user_id] || []).includes(Number(item.gameId))}
              onClickFavorite={() => onClickFavoriteGameItem(item)}
            />
          )
        })}
      </MainGameList>

      {props.data && listSize < props.data?.length &&
        <div className="flex-1 mt-2">
          <button onClick={loadMore}
                  className="text-main-primary-varient bg-gradient-to-b from-[var(--btn-gradient1-from)] to-[var(--btn-gradient1-to)] py-1.5 px-6 rounded-2xl font-bold">
            Ver mais
          </button>
        </div>
      }
    </section>
  )
}