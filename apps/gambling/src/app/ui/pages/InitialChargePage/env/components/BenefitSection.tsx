import cx from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../../../../reduxStore";
export const BenefitSection = ({ className }: { className?: string }) => {
  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate);
  return (
    <>
      <div className={cx("text-left w-full ",className)}>Bônus de {recharge_first_cashback_rate} para o primeiro depósito.</div>
      <div className={cx("text-left w-full",className)}>Obrigado pela confiança e apoio. Para sua primeira recarga, oferecemos um bônus de recarga de até 20%! As recompensas serão transferidas diretamente para sua conta após a recarga.</div>
    </>
  )
}
