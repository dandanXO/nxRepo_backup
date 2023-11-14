import {TabItem, Tabs} from "../../components/TabItem/TabItem";
import {ScrollTab} from "../../components/ScrollTab";

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
          ["Todos", ...label, 'Favoritos'].map((tab: string, index: number) => {
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
