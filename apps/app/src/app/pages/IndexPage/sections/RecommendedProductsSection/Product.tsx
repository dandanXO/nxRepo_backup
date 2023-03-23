import {MdExpandLess, MdExpandMore} from "react-icons/all";
import {useCallback, useState} from "react";

export const Product = () => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  return (
    <div className={"product flex flex-col mb-2"}>
      <div className={"brand pt-1 pb-3 px-2 flex flex-row justify-between"}>
        <div className={"left flex flex-row items-center"}>
          <div className={"w-10 h-10 rounded-md bg-[#D9D9D9] bg-gray-300 mr-2"}></div>
          <div className={""}>AA LOAN</div>
        </div>
        <div className={"right flex flex-row items-center"}>
          <div className={"font-medium"}>₹ 3,200</div>
          {expand ? (
            <MdExpandMore size={30} color={"#AAAAAA"} onClick={toggleExpand}/>
          ) : (
            <MdExpandLess size={30} color={"#AAAAAA"} onClick={toggleExpand}/>
          )}
        </div>
      </div>
      {expand && (
        <div className={"expandable-brand bg-[#F3F3F3] p-3 flex flex-col"}>
          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Interest</div>
            <div className={"value"}>1.8%</div>
          </div>

          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Terms</div>
            <div className={"value"}>91days</div>
          </div>

          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Disbursal Amount </div>
            <div className={"value"}>2,400</div>
          </div>

          <div className={"item flex flex-row justify-between mb-1"}>
            <div className={"key"}>Due Date</div>
            <div className={"value"}>2023-03-10</div>
          </div>
        </div>
      )}
    </div>
  )
}
