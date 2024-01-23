import {TabItem, Tabs} from "../../../../components-bs/TabItem/TabItem";
import {ImageTab} from "../../../../components-bs/TabItem/ImageTab";
import cx from "classnames";

import todos from "../../../../components-bs/Icons/tabs/env/u1/index-tab-todos.png"
import slots from "../../../../components-bs/Icons/tabs/env/u1/index-tab-slots.png"
import vivo from "../../../../components-bs/Icons/tabs/env/u1/index-tab-vivo.png"
import viver from "../../../../components-bs/Icons/tabs/env/u1/index-tab-viver.png"
import favorite from "../../../../components-bs/Icons/tabs/env/u1/index-tab-favorite.png"
import fishing from "../../../../components-bs/Icons/tabs/env/u1/index-tab-fishing.png";
import table from "../../../../components-bs/Icons/tabs/env/u1/index-tab-table.png";
import arcade from "../../../../components-bs/Icons/tabs/env/u1/index-tab-arcades.png";

import recent from "../../../../components-bs/Icons/tabs/env/u1/index-tab-recent.png"
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
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
            box-shadow: 0 1px 2px var(--stroke-button);
            background-image: linear-gradient(var(--button-gametab-focus-from), var(--button-gametab-focus-via) 15.65%, var(--button-gametab-focus-to));
            color: var(--white);
          `
    }
  }};
`

export const GAME_TYPE_ICON_MAP : { [key: string]: string} = {
  "Todos": todos,
  "Viver": viver,
  "Vivo": vivo,
  "Slots": slots,
  "Fishing": fishing,
  "Tables": table,
  "Arcades": arcade,
  "Favoritos": favorite
}

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
                {!hideIcon && <img className="w-[20px] h-[20px] mr-1" src={GAME_TYPE_ICON_MAP[tab] ? GAME_TYPE_ICON_MAP[tab] : GAME_TYPE_ICON_MAP['Todos']} />}
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
