import unFavorite from './unfavorite.png'
import Favorite from './favorite.png'
import { FavoriteSection as FavoriteSectionContainer } from '../components/FavoriteSection'

export const FavoriteSection = (props: any) => {
  return (
    <FavoriteSectionContainer
      // className={`w-[32px] md:w-[40px]`}
      {...props}
      unfavoriteImg={unFavorite}
      favoriteImg={Favorite}
    />
  )
}
