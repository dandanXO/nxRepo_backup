import { useEffect, useState,  } from "react";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";
import { useSelector } from 'react-redux';
import {RootState} from "../../../../../reduxStore";

import { environment } from "../../../../../../environments/environment";
import { TabItem, Tabs } from "../../../../components-bs/TabItem/TabItem";
import { PageContainer } from "../../../../components-bs/PageContainer";
import {BoxHowToImage} from "../../HowToInviteTabSection/env/u1/HowToImageContainer"
import cx from "classnames";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { IInvitePage } from "../..";
import { twMerge } from "tailwind-merge";
import Modal  from "./boxSearchModal";

import {
  useGetBoxInfoMutation,
  useLazyGetBoxReceiveQuery
} from "../../../../../external";
const BoxSection = (props:{openModal:()=>void}) =>{
  const [triggerGetBoxInfo, {data:boxInfoRes}] = useGetBoxInfoMutation();
  const [triggerGetBoxReceive] = useLazyGetBoxReceiveQuery()
  useEffect(()=>{
    triggerGetBoxInfo({token: localStorage.getItem(localStorage.token) || ''})
  }, [])
  
  const handleOpenBox = (receiveFlag: number, number: number) => {
    //2可以領但是還沒領  才打api
    if(receiveFlag === 2){  
      triggerGetBoxReceive({number}).then(res=>{
        if(res.data){
          triggerGetBoxInfo({token: localStorage.getItem(localStorage.token) || ''})
        }
      }).catch((e)=>{
        triggerGetBoxInfo({token: localStorage.getItem(localStorage.token) || ''})
      })
    }
  }
  return (
    <section className="forBoxing pb-12">
      <BoxHowToImage />
      <div className="basic-info mt-4 bg-[#FFFFFF1A] rounded-xl text-white flex flex-col justify-center items-center divide-y">
        <div className="font-bold mb-3 text-center text-base lg:text-lg py-4">
          Promoção sujeita ao cumprimento de todas as seguintes condições.
        </div>
        <div className="w-full flex pt-3 flex-col lg:flex-row justify-center items-center text-sm lg:text-base">
          <div className="text-center lg:mr-12">
            <span className="font-bold">Alcance de recarga</span>
            <br />
            <span> {boxInfoRes?.data.firstRechargeRequiredAmount} Ou o acima mencionado</span>
          </div>
          <div className="text-center lg:ml-12">
          <span className="font-bold">Alcance de receitas</span>
          <br />
          <span>{boxInfoRes?.data.boxFlow} Ou o acima mencionado</span>
          </div>
        </div>
      </div>
      <div className="box-search font-bold text-base lg:text-xl bg-[#FFFFFF1A] rounded-lg mt-4 py-4">
        <div className="text-center text-white">Pessoas de nível inferior eficazes <span className="text-[var(--text-popup)] mx-3">{boxInfoRes?.data.receiveAmount}</span> pessoas
          <span onClick={props.openModal} className=" mx-3 text-[var(--text-popup)] hover:border-b-2 border-[var(--text-popup)]"> {'>>>Detalhes'}</span>
        </div>
      </div>
      <div className="box-image flex flex-wrap bg-[#FFFFFF1A] rounded-lg mt-4 py-4 lg:px-40">
        {
          boxInfoRes?.data.contentVoList.map((box:any, index:any)=>{
            const flagMap = ['close','open', 'active']
            let reciveFlag = box.receiveFlag // 0未領 1已領過  2可以領但是還沒領
            if(box.number <= boxInfoRes?.data.number && box.receiveFlag === 0 ){
              reciveFlag = 2
            }
            return (
              
              <div className="w-1/4 p-1" onClick={()=>handleOpenBox(reciveFlag, box.number)}>
                <div className="flex items-center justify-around">
                  <div className="max-h-[354px] flex flex-col items-center">
                    <img alt='user' src={`assets/${environment.uVersion}/box-${flagMap[reciveFlag]}.png`} className="relative right-[-8px] h-[64px] w-[64px] md:h-[64px] md:w-[64px] lg:h-[270px] lg:w-[270px] mr-2" />
                    {
                      reciveFlag === 2 ? <div className="top-[-10px] lg:top-[-70px] relative text-center text-white text-[10px] lg:text-base rounded-[14px] lg:rounded-[24px] px-1.5  lg:px-12  py-0.5 lg:py-2 bg-[var(--button-modal-download-from)] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]"> Receber </div>: null
                    }
                    <div className={cx({
                      'top-[-10px]': reciveFlag === 2,
                      'lg:top-[-35px]' : reciveFlag === 2,
                    },'relative text-center text-white lg:text-base text-[10px]' )}>{box.number} pessoas</div>
                    <div className={cx({
                      'top-[-10px]': reciveFlag === 2,
                      'lg:top-[-35px]' : reciveFlag === 2,
                    }, 'relative text-center  text-white lg:text-base text-[12px]')}>{box.amount}</div>                  
                  </div>
                    {
                      index === 0 || (index % 4 !== 3) ? 
                      <div 
                      >
                        <img alt='user' src={`assets/${environment.uVersion}/box-right-arrow.png`}
                        className={cx({
                          'top-[-16px]': reciveFlag === 2,
                        },'relative h-[14px] w-[14px] md:w-[14px] md:h-[14px] lg:h-[48px] lg:w-[48px] m-auto'
                        )} /> </div>: ''
                    }
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="box-image flex flex-wrap bg-[#FFFFFF1A] rounded-lg mt-4 mb-2 p-4 lg:px-40">
        <p className=" text-white text-sm font-bold">Instruções Do Evento:</p>
        <div className="text-white mt-2">
        Regras de Atividade<br/>
        1. Este evento apenas para membros parceiros, cumprimento dos novos requisitos especificados, apenas pode receber as recompensas correspondentes.<br/>
        2. Nova regra: Recarga acumulada ≥ {boxInfoRes?.data.firstRechargeRequiredAmount} e tráfego válido ≥ {boxInfoRes?.data.boxFlow} no mesmo mês.<br/>
        3. A atividade é limitada ao jogo normal da própria conta. É estritamente proibido arbitrar e destruir o ambiente saudável de entretenimento por meio de comportamento anormal; caso contrário, os prêmios serão confiscados, a conta será congelada e a conta será colocada na lista negra.<br/>
        4. A fim de evitar diferenças textuais na compreensão, a plataforma tem o poder de manter a interpretação final desta atividade.<br/>
        </div>
      </div>
    </section>
  )
}
export const InvitePage = (props: IInvitePage) => {
  
  const { onClickToIndex } = usePageNavigate();
  const { children, panelMode, setPanelMode } = props;
  const { isMobile } = useBreakpoint();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const box_flag = useSelector((rootState: RootState) => rootState.app.config.box_flag)
  
  return (
    <PageContainer>
      {
          !isMobile && (
            <BackNavigation
              className={'md:pb-2'}
              onClick={onClickToIndex}
            />
          )
        }
      {
        // box_flag = 0 沒開寶箱所以顯示邀請
        !box_flag ? (
        <>
          <section className={"tab-item w-full flex flex-row justify-center item-center mb-4"}>
            <div>
              <Tabs className={"game-type-tab-list"}>
                <TabItem
                  mode={"howto"}
                  // pureColor={true}
                  background={"var(--primary-variant)"}
                  // activeBackground={"bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"}
                  activeBackground={"linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);"}
                  className={twMerge("px-6 text-white rounded-md mr-2 whitespace-nowrap text-sm sm:text-2xl",
                    panelMode !== "howto" && 'border border-solid border-[rgba(255,255,255,0.3)]'
                    )}
                  name={"Como convidar"}
                  active={panelMode === "howto"}
                  size={"big"}
                  onClick={() => {
                    setPanelMode("howto")
                  }}
                />
                <TabItem
                  mode={"data"}
                  // pureColor={true}
                  background={"var(--primary-variant)"}
                  // activeBackground={"bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"}
                  activeBackground={"linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);"}
                  className={twMerge("px-6 text-white rounded-md whitespace-nowrap text-sm sm:text-2xl",
                    panelMode !== "daily" && 'border border-solid border-[rgba(255,255,255,0.3)]')}
                  name={"Dados diários"}
                  active={panelMode === "daily"}
                  size={"big"}
                  onClick={() => {
                    setPanelMode("daily")
                  }}
                />
              </Tabs>
            </div>
          </section>
          {children}
        </>
        ) :
      (
        <>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <p>This is a modal!</p>
            </Modal>
          <BoxSection openModal={openModal} />
        </>
      )
      }
      
    </PageContainer>
  )
}
