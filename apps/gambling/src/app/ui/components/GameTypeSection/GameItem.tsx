import styled from "styled-components";
import cx from "classnames"
import {ArrowRightOutlined} from "@ant-design/icons/lib/icons";
import useBreakpoint from "../../hooks/useBreakpoint";
import {useState} from "react";
// import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {TailSpin} from 'react-loading-icons';



export type IGameItem = {
  className?: string;
}
const StyledGameItem = styled.div.attrs<IGameItem>(props => ({
    // className: cx("w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5", props.className)
  className: cx("", props.className)
}))`
  z-index: 1;
  cursor: pointer;
  border-radius: 10px;
  //padding: 4px;
`

const Skeleton = styled.div`
  @keyframes waveAnimation {
    0% {
      background-position: -200px 0;
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      background-position: calc(200px + 100%) 0;
      opacity: 0.2;
    }
  }

  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 1),
    transparent
  );
  color: rgba(0, 0, 0, 0);
  overflow: hidden;
  background-size: 200% 100%;
  animation: waveAnimation 2s linear infinite;
  width: 100%;

`
const DesktopGameItemButton = styled.div`
  width: 90px;
  height: 36px;
  background: linear-gradient(149deg,#FFF600 0%,#4FFB0C 100%);
  border-radius: 8px;
  color: #0b0e11;
  //display: flex;
  //justify-content: center;
  //align-items: center;
`

const FavoriteSection = styled.div`
  //&:after {
  //  content: "";
    position: absolute;
    z-index: 999;
    top: -15px;
    right: -37px;
    width: 100px;
    height: 40px;
    background: #090B0F;
    transform: rotate(45deg);
    box-shadow: 0 0 15px inset rgba(255,250,5,.3);
    background: rgba(9,11,15,.8);
    border: 1px solid #FFFA05;
  //}
`
const FavoriteStarImg = styled.img`
  right: -45px;
  top: 15px;
  position: relative;
  transform: rotate(99deg);
`

export const DesktopGameItem = (props: IItem) => {
  const [hover, setHover] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  return (
    <StyledGameItem
      className={"p-1 game-item rounded flex flex-col items-center relative"}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}>
      {!onLoad && (
        <Skeleton className={"rounded-xl w-[150px] h-[150px]  flex justify-center items-center"}>
          <TailSpin/>
        </Skeleton>
      )}
      <div className={"w-full"}>
        <img alt={"name"}
             className={cx("rounded-xl hover:blur-[2px] w-[150px] h-[150px] object-cover", {
               "hide": !onLoad,
               "basis-[calc(100%-1rem)]": onLoad
             })}
             src={props.imageURL}
             onLoad={() => {
               setOnLoad(true);
             }}
        />
        <div className={"text-[#d7e8ff] block text-ellipsis truncate text-sm md:text-base sm:text-center w-full sm:text-center md:text-left basis-[20px] shrink-0"}>{props.name}</div>
      </div>
      <section
        className={"absolute right-[14px] top-[14px]"}
        onClick={props.onClickFavorite}
      >
        <img alt={"favorite"} src={props.favorite?
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAA/BJREFUSEu1l39MG3UUwD93paxQO5mILYIyon8YsCkmZojzBxjXQMiYmQ5jJgYoC85gxEQTTE2cjojLJIohc6lORggxLFKyGCMagpKw6WYwdYMFFdkQ1hAq7EdXFEbvzPfWEqYo7Qovudxd7t77vPe+7973ncQSUVVVAtYBcYC4jlVUIAjMSZKkhI0tGh4fH0+or6/PGRgYyJienjYqihIzVJZl1Wg0zmVlZU1WVlb+WFhYOCPAmmGv15tYUVGxpb+/PykQCCx6FGuYYX2dTifZbDalrq6up7S0dFISKXU4HJs7OjruWgvgUscLCgoCvb29XwhootVq3T44OBhzOlfKjNls1judzq+lnp6e5PLy8icmJibmV1KK9bnRaJSrq6s9UktLi8XpdBZ7vd6ooLk5rD/h4XI0jhgMBrmqqmrohqDb7Ji7XDS42nE97+T7SMExQU98xrObrNinphg1P8yeNYdmpmP4+XOa9AoJqKi73+aNg27ORQK+4Ug79vN46UM8xyygwqkx+mwODq0qNMmELn8TyXemYkrdwE0vlLBz/QIWrgAKBPXMt3zDod/+YGZyktmTvzB95rzm0r9kxUifLMTy6fvs0cskMI/EHGimRL1eBA26AOiBBMAAxF+7V+JZaP2STyob6V9KXhFqNCB7uqi528z9BEJAcfaHwOJafGSipetCh3DACNM6xh7by75T45pri7IiVLyp0yH1fcDTmzdSxCUkDSjMhJ34C7h6Lc1aF0+A31WG8g/TdHYG8fQ6iQga1mh9kUfKrJRLF4nTwCLNf4YOkXYB1cPQPMfy3Hzsv6ptZ9Gv6T81vn2Jpx69lRLE5iSiFVARi4DKcHkdU7cc4ZVlaSFjUUUqdEbf4uXMee7DF1rTMFSkNx4UM8E7jlDtndVWelmJCqrXIQXe40P9OIlMhdZURCjA4iyqNh1ePcPed3/g11WB7i4g88A23mQMuIB6dgbPvtO4y1LJyzNglyXisEDXFdq3H+WrVYEeraWoJINnLpzj/IHvaH/9JINhwzssWPZb2ZmRhm1Iz/F7P+LgqkBf28o9thRu39VG339V5jsPkpNsJnFXF8dXBRpJX43kncVCcrvdt9XU1GyNdhOPBLJcc3A4HKcln89nys3N3TE6OiqKf00lKSkprra29pgYzPRFRUVF3d3dN68pEcjOzpY6Ozu7tAmwtbU1raGhYcvw8PD/NZSYfEpJSYkrKyvzNDY2ejSomH2bm5s3trW1PTAyMmLw+/1BRYl95pZlGVE8aWlpqt1uH2xqavpJkqSF62ZdMem7XK50n8+3IRgMiv+ZmERVVcVkMvmLi4sn8vPzL0mSJDZC/gbUewA7L2s5ugAAAABJRU5ErkJggg=="
          :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAA6VJREFUSEtjZEAC////Z2RgYGBnYGBgYWBgALEpBf8ZGBj+MjAw/GRkZPwHMwxu8OPHjzlbWloMzp49K//27Vvuf//+UWwpExPTf25u7p9aWlovkpKSznl4eLwDWQw2+NmzZ1yJiYmuR44cEfj69SvcRZR6E6afmZmZUV9f/19FRcWesLCwF4ygIE1OTrZeuXKlMi0sRHa4o6Pj13379m0FWcqlq6sbdOXKFYqDk1DIiIuLs1ZXV+9i3LNnj3BCQkLAkydPfhHSRKk8Nzc3U3p6+gXG+fPnS1RXV3s/e/aMJEsFBARYPnz48IcUh3BwcDClpKRcJctSOTk5ztraWtd169ad3r59+3NiLabI0tzcXG1DQ0O1Fy9evKmqqjpMc0u5ubmZe3t7PdjY2NgYGBj+9/f377t8+fInYiwm26cREREKbm5uhjBLrl+/fq+7u/siVS0FZWwxMTE2MTExDhEREXYfHx9dfn5+Ppglf//+/bNhw4az7969+/HmzZufz549+/H161dQ0YcBCPoUlFjKy8sdODk5QWUxSXn4z58/vzdu3Hhu69atz5BtJmgpMzMzQ0VFhYmysrIsMUGHrObt27fvWltbj3348OE3SZbCFGdlZWmZmJioEevbp0+fvujq6jr1+fNnjCAm6FNkFwYHB8t5enoaMjExMeHz9e3btx/29PSc//37N6hKIz1O0XVkZmZqmpqaauCy9MuXL5/z8vL24HMUST4FGdTQ0GAuJycnhcvQf//+/cvJydn848cPnFUjyZbOmDHDG1og4PTM9OnTD5w+ffo9LgUkWaqrq8tXWFjoDDPs4cOHzzds2HDdzs5ORl9fXwUW13v37r2wdOnS+1SxNCYmRsnJyUn/48ePHzds2HD54MGDr2EGq6qqckdHR+vKyclJ3rx580FnZ+d5qlhqbm4uJC8vz7d27dqHf//+xZoyHRwcxPj5+Vk3btz4lCqWklo4ELR03bp1Yjk5Ob6kVuLkOASUkJKTky8zvn79mtfc3Dz03r17KEUWOYYS0gNqbRQUFBwFNcxYPT09PXfs2MFPSBOl8tra2oxr165dD649Fi5cKN3e3u5648YNrFUSpZaB9IuKirLExsZe6O3tvQC2FNT2nTJlisLixYst7ty5wwEqrP/9o7zNDSqqQfEoLS39383N7crEiRMvMjIy/kGpJ0Et/VmzZsm8fv1a8O/fv6D+DEXg/////3h5eT97e3s/cXBw+MjIyAjObgCmgPosJ0JtEwAAAABJRU5ErkJggg=="}/>
      </section>
      {hover && (
        <DesktopGameItemButton
          onClick={props.onClick}
          className={cx("text-white absolute top-[29%] flex flex-row justify-center items-center font-bold")}
        >
          <span>Jogar</span>
          <ArrowRightOutlined className={"ml-1 relative top-[1px]"}/>
        </DesktopGameItemButton>
      )}
    </StyledGameItem>
  )
}
const StyledMobileGameItem = styled.div.attrs<IGameItem>(props => ({
  // className: cx("w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5", props.className)
  className: cx("", props.className)
}))`
  cursor: pointer;
  z-index: 1;
`

export type IItem ={
  imageURL: string;
  name: string;
  onClick?: () => void;
  onClickFavorite?: () => void;
  favorite?: boolean
}
