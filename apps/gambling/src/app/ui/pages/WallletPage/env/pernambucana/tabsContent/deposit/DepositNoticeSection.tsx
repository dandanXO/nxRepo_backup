import cx from "classnames";
import useBreakpoint from "../../../../../../hooks/useBreakpoint";

export const DepositNoticeSection = () => {
  const {isMobile} = useBreakpoint();
  return (
    <div className={cx("text-main-primary-main text-base leading-5 text-left my-5", {'text-xl my-10': !isMobile})}>
      Prezado usuário, quando o valor da primeira recarga ultrapassar 50 reais, você receberá até 20% de recompensa de
      recarga. A partir da segunda recarga, se o valor da recarga ultrapassar R$ 50, você receberá um bônus de recarga
      de até 10%! 6 vezes ao dia, quanto maior o valor da recarga, maior a proporção de presentes!
    </div>
  )
}
