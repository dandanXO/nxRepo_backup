export const WelcomeBackAndReapplyInTimeSection = () => {
  return (
    <div className={"w-full flex flex-col items-center"}>
      <div className={"font-medium text-center mb-2"}>Welcome back and reapply in</div>

      <div className={"w-[240px] border-[1.5px] py-2 px-2 rounded-md flex flex-row"}>
        <div className={"flex-1 flex flex-col items-center"}>
          <div className={"value text-xs font-normal"}>NN</div>
          <div className={"label text-xs text-gray-500"}>days</div>
        </div>
        <div className={"flex-1 flex flex-col items-center"}>
          <div className={"value text-xs font-normal"}>23</div>
          <div className={"label text-xs text-gray-500"}>hours</div>
        </div>
        <div className={"flex-1 flex flex-col items-center"}>
          <div className={"value text-xs font-normal"}>59</div>
          <div className={"label text-xs text-gray-500"}>minutes</div>
        </div>
        <div className={"flex-1 flex flex-col items-center"}>
          <div className={"value text-xs font-normal"}>59</div>
          <div className={"label text-xs text-gray-500"}>seconds</div>
        </div>
      </div>

    </div>
  )
}
