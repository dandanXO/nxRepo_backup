import cx from 'classnames';
export const BenefitSection = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={cx("text-left w-full ",className)}>Bônus de 20% para o primeiro depósito.</div>
      <div className={cx("text-left w-full",className)}>Obrigado pela confiança e apoio. Para sua primeira recarga, oferecemos um bônus de recarga de até 20%! As recompensas serão transferidas diretamente para sua conta após a recarga.</div>
    </>
  )
}