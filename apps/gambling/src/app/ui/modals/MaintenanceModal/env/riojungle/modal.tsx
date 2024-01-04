import { environment } from "../../../../../../environments/environment";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint"
import cx from 'classnames';
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";
import moment from "moment";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { ReactElement } from "react";

interface IMaintenanceModal {
  onClickToOpenTelegramService: () => void
}

const Paragraph = ({ text }: { text: string | ReactElement }) => {
  const { isMobile } = useBreakpoint();
  return (
    <div className={cx('mb-2.5 text-white', {
      'text-lg leading-7': !isMobile,
      "text-sm leading-5": isMobile
    })} >
      {text}
    </div>
  )
}
export const RiojungleMaintenanceModal = (props: IMaintenanceModal) => {

  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const { maintenance } = useSelector((state: RootState) => state.app);
  const telegramService = AppLocalStorage.getItem(AppLocalStorageKey.telegramService);

  const maintenanceStart = moment(maintenance.start).format('DD-MM-YYYY HH:mm');
  const maintenanceEnd = moment(maintenance.end).format('DD-MM-YYYY HH:mm');
  const maintenanceMinutes = moment(maintenance.end).diff(moment(maintenance.start), 'minutes');
  const maintenanceHours = Math.ceil(maintenanceMinutes / 60);
  const maintenanceLeftTime = maintenanceMinutes >= 180 ? `${maintenanceHours} horas` : `${maintenanceMinutes} minutos`;

  return (
    <div className="z-[1005] fixed left-0 top-0 right-0 bottom-0 flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]">
      <div className={cx("flex flex-col fixed bg-gradient-144 from-[#8547EB] to-[#10B98F] rounded-lg py-6", {
        // NOTE: mt-[46px]:圖往上74px-24px(mb-6)
        "mt-[50px] px-6 w-[80%] lg:w-[778px] max-h-[calc(100%-120px)]": !isMobile,
        // NOTE: mt-[75px]:圖往上99px-24px(mb-6)
        "mt-[75px] w-[calc(100%-32px)] h-[calc(100%-120px)] px-4 md:w-[703px] justify-center items-center": isMobile
      })}>
        <div className={cx('self-center', {
          'w-[320px] h-[300px] my-5 ': isDesktop,
          'my-5 w-[200px] h-[187px]': isTablet,
          "w-[80px] h-[80px] mb-1 mt-1": isMobile
        })}>
          <img className={'w-full h-full'} src={`assets/${environment.assetPrefix}/maintenance_popup_icon.png`} alt={'icon'} />
        </div>
        <div className="overflow-auto flex-1">
          <Paragraph text={'Prezados usuários VIP:'} />
          <Paragraph text={`O serviço do sistema ${environment.platformName} está sendo atualizado e mantido.
          De ${maintenanceStart} (Brasil) até ${maintenanceEnd}, o tempo estimado de manutenção é de ${maintenanceLeftTime}. Durante a manutenção do sistema, evite cadastro, login, jogos e outras operações. Obrigado pela sua compreensão e apoio!`} />
          <Paragraph text={
            <div>
              {`Durante o período de manutenção do sistema, para evitar prejuízos, pedimos que não realize outras operações como depósitos e saques. Ao mesmo tempo, preparamos novas surpresas e recompensas de eventos para você, que serão anunciadas no ${environment.platformName} Canal `}
              <button className="text-[var(--secondary-assistant)]" onClick={props.onClickToOpenTelegramService}>{' '}{`(https://t.me/${telegramService})`}</button>
              {" de tempos em tempos. Se você estiver interessado, por favor, junte-se o mais rápido possível. possível. O tempo do evento é limitado."}
            </div>}
          />
          <Paragraph text={`Após o término da manutenção do sistema, forneceremos atendimento ao cliente on-line 7 × 24 para responder às suas perguntas! Obrigado pela sua paciência!`} />
          <Paragraph text={`Alegria e emoções positivas dobram sua felicidade. Que o novo serviço traga mais recompensas e deixe você ir bem!`} />
          <Paragraph text={`Lançado pelo ${environment.platformGroup}`} />

        </div>
      </div>

    </div>
  )
}
