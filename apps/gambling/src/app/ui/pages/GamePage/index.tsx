import {useEffect} from 'react';
import styled from 'styled-components';
import {LeftOutlined} from "@ant-design/icons";

import {useLocation, useNavigate} from "react-router";
import queryString from 'query-string';

import {useStartGameMutation} from '../../../external';
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import useBreakpoint from "../../hooks/useBreakpoint";
import {useDispatch} from "react-redux";
import {appSlice} from "../../../reduxStore/appSlice";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";

const BackButton = styled.div`
  left: 20px;
  top: 20px;
  z-index: 99;
  padding: 4px 10px;
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(60deg,#3378EE 0%,#0DE5FF 100%);
  position: absolute;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const GamePage = () => {
    useAllowLoginRouterRules();
    const location = useLocation();
    const { gameId, label } = queryString.parse(location.search) as { gameId: string, label: string };

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
      if(10000 < gameId && gameId < 20000) {
        return "ppmater";
      } else if(20000 < gameId && gameId < 30000) {
        return "jiligames"
      } else if(30000 < gameId && gameId < 40000) {
        return "pg";
      } else {
        return null;
      }
    }
    const {isMobile} = useBreakpoint();

    useEffect(() => {
        const gameID = Number(gameId);
        const gameBrand = getGameBrand(Number(gameId)) //urlParam[label as keyof typeof urlParam];
        if(gameBrand) {
          triggerStartGame({
            clientType: isMobile ? "mobile" : "pc",
            exitStatus: 0,
            gameId: gameID,
            gameBrand: gameBrand
          })
        } else {
          alert("Game Brand is error")
        }
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {updateBalance} = useAutoUpdateBalance();
    return (
        <>
          <BackButton
            onClick={() => {
              updateBalance();
              navigate(PageOrModalPathEnum.IndexPage);
            }}
            className={"fixed top-[10px] left-[10px] p-4 text-white flex flex-row justify-center items-center"}>
            <LeftOutlined className={"mr-1text-white text-base relative top-[-2px] left-[-3px]"}/>
            <div>Retornar</div>
          </BackButton>

          {data !== undefined && (
            <iframe className={`w-full h-full`} src={data.link} />
          )}
        </>
    );
};
