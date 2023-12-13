import { environment } from "../../../../environments/environment";
import { ListItem } from "../../components/List/ListItem";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { CloseICON } from "../../components/Icons/CloseICON";

interface ITelegramMobileModal {
  onClose: () => void;
  onClickToOpenTelegramService: () => void;
  onClickToOpenTelegramManager: () => void;

}

export const TelegramMobileModal = (props: ITelegramMobileModal) => {
  const telegramService = AppLocalStorage.getItem(AppLocalStorageKey?.telegramService);
  const telegramManager = AppLocalStorage.getItem(AppLocalStorageKey?.telegramManager);

  const ListTitle = ({ text }: { text: string }) => {
    return (
      <div className="flex items-center">
        <img className={"w-[30px] mr-3.5"} src={`assets/${environment.assetPrefix}/icon=telegram.png`} />
        <div className="text-base">{text}</div>
      </div>
    )

  }

  return (
    <div className={"z-[1002] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"}
      onClick={(event: any) => {
        props.onClose();
      }}>
      <div className={`
      fixed rounded-lg w-[calc(100%-40px)] px-5 py-4
      flex flex-col justify-center items-center
      bg-gradient-to-b from-[var(--background-modal-telegram-from)] to-[var(--background-modal-telegram-to)]
      shadow-[4px_4px_4px_0px_rgba(255,255,255,0.50)_inset,-4px_-4px_4px_0px_rgba(255,255,255,0.25)_inset]
      `
      }>
        <div className="text-white text-sm leading-5 text-center mb-2">Se precisar de ajuda, entre em contato com o atendimento ao cliente</div>
        <ListItem className={'text-white mb-2'}
          title={<ListTitle text={telegramService || ''} />}
          onClick={() => {
            props.onClickToOpenTelegramService()
          }}
          isEnd={true}
        />
        <div className="text-[var(--secondary-assistant)] text-sm leading-5 text-center mb-2">Para cooperação comercial, entre em contato com o gerente</div>

        <ListItem className={'text-white mb-2'}
          title={<ListTitle text={telegramManager || ''} />}
          onClick={() => {
            props.onClickToOpenTelegramManager()
          }}
          isEnd={true}
        />
        <div className="text-white text-sm font-bold leading-5">Clique no ícone para pular</div>

        <button className={'absolute bottom-[-44px]'}
          onClick={() => { props.onClose() }}
        >
          <CloseICON outLined={true} />
        </button>

      </div>

    </div>
  )
}
