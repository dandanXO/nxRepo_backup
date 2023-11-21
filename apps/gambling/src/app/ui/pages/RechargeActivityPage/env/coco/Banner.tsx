import { environment } from "apps/gambling/src/environments/environment"
import useBreakpoint from "../../../../hooks/useBreakpoint"

export const Banner = () => {
  const { isMobile } = useBreakpoint();
  return (
    <section className={"text-white font-bold overflow-hidden relative mb-4 md:mb-8 mt-6"}>
      <img className="rounded-lg w-full" src={`assets/${environment.assetPrefix}/h5_banner_2.png`} />
    </section>
  )
}

