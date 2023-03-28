import {IndexPageProps} from "../../../store";

type Props = IndexPageProps;

export const ADBannerSection = (props: Props) => {
  const onClick = (url: string) => {
    window.location.href = url;
  }
  return (
    <div className={"flex flex-col"}>
      {props.state.openIndexAPI?.banners.map((banner, index) => {
        return (
          <div key={index} data-testing-id="adBanner" className={"ad-banner"}>
            <img className={"rounded-lg bg-green-800 p-10 text-center text-white"} src={banner.imageUrl} onClick={() => onClick(banner.jumpUrl || "")}/>
          </div>
        )
      })}
    </div>

  )
}
