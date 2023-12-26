import useBreakpoint from "../../../../../../hooks/useBreakpoint";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../../../../../../reduxStore";

export const DepositNoticeSection = () => {
  const {isMobile} = useBreakpoint();
  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate);
  const recharge_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_cashback_rate);

  return (
    <div className={cx("text-[var(--secondary-assistant)] font-[Heebo]  text-left my-3.5 md:my-8")}>
      {
        isMobile
          ? (<p className=" text-xs leading-tight">
            <p>Quando a primeira recarga ultrapassar R$ 50, você receberá um bônus adicional de recarga de {recharge_first_cashback_rate}. </p>
            <p> A partir da segunda recarga, caso o valor da recarga ultrapasse R$ 50, você receberá um bônus de recarga
              adicional de até {recharge_cashback_rate}! 6 vezes ao dia, quanto maior o valor da recarga, maior será a recompensa! </p>
          </p>)
          : (<p className="text-base leading-tight">Prezado usuário, quando o valor da primeira recarga ultrapassar 50
            reais, você receberá até {recharge_first_cashback_rate} de recompensa de recarga. A partir da segunda recarga, se o valor da recarga
            ultrapassar R$ 50, você receberá um bônus de recarga de até {recharge_cashback_rate}! 6 vezes ao dia, quanto maior o valor da
            recarga, maior a proporção de presentes!</p>)
      }
    </div>
  )
}
