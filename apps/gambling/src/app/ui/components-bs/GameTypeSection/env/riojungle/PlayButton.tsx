import { environment } from "apps/gambling/src/environments/environment"
import { DesktopGameItemButton } from "../components/DesktopGameItemButton";

interface IPlayButton {
  onClick: () => void;
}
export const PlayButton = (props: IPlayButton) => {
  return (
    <DesktopGameItemButton
      onClick={props.onClick}
    >
     <img className="w-[40px] h-[40px] md:w-[56px] md:h-[56px]" src={`assets/${environment.assetPrefix}/icon=play.png`} alt="play" />
    </DesktopGameItemButton>
  )
}