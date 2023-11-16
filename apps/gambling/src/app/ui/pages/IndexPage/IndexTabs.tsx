import {TabItem, Tabs} from "../../components/TabItem/TabItem";
import {ScrollTab} from "../../components/TabItem/ScrollTab";
import {ImageTab} from "../../components/TabItem/ImageTab";

type IIndexTabs = {
  label: any;
  activeTab: any;
  setActiveTab: (value: any)  => void;
  setViewType: (value: any)  => void;
}
export const IndexTabs = ({
                            label,
                            activeTab,
                            setActiveTab,
                            setViewType,
                          }:IIndexTabs) => {
  return (
    <ScrollTab className="mx-4">
      <Tabs className={"game-type-tab-list"}>
        {
          // ["Todos", ...label, 'Favoritos']
          ["Salão", ...label, 'Favoritos'].map((tab: string, index: number) => {
            return (
              <ImageTab
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
                {tab}
              </ImageTab>
            )
            return (
              <TabItem
                key={index}
                name={tab}
                active={activeTab === tab}
                size="big"
                onClick={() => {
                  setActiveTab(tab)
                  setViewType('')
                }}
              />)
          })
        }
      </Tabs>
    </ScrollTab>
  )
}
