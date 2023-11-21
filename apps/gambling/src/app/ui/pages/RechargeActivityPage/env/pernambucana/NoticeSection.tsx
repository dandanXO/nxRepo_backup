export const NoticeSection = () => {
  return (
    <div className={"p-4 rounded-lg flex flex-col text-left text-white items-start text-lg border border-solid border-green-500 mb-8 mr-4 ml-4"} style={{ backgroundColor: 'var(--game-block)', opacity: 0.6 }}>
      <div className={"text-left w-full"}>Nota especial:</div>
      <div className={"text-left w-full"}>Certifique-se de que o seu número de conta, número de telemóvel e CPF são únicos. Se o mesmo usuário registrar várias contas para obter bônus, consideraremos isso trapaceando e as contas relevantes serão congeladas permanentemente.Não faremos qualquer compensação pelas perdas causadas por trapaça.</div>
    </div>
  )
}