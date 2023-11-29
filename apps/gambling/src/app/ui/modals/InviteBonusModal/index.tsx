import {EarnButton} from "../../components/Buttons/EarnButton";
import {InviteButton} from "../../components/Buttons/InviteButton";

import {Description} from "./Description";
import {Container} from "./container";
import {Item} from "./item";
import {useLazyGetInviteConfigQuery} from "../../../external";
import {useEffect, useState} from "react";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import { useInviteConfig } from "../../hooks/useInviteConfig";
import {CloseICON} from "../../components/Icons/CloseICON";

type IConfigItem = {
  num: string;
  reward: string;
}
export type IInitialChargeModal = {
  close: () => void;
  onConfirm: () => void;
}

export const InviteBonusModal = (props: IInitialChargeModal) => {
  const { currentConfig } = useInviteConfig();

  return (
    <div
      className={"z-[1002] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"}
      onClick={(event) => {
        props.close();
      }}
    >

      <Container
        className={""}
        onClick={(event: any) => {
          event.stopPropagation();
        }}
      >
        <div className={"flex flex-row justify-end mb-2 absolute right-[10px] top-[18px]"}>
          <div
            onClick={() => {
              props.close();
            }}
          >
            <CloseICON/>
          </div>
        </div>

        {/*<img alt="title" className={"w-[269px] h-[16px]"} src={`assets/${environment.assetPrefix}/Convite de recompensa.png`}/>*/}
        {/*<img alt="title" className={"w-[269px]"} src={`assets/${environment.assetPrefix}/Convite de recompensa.png`}/>*/}
        <div className={"text-2xl font-extrabold text-[var(--text-popup)] mt-4 mb-2"}>Convite Recompensa</div>

        <div className={"mb-2"}>
          <Description/>
        </div>

        <div className={"w-full"}>
          {/*{currentData?.data.map(() => {*/}

          {/*})}*/}
          <div className={"flex flex-col w-full mb-2"}>
            {currentConfig?.map((item, index) => {
              if(currentConfig.length - 1 !== index) {
                // NOTICE: 型別遺失 這個沒有寫 number 沒有被檢測到要number, money={Number(item.reward)}
                return (
                  <Item key={index} title={`Convidar ${item.num}-${Number(currentConfig[index + 1]?.num) - 1}`} money={(Number(item.reward)/100)}/>
                )
              } else {
                return (
                  <Item key={index} title={`Convidar > ${item.num}`} money={Number(item.reward)/100}/>
                )
              }
            })}
          </div>

          <div className={"flex flex-row justify-between items-center text-sm"}>
            <EarnButton className={"text-sm font-bold"} onClick={()=>props.close()}>Ganhar dinheiro</EarnButton>
            <InviteButton className={"text-sm font-bold"} onClick={() => props.onConfirm()}>Convide agora</InviteButton>
          </div>

        </div>

      </Container>
    </div>
  )
}

