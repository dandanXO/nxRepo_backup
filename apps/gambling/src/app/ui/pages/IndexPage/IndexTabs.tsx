import {TabItem, Tabs} from "../../components-bs/TabItem/TabItem";
import {ImageTab} from "../../components-bs/TabItem/ImageTab";
import cx from "classnames";
import todos from "../../env/coco/index-tab-todos.png"
import slots from "../../env/coco/index-tab-slots.png"
import vivo from "../../env/coco/index-tab-vivo.png"
import viver from "../../env/coco/index-tab-viver.png"
import favorite from "../../env/coco/index-tab-favorite.png"
import fishing from "../../env/coco/index-tab-fishing.png";
import recent from "../../env/coco/index-tab-recent.png"
import useBreakpoint from "../../hooks/useBreakpoint";
import styled from "styled-components";

const IndexImageTab = styled(ImageTab)`
  margin-bottom: 2px;
  ${props => {
    if (!props.active) {
      return `
            background: var(--primary-variant);
            color: var(--white);
          `;
    } else {
      return `
            box-shadow: 0 1px 2px rgba(6,240,246,1);
            background-image: linear-gradient(var(--button-gametab-focus-from), var(--button-gametab-focus-via) 15.65%, var(--button-gametab-focus-to));
            color: var(--white);
          `
    }
  }};
`
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
  // const icons = [
  //   todos,
  //   slots,
  //   viver,
  //   vivo,
  //   todos,
  //   todos,
  //   todos,
  //   todos,
  //   favorite,
  //   recent
  // ]

  const iconsMap : { [key: string]: string} = {
    "Todos": todos,
    "Viver": viver,
    "Vivo": vivo,
    "Slots": slots,
    "Fishing": fishing,
    "Favoritos": favorite
  }

  const {isMobile} = useBreakpoint();
  return (
      <Tabs className={cx("game-type-tab-list")}>
        {
          // ["Todos", ...label, 'Favoritos']
          // ["Salão", ...label, 'Favoritos']
          ["Todos", ...label, 'Favoritos' ].map((tab: string, index: number) => {
            return (
              <IndexImageTab
                key={index}
                className={cx("flex row justify-center items-center px-5 md:px-6 mr-4 !rounded-[16px_4px_16px_4px]",
                  "!border-none",{
                })}
                active={activeTab === tab}
                onClick={() => {
                  setActiveTab(tab);
                  setViewType('')
                }}
              >
                {!hideIcon && <img className="w-[20px] h-[20px] mr-1" src={iconsMap[tab] ? iconsMap[tab] : iconsMap['Todos']} />}
                <span>{tab}</span>
              </IndexImageTab>
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
