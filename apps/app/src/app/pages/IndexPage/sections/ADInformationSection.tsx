export const ADInformationSection = () => {
  return (
    <div className={"ad flex flex-row justify-around"}>
      <div className={"flex flex-row"}>
        <div className={"flex flex-col justify-center"}>
          <div className={"rounded-full bg-gray-300 mr-3 w-10 h-10 text-center"}>icon</div>
        </div>
        <div className={"info"}>
          <div className={"name"}>Interest rate</div>
          <div className={"value text-2xl"}>1.2-2.8%</div>
        </div>
      </div>
      <div className={"flex flex-row justify-center"}>
        <div className={"flex flex-col justify-center"}>
          <div className={"rounded-full bg-gray-300 mr-3 w-10 h-10 text-center"}>icon</div>
        </div>
        <div className={"info"}>
          <div className={"name"}>Loan Term</div>
          <div className={"value text-2xl"}>91+ days</div>
        </div>
      </div>
    </div>
  )
}
