import styled from "styled-components";
import useBreakpoint from "../../hooks/useBreakpoint";
import {DesktopGameItem, MobileGameItem} from "./GameItem";
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
const MobileGameTypeHeader = (props: {
  gameTypeName: string;
  onClick?: () => void;
}) => {
  return (
      <header className={"flex flex-row mb-3 relative tab-item-title-box"}>
        <img src={`assets/${environment.assetPrefix}/ic_game.png`} />
        <span className={"text-3xl text-semibold text-white"}>{props.gameTypeName}</span>
        <div className={"flex-grow"}></div>
        {props?.onClick && (
            <span className={"text-xl text-main-primary-main mt-2"} onClick={props?.onClick}>
      {'Tudo'}
    </span>
        )}
      </header>

  )
}

const GameTypeHeader = (props: {
  gameTypeName: string;
  count?: number;
  onClick?: () => void;
  isViewAll?: boolean;
  setViewType?:Dispatch<SetStateAction<string>>;
}) => {
  const {isMobile} = useBreakpoint();
  return (
    <header className={"flex flex-row justify-between mb-3 relative"}>
      <span className={"flex flex-row items-center"}>
        {props.isViewAll && <div onClick={()=>{ props?.setViewType && props?.setViewType('')}}>
          <img data-v-ddc8133e="" className="backSlots w-[24px] h-[24px] mr-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAAAXNSR0IArs4c6QAAB91JREFUaEPtmXuMXFUdx7+/M687M7t1odsNrUYRQlJhY6tiAolplT8wEF3WBCuPlABpoFEKVExUok1j6gOjS3yCVsAWEcEE5BFJ7Q4ErUSjxBSoWrEkEjQhYO3sdKZ35t57fubcx9xnd+/szt3ulE7SbNI9+zvnc36v7+8M4S36obcoN06BZ+n59pt4j8moV1fgP1nu04vtTD0+8xqWUwm/kowPgUgy0ddHRuWXejlgVmszA3egadpirGUCGAATmMHnjo7i71kBpbWbCbiCZgUNrFUHkQra/SfBl52xAo+nPWBW6/oOrqCtEk0zsNYDDoGTmHz7qPVYVkBp7fYVXEGbJZqWAeiup91wlxCT7zyZwGdmsNxoO+HtwTIRpMrqLjRBgibffbKAK+i2QdNSOtDB0LbhAzmOkwVcQesudBfQhmUwKFDUvAJHk+cMusdfm8HygkHTlutpJ6R9D4c970YC0+TqQQZX0HkPmhRUgne7ue14274IQZPnnTagVV2Fd6NNNUm0plvIYv3aFiyxUKccvmax2GPC/Nf7RvAqOfe16J+e25nyNAyqSfahQ/06AOt4WZGx8zMSASActUB/YcZzEPjN0NvMfecROotxCz2BK2h2oUP5qwATvKtgu8rNTod4BKjLcP7frg11gB/hPO1aN2w+m+UFpAZX0NKkmiVdTyflbxDMjeFoewtW/uDvEi7yBc6Lb+6rdh7c7tTLvn5SgSto06SaVNDKQ+znb8yLCtj9fbJkdULfqQ3hHm+vj6aDoBctmbv10hH96X6SzwmuoA1T1KTEmqSD+XnsVu6EkI/K1jTA/oXatYEl4169Y9y6YQxH+3EBs4IfOICidoZ4TgIf8KerrhDxczaSv6G1gRwOhX0gcsJh7kZBkk3CSyiKyU9o7UMLhZ8V/NDh3JUW88/jB3NUWbCgxXLZFTMxCeu1vRhYJOyPEzmS8CYEXbRhqPPiQuBnBT94JLdJWrzTCc1AXsZaVqRau4UtsYoHOoBXsULi53jAXuG0L0y8IYjXXzHc+dt84WcP9TpOhyleksDKYB+Ohn0w9xPzN9LuooXteLXDjhZ1Eax++srQfc05WBrqnL+B5pfzcxa3vx4ujhtkKsEyltia7AO5AiXSp22PBkLa69eh9ZEqHmpx9umStb8bTT+7flln43y8Pie4Mrr/cHHcJKsmGWPd8EwI52jx8lIkWKG7U9sswI6nffHj9/5wKwURmzlad2NZ39crfCpwZfRPjeK4tBS88nzYw+GnJT/fg60udPhAZMSLYtIoG1B93ZHX3UfgD5urnQszA/fgOy58Gska6vGzSNaYFggpwASZGxQ+KnKEvOCmivHHXuBTe9wz+vtGcdy0ZE3CCfvgdHY80NALDOF1i6nlaHSuAFRlQlUyKHF+j019bkQELhKEu26utj+dKbgy/kyjOG5JWWNGoOA5B/KqsD98BGZxVaryYuLyavuJ4CGfYFSO1AurOU+rwbTeAiYt8JjzguNqhlA7i0YBvfHZIX0sc3C1wZ5GcRxSxqt9rIqHD6nAPxUBjx74YUax3tSuluAdkrEqqt/jaUbI53D2Vk1/JS18z6EeNKzgTWal48eSxlKn33ovrU5bohxNXDUHuLfHD4/gNBRKD1iMS+IK0BVVXrFjcdUXh449uCjgapMnXXgV9vFJLT6BcY4mrkkJruz/iFFot0qPxeCjr7cCX769rO9YNHC10SON4jgrz6uC1x1Z3ZzvfnXkjpyCJq7rAVzZv5MxYrW0AwysYvudPkHUEE1tqxy7bVHBPXiDuWbBUXjRCc2RnYCYB7iyf8cxbSNL7I5NiW5NAeG+7WX9+kUHVxv+QoU9uMZMfthH+jcJmtjUo8eV7RsYhTOPaa9Ixju6+R4YaEDY9ZWyfu0JAVeb7lYKT8EjAB/oxRA0sXke4Mr2jlb5OxJ8s/9G539pAYGpr2onINSDN63gDVDNgurz/uFsnS8w8Zl5gm9rli4hol/7w47/6gPiG7+h6T8+YR73Nv6JCnsiW+QEWx1IfnBL1fhz2gMG121vVlaZJP/tfTUVtGvmxNqpYnN/WrsL6uNzbXKXUniC9tgiRC0mPHlLtf3xuf5utt/frlfqUvKysKih17+ttVa6X+akMp8puDrBVB2ni6J2KUv+X73SfmqhT8Wf18uHJOMsr8CpPZjo+3dqrS2piN1FmYP3cpg0az+nV/Yz83udVxv1lM3gHJ3/3WLr+TR/760ZOPCteuV5Zn5/1+Mkfvc9rbmuF2gn6wbsc4te/qcEne0JGYAu/oHW3NsrxkCBKxFTbFeaDBRsjwvsvbvYurhX6IHz+E2GdpFliZoz97POxfyandT4x0kPvrlTnZKStzqtkb6ws9S8Yz7QA+XxTzLKI53KIQZWMtHeewrNj/bSt6MXNDA5vsmo3iYlf4tBL1vt5oW7l+G/8/X2wHj8Bq6sNA16QTIMsLn+p1r75YVADwT4hxn5M81qTVp8Tr6U+8i91Di4UOilD84Q1xhDdzP4AhSsj91P+qv9gF7S4Kpnt4zqLgCdmXpzy+Mr0OgX9JIFv7o9dC6It4HFQw+UGo/2E3hJavUreXg0b1mXSSlKhwtH73mK0M4Cekl4/FqGZmL4XQRr2DLFsJE/+ttfEqysgJeGxxliI1C+n9DMGnRgBUy/L2ZglNsp8D7dwCmP9+kiB8bM/wE7pyqKBkniygAAAABJRU5ErkJggg==" alt=""></img>
        </div>}
        <img className="w-[36px] h-[30px] mr-4" alt={"map"} src={`assets/${environment.assetPrefix}/ic_game.png`}/>
        <span className={"text-xl font-bold text-white font-[ERASBD]"}>{props.gameTypeName}</span>
      </span>

      {!props.isViewAll && <div>
        {isMobile ? (
          <button onClick={props.onClick} className={"text-xl text-transparent"}>Tudo</button>
        ) : (
          <button onClick={props.onClick} className={"rounded-2xl border-[1px] border-main-primary-main px-4 pt-[5px] pb-[2px] text-main-primary-main text-sm !font-bold font-[ERASBD]"}>Ver todos {props?.count}</button>
        )}
      </div>}

    </header>
  )
}

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
const MobileGameList = styled.div`
  //display: grid;
  //grid-template-columns: repeat(3, 1fr);
  //grid-template-rows: repeat(auto, 300px);
  //grid-template-rows: repeat(auto-fill, 200px);
  //grid-row-gap: 20px;
  //grid-column-gap: 20px;
  //gap: 0px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: repeat(auto-fill, 150px);
  gap: 16px;
  margin-top: 15px;
`
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
        "flex flex-row flex-wrap justify-start items-center": !isMobile,
        'animate-[gameListShow_0.8s_ease]':animating && isMobile
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
