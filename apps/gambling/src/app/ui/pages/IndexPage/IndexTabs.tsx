import {TabItem, Tabs} from "../../components/TabItem/TabItem";
import {ImageTab} from "../../components/TabItem/ImageTab";
import cx from "classnames";
import todos from "../../env/coco/index-tab-todos.png"
import slots from "../../env/coco/index-tab-slots.png"
import vivo from "../../env/coco/index-tab-vivo.png"
import viver from "../../env/coco/index-tab-viver.png"
import favorite from "../../env/coco/index-tab-favorite.png"
import recent from "../../env/coco/index-tab-recent.png"

type IIndexTabs = {
  label: any;
  activeTab: any;
  setActiveTab: (value: any)  => void;
  setViewType: (value: any)  => void;
  hideIcon?: boolean;
}
export const IndexTabs = ({
                            label,
                            activeTab,
                            setActiveTab,
                            setViewType,
                            hideIcon
                          }:IIndexTabs) => {
  // const icons = {
  //   "Todos":
  // }
  const icons = [
    todos,
    slots,
    viver,
    vivo,
    todos,
    todos,
    todos,
    todos,
    favorite,
    // recent
  ]
  return (
      <Tabs className={"game-type-tab-list my-1"}>
        {
          // ["Todos", ...label, 'Favoritos']
          // ["Salão", ...label, 'Favoritos']
          ["Todos", ...label, 'Favoritos'].map((tab: string, index: number) => {
            return (
              <ImageTab
                className={cx("flex row justify-center items-center",{
                  "bg-gradient-to-b from-[#88E3FF] to-[#0044C7]": activeTab === tab,
                })}
                // className={cx(`font-bold border-none border-0 rounded `, {
                //   'bg-[#262fa8] text-white py-0.5': activeTab === tab,
                //   'text-[#9ea3bb]': activeTab !== tab
                // })}
                active={activeTab === tab}
                onClick={() => {
                  setActiveTab(tab);
                  setViewType('')
                }}
              >
                {!hideIcon && <img className="w-[20px] h-[20px] mr-1" src={icons[index] ? icons[index] : icons[0]} />}

                <span>{tab}</span>
              </ImageTab>
            )
            // return (
            //   <TabItem
            //     key={index}
            //     name={tab}
            //     active={activeTab === tab}
            //     size="big"
            //     onClick={() => {
            //       setActiveTab(tab)
            //       setViewType('')
            //     }}
            //   />)
          })
        }
      </Tabs>
  )
}
