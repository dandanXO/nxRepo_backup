import { environment } from "apps/gambling/src/environments/environment"
import cx from 'classnames';
import { ArrowRightOutlined } from "@ant-design/icons/lib/icons";
import { DesktopGameItemButton } from "../components/DesktopGameItemButton";

interface IPlayButton {
  onClick: () => void;
}
export const PlayButton = (props: IPlayButton) => {
  return (
    <DesktopGameItemButton
      onClick={props.onClick}
      className={cx(" bg-gradient-to-r from-[#FFF600] to-[#4FFB0C] rounded-lg text-[#0b0e11]")}
    >
      <span>Jogar</span>
      <ArrowRightOutlined className={"ml-1 relative top-[1px]"} />
    </DesktopGameItemButton>
  )
}