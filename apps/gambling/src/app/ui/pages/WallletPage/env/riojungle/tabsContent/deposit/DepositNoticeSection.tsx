import cx from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../reduxStore";

export const DepositNoticeSection = () => {

  const { recharge_first_cashback_rate, recharge_bonus_start} = useSelector((rootState: RootState) => rootState.app.config);

  return (
    <div className={cx("mb-3 md:mb-5 p-2 md:p-3 lg:px-5 text-sm lg:text-base leading-5 lg:leading-6 border border-solid border-[#333333] bg-[#1a1a1a] text-[#10b98f] rounded-lg text-center")}>
      Prezado usuário, quando o valor da primeira recarga ultrapassar {recharge_bonus_start} reais, você receberá até {recharge_first_cashback_rate} de recompensa de recarga. A partir da segunda recarga, se o valor da recarga ultrapassar R$ 50, você receberá um bônus de recarga de até 10%! 6 vezes ao dia, quanto maior o valor da recarga, maior a proporção de presentes!
    </div>
  )
}
