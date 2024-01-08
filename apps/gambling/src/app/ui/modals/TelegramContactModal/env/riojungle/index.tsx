import styled from "styled-components";
import {environment} from "../../../../../../environments/environment";
import { tcx } from "../../../../utils/tcx";
import cx from "classnames"
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import {CloseICON} from "../../../../components-bs/Icons/CloseICON";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import {BaseModal} from "../../../BaseModal";


const Container = styled.div`
  //width: 100%;
  //height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
`;


const ModalButton = styled.button`
  border-radius: 8px;
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

  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const telegramId = AppLocalStorage.getItem(AppLocalStorageKey.telegramGroup);
  return (
    <BaseModal className={"flex flex-col justify-center items-center"} onClose={(event) => {
      props.close();
    }}>

      <Container
        className={tcx(
          "shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] relative bg-gradient-144 from-[var(--liner-main-from)] to-[var(--liner-main-to)]",
          "w-[410px] w-min-[80vh] w-max-[400px] h-auto rounded-xl flex flex-col items-center relative px-5 py-6",
          ['w-[330px] py-4', isMobile]
          )}
        onClick={(event) => {
        event.stopPropagation();
      }}>

        <div className={tcx(
          "flex flex-row justify-end mb-2 absolute right-0 top-0",
        )}>
          <div
            onClick={() => {
              props.close();
            }}
          >
            <CloseICON className="w-[40px] h-[40px] " btnClassName={'mt-3 mr-3 hover:rounded-full hover:bg-[rgba(255,255,255,0.1)]'} outLined={true}/>
          </div>
        </div>


        <img alt='icon' className={tcx('w-[216px] mb-8', ['w-[160px] mt-10 mb-2', isMobile])} src={`assets/${environment.assetPrefix}/ic_telegram_modal.png`} />
        <div className={"flex flex-col"}>
          <div className={"mb-8 text-white"}>
            <div
              style={{
              // background: 'linear-gradient(180deg, var(--text-gradient-ad-tg-from) 0%, var(--text-gradient-ad-tg-to) 100%)',
              // WebkitBackgroundClip: 'text',
              color: 'white',
              }}
              className={tcx('text-[24px] text-center font-bold',['text-lg', isTablet] , ['text-base', isMobile])}
            >Junte-se a nós</div>
            <div className={tcx("text-text-telegram text-center text-base font-normal", ['text-[14px] mt-0', isMobile])}>
            Prezados clientes VIP, juntem-se ao nosso canal oficial do Telegram. Realizaremos vários eventos de loteria de tempos em tempos. Dezenas de milhares de reais estão esperando por você para reivindicar.
            </div>
          </div>

          <div className={"flex flex-col justify-center items-center"}>
            <ModalButton
              className={cx(
                {'text-sm': isMobile},
                {'text-base': isTablet},
                {'text-lg': isDesktop},
                'py-3',
                  'text-white bg-[var(--primary-main)] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] flex flex-row justify-center cursor-pointer'
                )}
              onClick={() => props.toTelegramGroup() }
            >
              <span>Junte-se</span>
              {/* <img alt='icon' className={tcx('w-[24px] mr-2', ['w-[20px] mr-2', isMobile])} src={`assets/${environment.assetPrefix}/TelegramLogoOutline.png`} /> */}
              {/* <span className={"font-bold"}>{telegramId}</span> */}
            </ModalButton>
          </div>
        </div>


      </Container>
    </BaseModal>
  )
}

