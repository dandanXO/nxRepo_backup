import cx from 'classnames';
export const NoticeSection = () => {
  return (
    <div className={`
         py-3 px-4 md:py-4 md:px-6
         text-sm md:text-lg
         rounded-lg flex flex-col text-left text-white bg-[var(--white-20)]`}
      >
      <div className={"text-left w-full mb-2 "}>Nota especial:</div>
      <div className={"text-left w-full mb-3.5 md:mb-2"}>Certifique-se de que o seu número de conta, número de telemóvel e CPF são únicos.</div>
      <div className={"text-left w-full mb-3.5 md:mb-2"}>Se o mesmo usuário registrar várias contas para obter bônus, consideraremos isso trapaceando e as contas relevantes serão congeladas permanentemente.</div>
      <div className={"text-left w-full mb-3.5 md:mb-2"}>Não faremos qualquer compensação pelas perdas causadas por trapaça.</div>
    </div>
  )
}