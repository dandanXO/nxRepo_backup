import styled from "styled-components";
import cx from "classnames";
import {AssetMappingCoco} from "../../../../../../assets/assetMapping.coco";

const StyledFavoriteSection = styled.div.attrs((props) => ({
  className: cx("absolute top-[4px] right-[4px]", props.className)
}))<{
  className?: string;
}>`
  margin: 8px 8px 0 0;
  width: 30px;
  height: 30px;
`

export type IFavoriteSection = {
  onClickFavorite: (event: any) => void;
  favorite: boolean;
}
export const FavoriteSection = (props: IFavoriteSection) => {
  return (
    <StyledFavoriteSection
      onClick={(event) => {
        event.stopPropagation();
        props.onClickFavorite && props.onClickFavorite(event);
      }}
    >
      <img
        alt={"favorite"}
        src={!props.favorite ? AssetMappingCoco.game.unfavorite : AssetMappingCoco.game.favorite}
      />
    </StyledFavoriteSection>
  )
}
