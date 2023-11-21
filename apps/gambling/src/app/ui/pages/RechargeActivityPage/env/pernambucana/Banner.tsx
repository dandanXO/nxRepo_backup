import { environment } from "apps/gambling/src/environments/environment"
import useBreakpoint from "../../../../hooks/useBreakpoint"

export const Banner = () => {
  const { isMobile } = useBreakpoint()
  return (
    <section className={"sm:rounded-3xl text-white font-bold overflow-hidden relative mb-8 mt-4"}>
      {isMobile ? (
        <>
          <img className="w-full" src={`assets/${environment.assetPrefix}/h5_banner_2.png`} />
          <div className={"mt-5 xl:mt-20 absolute left-[22px] top-[6px] text-white"}>
            <div className={"text-2xl text-[#ffffff]"}>
              Benefícios-ofertasde deposito
            </div>
            <div className={"text-5xl mt-2 text-[rgba(255,239,1)]"}>
              Ate 10% bônus
            </div>

          </div>
        </>
      ) : (
        <>
          <img className="w-full" src={`assets/${environment.assetPrefix}/banner3.png`} />
          <div className={"mt-5 xl:mt-20 absolute left-[28%] top-[20%] transform translate(-50%, -50%) text-white text-center"}>
            <div className={"text-5xl text-[rgba(255,239,1)]"}>Benefícios-ofertasde deposito</div>
            <div className={"text-5xl text-[rgba(255,239,1)]"}>Ate 10% bônus</div>
          </div>
        </>
      )}
    </section>
  )
}

