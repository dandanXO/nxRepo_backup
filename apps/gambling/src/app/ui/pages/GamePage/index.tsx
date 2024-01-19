import {ReactDOM, useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import {LeftOutlined} from "@ant-design/icons";

import {useLocation, useNavigate} from "react-router";
import queryString from 'query-string';

import {useStartGameMutation} from '../../../external';
import {useAllowLoginRouterRules} from "../../router/hooks/useAllowLoginRouterRules";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import {usePageNavigate} from "../../router/hooks/usePageNavigate";
import {GameBackNavigation} from "../../components-bs/BackNavigation/GameBackNavigation";
import { LeaveGameConfirmModal } from "../../modals/LeaveGameConfirmModal";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import {appSlice} from "../../../reduxStore/appSlice";
import {useDispatch} from "react-redux";

export const GamePage = () => {
    useAllowLoginRouterRules();

    const [closeGame, setCloseGame]= useState(false);

    const location = useLocation();
    const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
    const favoriteLocal = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocal) || '{}')
    const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocalArr) || '{}')
    const { gameId, label, gameName } = queryString.parse(location.search) as { gameId: string, label: string, gameName: string };
    const [triggerStartGame, { data, isLoading, isSuccess, isError }] = useStartGameMutation();
    // const urlParam = {
    //     "Fishing": "jiligames",
    //     "viver": "ppmater",
    //     "vivo": "ppmater",
    //     "PG-Slots": "pg",
    //     "PP-Slots": "ppmater",
    //     "CQ9-Slots": "cq9",
    //     "JILI-Slots": "jiligames",
    //     "FC-Slots": "fc",
    // }

    const getGameBrand = (gameId: number): string | null => {
        // NOTE: 先写死，待后端开单一启动游戏API
        // 0-100 cc
        // 30000-40000 pg2 pgsoft2
        // 40000-50000 pp
        // 50000-54000 pg2 pgsoft2
        // 60000-61000 pp2 ppplay2
        // 61000-62000 pp2_vivo ppplay
        // 62000-63000 pp2_viver ??
        // 63000-64000 pp2 ppplay2
        // 80000-81000 jili jiligames
        // 100000-101000 JDB jdb
        // 110000-111000 FC fc
        // 130000-131000 CQ9 cq9
        // 140000-131000 CQ9 oneapi
        // 160001-169999 pggame
        if (30000 <= gameId && gameId < 40000) {
          return "pg";
        }else if (40000 <= gameId && gameId < 50000) {
          return "pp";
        }else if (50000 <= gameId && gameId < 54000) {
            return "pg";
        } else if(60000 <= gameId && gameId < 61000) {
            return "pp";
        } else if(61000 <= gameId && gameId < 62000) {
            return "pp";
        } else if(62000 <= gameId && gameId < 63000) {
            return "pp";
        } else if(63000 <= gameId && gameId < 64000) {
            return "pp";
        } else if(80000 <= gameId && gameId < 81000) {
            return "jiligames";
        } else if(100000 <= gameId && gameId < 101000) {
            return "jdb";
        } else if(110000 <= gameId && gameId < 111000) {
            return "fc";
        } else if (130000 <= gameId && gameId < 131000) {
            return "cq9";
        } else if (140000 <= gameId && gameId < 141000) {
            return "oneapi";
        } else if(150000 <= gameId && gameId < 151000) {
            return "pgapi";
        } else if(160001 <= gameId && gameId < 169999) {
          return "pggame";
        } else {
            return null;
        }
    }
    const {isMobile} = useBreakpoint();

    useEffect(() => {
        dispatch(appSlice.actions.setIsUILoading(true));
        const gameID = Number(gameId);
        const gameBrand = getGameBrand(Number(gameId)) //urlParam[label as keyof typeof urlParam];
        if(gameBrand) {
          triggerStartGame({
            clientType: isMobile ? "mobile" : "pc",
            exitStatus: 0,
            gameId: gameID,
            gameBrand: gameBrand
          }).finally(() => {
            dispatch(appSlice.actions.setIsUILoading(false));
          })
        } else {
          alert("Game Brand is error")
        }
    }, []);

    const {onClickToIndex} = usePageNavigate();

    const onConfirmClose = (addFavorite: boolean) => {
      if(addFavorite) {
        const userFavorite = favoriteLocal[userInfo.user_id] || []
        const userFavoriteArr = favoriteLocalArr[userInfo.user_id] || []
        if(userFavorite.find((favorite: number) => favorite === Number(gameId))) {
          onClickToIndex()
        } else {
          const newUserFavorite = [Number(gameId), ...userFavorite]
          const newLocalFavorite = { ...favoriteLocal, [userInfo.user_id]: newUserFavorite }

          const newUserFavoriteArr = [ {gameId: Number(gameId),name: gameName, img: '', label:  '', type:  ''}, ...userFavoriteArr]
          const newLocalFavoriteArr = { ...favoriteLocalArr, [userInfo.user_id]: newUserFavoriteArr}

          AppLocalStorage.setItem(AppLocalStorageKey.favoriteLocal, JSON.stringify(newLocalFavorite))
          AppLocalStorage.setItem(AppLocalStorageKey.favoriteLocalArr, JSON.stringify(newLocalFavoriteArr))
          onClickToIndex()
        }
      } else {
        onClickToIndex();
      }
    }

    const dispatch = useDispatch();

    // const onIframeLoadStart = () => {
      // dispatch(appSlice.actions.setIsUILoading(true));
    // }
    // const onIframeLoad = () => {
    //   dispatch(appSlice.actions.setIsUILoading(false));
    // }

    const htmlRef = useRef();
    useEffect(() => {
      if (data?.startType === "HTML" && data.htmlContent) {
        if(htmlRef && htmlRef.current) {
          const iframe = htmlRef.current as HTMLIFrameElement;
          if(iframe?.contentWindow && iframe?.contentWindow?.document) {
            iframe.contentWindow.document.write(data.htmlContent);
          }
        }
      }
    }, [htmlRef.current, data?.htmlContent])

    return (
        <>
          {
            !closeGame && (
              <GameBackNavigation className="h-[40px] md:h-[52px] lg:h-[56px]" onClick={() => setCloseGame(true)} />
            )
          }
          {
            closeGame && (
              <LeaveGameConfirmModal
                onConfirm={onConfirmClose}
                onClose={()=>{
                  setCloseGame(false)
                  dispatch(appSlice.actions.setIsUILoading(false));
                }}
              />
            )
          }
          {data !== undefined && data.startType === "LINK" && (
            <iframe
              className={`w-[100vw] h-[calc(100%-40px)] md:h-[calc(100%-52px)] lg:h-[calc(100%-56px)] relative top-[40px] md:top-[52px] lg:top-[56px]`}
              src={data.link}
              // onLoadStart={onIframeLoadStart}
              // onLoad={onIframeLoad}
            />
          )}

          {data !== undefined && data.startType === "HTML" && data.htmlContent && (
            <iframe
              id="game-iframe"
              ref={htmlRef as any}
              className={`w-full h-full`}
            />
          )}
        </>
    );
};
