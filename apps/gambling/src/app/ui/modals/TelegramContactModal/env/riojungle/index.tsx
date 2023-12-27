import styled from "styled-components";
import {environment} from "../../../../../../environments/environment";
import { tcx } from "../../../../utils/tcx";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {CloseICON} from "../../../../components-bs/theme/Icons/CloseICON";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { AppLocalStorage } from "../../../../../persistant/localstorage";


const Container = styled.div`
  //width: 100%;
  //height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
`;


const ModalButton = styled.button`
  border-radius: 25px;
  background: #33ABE0;
  box-shadow: 0px -4px 4px 0px #00000040 inset;
  box-shadow: 0px 4px 4px 0px #FFFFFF40 inset;
  width: 100%;
  //position: absolute;
  //bottom: 34px;
  //left: 50%;
  //margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`

export type ITelegramContactModal = {
  close: () => void;
  toTelegramGroup: () => void;
}

export const RiojungleTelegramContactModal = (props: ITelegramContactModal) => {

  const { isMobile } = useBreakpoint();
  const telegramId = AppLocalStorage.getItem(AppLocalStorageKey.telegramGroup);
  return (
    <div className={"z-[1005] fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"} onClick={(event) => {
      props.close();
    }}>

      <Container
        className={tcx(
          "w-[410px] w-min-[80vh] w-max-[400px] h-auto bg-[#333333] rounded-2xl flex flex-col items-center relative px-5 py-6",
          ['w-[330px] py-4', isMobile]
          )}
        onClick={(event) => {
        event.stopPropagation();
      }}>

        <div className={tcx(
          "flex flex-row justify-end mb-2 absolute right-[20px]",
          ['top-[20px]'],
        )}>
          <div
            onClick={() => {
              props.close();
            }}
          >
            <CloseICON className="w-[40px] h-[40px] p-0" btnClassName={'p-1 hover:rounded-full hover:bg-[rgba(255,255,255,0.1)]'} outLined={true}/>
          </div>
        </div>


        <img alt='icon' className={tcx('w-[130px] mt-6 mb-3', ['w-[120px] mt-10 mb-2', isMobile])} src={`assets/${environment.assetPrefix}/ic_telegram.png`} />
        <div className={"flex flex-col"}>
          <div className={"mb-2 text-white"}>
            {/* <ModalTitle
              style={{
              // background: 'linear-gradient(180deg, var(--text-gradient-ad-tg-from) 0%, var(--text-gradient-ad-tg-to) 100%)',
              // WebkitBackgroundClip: 'text',
              color: 'white',
              }}
              className={tcx('text-[32px]', ['text-base', isMobile])}
            >Junte-se a nós</ModalTitle> */}
            <div className={tcx("text-text-telegram text-center text-lg font-medium mt-4", ['text-[14px] mt-0', isMobile])}>
              Para cooperação comercial, entre em contato com o gerente
            </div>
          </div>

          <div className={"flex flex-col justify-center items-center"}>
            <ModalButton
              className={tcx('text-lg w-[168px] h-[31px]', ['text-sm w-[99px] h-[31px]', isMobile])}
              onClick={() => props.toTelegramGroup() }
            >
              <img alt='icon' className={tcx('w-[24px] mr-2', ['w-[20px] mr-2', isMobile])} src={`assets/${environment.assetPrefix}/TelegramLogoOutline.png`} />
              <span className={"font-bold"}>{telegramId}</span>
            </ModalButton>
          </div>
        </div>


      </Container>
    </div>
  )
}

