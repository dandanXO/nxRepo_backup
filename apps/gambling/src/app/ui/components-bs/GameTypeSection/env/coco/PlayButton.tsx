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
     <img className="w-[64px] h-[64px]" src={`assets/${environment.uVersion}/icon=play.png`} alt="play" />
    </DesktopGameItemButton>
  )
}
