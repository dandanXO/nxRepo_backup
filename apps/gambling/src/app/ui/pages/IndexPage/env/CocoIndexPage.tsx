import cx from "classnames";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../../hooks/useBreakpoint";
import {GameTypeSectionList} from "../../../components/GameTypeSection";
import {Input} from "../../../components/Input";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {environment} from "../../../../../environments/environment"
import {IndexTabs} from "../IndexTabs";
import FakeBanner from "./FakeBanner.png";

export type TTotalFavoriteLocalState = {
  local: { [key: number]: number [] },
  localArr: {
    [key: number]: {
      gameId: number,
      name: string,
      img: string,
      label: string,
      type: string
    }[]
  }
}

type ICoco777betIndexPage = {
  allGameList: any;
  totalFavoriteLocalState: any;
  setTotalFavoriteLocalState: (value: any) => void;
  label: any;
  activeTab: any;
  setActiveTab: (value: any) => void;
  setViewType: (value: any) => void;
  setSearchInput: (value: any) => void;
  gameList: any;
}

export const CocoIndexPage = ({
                                              allGameList,
                                              totalFavoriteLocalState,
                                              setTotalFavoriteLocalState,
                                              label,
                                              activeTab,
                                              setActiveTab,
                                              setViewType,
                                              setSearchInput,
                                              gameList
}:ICoco777betIndexPage) => {
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();

  return (
    <>
      <div className={cx("w-full",
        "max-h-[160px] md:h-[400px] bg-[red]",
        {
        // "w-[calc(100vw-265px)] ml-20": !isMobile,
        // "p-4": !isMobile,
      })}>
        {/*<AppCarousel />*/}
        <img src={FakeBanner}/>
      </div>

      <div className={"p"}>
        {isMobile ? (
          allGameList !== undefined && allGameList.map((i: any, index: number) => {
            return (
              <GameTypeSectionList
                key={index}
                totalFavoriteLocalState={totalFavoriteLocalState}
                setTotalFavoriteLocalState={setTotalFavoriteLocalState}
                gameTypeName={i.gameType}
                data={i.data.games}
                onClick={()=>navigate(PageOrModalPathEnum.IndexSlotPage)}
              />
            )
          })
        ):(
          // green border
            <section
              // style={{ border: '1px solid #2CFD99' }}
              className={cx(
                // "border-solid",
                // "rounded-lg",
                // "bg-[rgba(1,62,66,0.6)]",
                "flex flex-col",
              )}
            >
              <section
                style={{borderBottom: '1px solid rgb(44, 253, 153)'}}
                className="mb-4 flex flex-row items-center px-4 w-full"
              >
                <div className="mr-2 grow">
                  <IndexTabs activeTab={activeTab} label={label} setActiveTab={setActiveTab} setViewType={setViewType}/>
                </div>

                <div className="shirnk-0 grow-0 basis-[150px]">
                  <Input
                    className="bg-[#069D5C] items-baseline"
                    prefix={<img src={`assets/${environment.assetPrefix}/icon_24.png`}
                    placeholder={"Pesquisar nome do jogo"} />}
                    onChange={(event: any) => {
                      setSearchInput(event.target.value)
                    }}
                  />
                </div>
              </section>

            <section className={"flex flex-col"}>
              {gameList()}
            </section>

          </section>
        )}
      </div>
    </>
  )
}
