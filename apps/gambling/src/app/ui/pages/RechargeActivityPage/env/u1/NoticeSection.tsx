import cx from 'classnames';

const ListItem = (props: { count: string; text: string; }) => {
  return (
    <li className="mb-1 space-x-2 flex">
      <div className="text-sm md:text-xl leading-5 md:leading-7 ">{props.count}</div>
      <div className="text-sm md:text-xl leading-5 md:leading-7">{props.text}</div>
    </li>
  )
}

export const NoticeSection = () => {
  return (
    <div className={`
         py-3 px-4 md:py-4 md:px-6
         text-sm md:text-lg
         rounded-lg flex flex-col text-left text-white bg-[var(--white-20)]`}
    >
      <div className={"text-left w-full text-sm md:text-xl mb-1 leading-5 md:leading-7"}>Nota especial:</div>
      <ul className={"text-left w-full"}>
        <ListItem count={"1."} text={"Certifique-se de que o seu número de conta, número de telemóvel e CPF são únicos"}/>
        <ListItem count={"2."} text={"Se o mesmo usuário registrar várias contas para obter bônus, consideraremos isso trapaceando e as contas relevantes serão congeladas permanentemente."}/>
        <ListItem count={"3."} text={"Não faremos qualquer compensação pelas perdas causadas por trapaça."}/>
      </ul>
    </div>
  )
}