import { environment } from "apps/gambling/src/environments/environment"
import cx from 'classnames';

interface INoticeSection {
  titleClassName?: string;
  textClassName?: string
}

export const NoticeSection = (props: INoticeSection) => {
  const { titleClassName, textClassName } = props
  return (
    <>
      <div className={cx("text-left w-full", titleClassName)}>Detalhes do evento:</div>
      <ul className={"text-left w-full"}>
        <li className={textClassName}>1. O valor da sua primeira recarga deve ser superior a 50 reais.</li>
        <li className={textClassName}>2. Cada conta tem apenas uma chance (depois de completar esta recompensa, você pode participar do evento de presente de recarga da plataforma).</li>
        <li className={textClassName}>3. O bônus de depósito será creditado diretamente em sua conta de depósito.</li>
        <li className={textClassName}>4. Rejeitamos contas fraudulentas, uma vez descobertas, elas serão permanentemente congeladas.</li>
        <li className={textClassName}>5. O direito de interpretação final das atividades da plataforma pertence ao {environment.platformGroup} (propriedade do {environment.platformName})</li>
      </ul>
    </>

  )
}