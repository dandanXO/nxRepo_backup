import useBreakpoint from "../../../../../../pageTemplate/hooks/useBreakpoint";
import cx from "classnames";

export const DepositNoticeSection = () => {
  const {isMobile} = useBreakpoint();

  return (
    <div className={cx("text-[#ffba00] font-[Heebo]  text-left my-5")}>
      {
        isMobile
          ? (<p className=" text-xs leading-tight">
            <p>Quando a primeira recarga ultrapassar R$ 50, você receberá um bônus adicional de recarga de 20%. </p>
            <p> A partir da segunda recarga, caso o valor da recarga ultrapasse R$ 50, você receberá um bônus de recarga
              adicional de até 10%! 6 vezes ao dia, quanto maior o valor da recarga, maior será a recompensa! </p>
          </p>)
          : (<p className="text-base leading-tight">Prezado usuário, quando o valor da primeira recarga ultrapassar 50
            reais, você receberá até 20% de recompensa de recarga. A partir da segunda recarga, se o valor da recarga
            ultrapassar R$ 50, você receberá um bônus de recarga de até 10%! 6 vezes ao dia, quanto maior o valor da
            recarga, maior a proporção de presentes!</p>)
      }
    </div>
  )
}
