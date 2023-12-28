import styled from "styled-components";
import cx from "classnames";

export type IFavoriteSection = {
  onClickFavorite: (event: any) => void;
  favorite: boolean;
  unfavoriteImg: string;
  favoriteImg: string;
  className?: string;
}
export const FavoriteSection = (props: IFavoriteSection) => {
  return (
    <div className={cx("absolute top-[4px] right-[4px] w-[32px] h-[32px] md:w-[40px] md:h-[40px]", props.className)}
      onClick={(event) => {
        event.stopPropagation();
        props.onClickFavorite && props.onClickFavorite(event);
      }}
    >
      <img
        alt={"favorite"}
        src={!props.favorite ? props.unfavoriteImg : props.favoriteImg}
      />
    </div>
  )
}
