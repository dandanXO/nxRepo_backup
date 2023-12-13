import cx from "classnames";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import { appSlice } from "../../../../../../reduxStore/appSlice";
import { environment } from "../../../../../../../environments/environment";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../reduxStore";
import { usePageNavigate } from "../../../../../hooks/usePageNavigate";
import { MobileMenuLink } from "../../components/MobileMenuLink";
import { CocoAvatar } from "../../../../../components/Avatar/CocoAvatar";
import { AppLocalStorage } from "../../../../../../persistant/localstorage";
import {InviteCopySection} from "../../../../../pages/InvitePage/HowToInviteTabSection/env/coco/InviteCopySection";
import {uiSlice} from "../../../../../../reduxStore/uiSlice";
import {CopyIcon} from "../../../../../components/Icons/CopyIcon";
import {MobileMenuItem} from "./MobileMenuItem";
import {AppLocalStorageKey} from "../../../../../../persistant/AppLocalStorageKey";


export const MenuDrawerContent = () => {
  const location = useLocation();
  const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
  const {
    onClickToFirstDeposit,
    onClickToDepositCashback,
    onClickToInvite,
    onClickToVipGrade,
    onClickToCheckInDaily,
    onClickToTelegram,
  } = usePageNavigate();


  const dispatch = useDispatch();
  const closeMenuDrawer = () => {
    dispatch(uiSlice.actions.setOpenMenuDrawer(false));
  }

  return (
    <>
      <div className="user-info flex flex-col justify-center items-center mb-4">
        <CocoAvatar />
        {userInfo.user_id && <div className="user-info flex mt-2 items-center">
          <p className="user-name text-white font-bold">G{userInfo.user_id}</p>
          <div className="mx-1 text-[#595656] text-xs">|</div>
          <div className="user-code flex text-xs text-[#fcc04f] items-center" >
            <p>ID:{userInfo.user_id || ''}</p>
              <CopyIcon copyText={userInfo.user_id || ''}/>
          </div>
        </div>
        }
      </div>

      <MobileMenuItem
        text={'Canal De Telegram'}
        className={`after:bg-[#2E45DA] justify-between`}
        iconSuffix={true}
        icon={<img className="w-[25px] h-[25px]" alt={"telegram"} src={`https://m.wild777bet.com/assets/bar1_tel-dfc5b7e5.png`} />}
        onClick={() => {
          onClickToTelegram();
          closeMenuDrawer();
        }}
      />
      <MobileMenuItem
        text={'Primeiro depósito +20%'}
        className={`after:bg-[#DF4444]`}
        onClick={() => {
          onClickToFirstDeposit();
          closeMenuDrawer();
        }}
      />
      <MobileMenuItem
        text={'Recarregar Cashback +10%'}
        className={`after:bg-[#21C18C]`}
        onClick={() => {
          onClickToDepositCashback();
          closeMenuDrawer();
        }}
      />
      <MobileMenuItem
        text={'Recompensa de check-in'}
        className={`after:bg-[#8F2EDA]`}
        onClick={() => {
          onClickToCheckInDaily();
          closeMenuDrawer();
        }}
      />
      <MobileMenuLink
        text={'Bónus de Convite'}
        className="text-[#838ca0] mt-2"
        icon={<img className="w-[16px] h-[16px] mr-2" alt={"invite"} src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAfCAYAAABgfwTIAAAAAXNSR0IArs4c6QAACKNJREFUGBkFwVuMpmddAPDf/33f77SzMzvTYbdsD7RASlsOchClpKgl6Q1XcmuMxnChiYkaL8QLYxSvJEavSBO8UaNcIUIIJho8BA+xkIguSCRpXZay7badnfN8M/N97/M8f3+/AID8t89ulouj3+i66GUdW61TN29eDH/z8hftX556/49fcb6sXHA2XY3PLx7u3xNf7o7rAzh3dVrLG+f32wsHPz+9ttizOczMdK480PvCXyzv33yiW/zhJ57f+M43dsVibdLP9f1BfPyP/hwABgDQ168OV64+JyB1mzP2KnvLP/C2t62M5zNRmhhSN5bJt+rCIzcGQ1DblstBN/Fw9+7jW/bjQpTBOkJ30ucHPnj5lq//U3jxsQ0f+CB7h0AX8puffXd85Lc/DTAA5Hf/9FOyPac0Ikhsbaa//49wPk7JqdfvEUkGyyL7Bd3bxWxgXVlMOO+4c9y7yKsmgUSIzY2rhqn2lRd1H/kUi6A1BJG/ld994a/ifb/6HRggMyNf+uJnYhKUJLGx4OCN8PLrTOe88TqlkElLTs+Z7jLMmUxphemMvmhv7umOzplP0GiYDGxf1f3PbX50nyee5OiERCA2PoefhgGUbzwfm1uPyGAWRLC9SP/97XT/tDMvLE9ohdpolcMl80oM9DMi6GcYxN27vHnAYk5rZKMl45q9U/73JT76DHWgNQI5/FQe/uX7Y+cXbg1wuF59fGe6Sy4R9BM5tOrVuxnDonP9OllphZaUSn9V7uyIKOSIQo7kKHZ2MGPe0yo1SXQ4KfL/botcsdikrMhk0nH5xPO4NcDleP4hdslGJP1UnN/nzb3Ozlt41xOMazJJZHJRxfWZcEY9J5O6FJa87z20KQMCGUQwn3Hyd9z5IWf36R4mR6B1TOrH8MdDZnYO/vFJ7VX0JLopJ2/2lkvyOkfHjCsSkI1lYzaRdSGyI5PsRV1ydEybMkECArM5QZws5dm+2LpOXiAoST88CYP9WzfVuzfkHIDWy/P9iHWjFI4PGddAoiWnI1dmtC2yo1VMqGcc7LPqmUCS0BimrEfWyfI+m0vqEtDRvDWPXtgZ3P7Wde/srrg4RhCoWB02JTsXF+xf0Bqt0hqSwxU5oT1CN6DR99q6ituviWHCJGhJJtmIntMlsyYuD1MehXKKhqDvd9w7uj7YeW3bxSbjSHRArRmXB6s8G+dOSlityEptlMrYOD7n40+ws8W6ED2rXjx0Q3t6R/e1l9iaykzRmmxNZJVHI8OY3fKoqoeDcooEsqPrtwfKlsv7ZCBJnJ6Evg8/9xMproUYySSDbJSUXeqeeZTWMZuxeZXTQ7E58Gsf037yUbG7KWsFmUmS2dFdpjmOX2VsSBI9xWRzsLwz1y+QSOAymUzn8VTS75MdEBCoopvgCm1TfW3P5fdecuXZd4npNtNj3bPEA0kJIgBBh7rRuX/SOX6NviMBXWdo591gMQ+TCQmBRCBZXZABgESHEYXZjI2bTv/k88oLX9d9/hctfvk35fiKPD0VfVASgEAiMO2YzgkkAuWAjWcXg62bnzSdUXskgQRAICEASSTZEQPS8PCO7kan29lG0fVzce1xtrcYG4kAAAAARFB2Wa2fHfzw8K+d7T/m4uCjDMgkkABIAKCODDM+dCNspf69T1puNJsf+wDOOTvh1r+k3Q1aJBFkyEACAADjyI0bL3rrW788xDOf+1L+0pVXfGjxLWcdkgyysLViCGojGwnJuGZ6hff+DOsj8sLkIz+mHd/XX39Qnr/OD/5VnCzICNEhgC5YJUeNrieSRB2ZzH4nfvf4xQE8PtnXbXEFMqgMc16+xhHmE4aeCGA1MunJMya3LT7xqMXP/jpnxwx3ZVmLbz8SthdkIRutyLYmgt2rvLOJuiYDSY/TVjk2gJu7+8bh0GAHxCVbm9x6mle2eHSTfkrXkyjJRZX/vJbPvCaPiEBge59/uND957NsBnVNXVPWIht397Sni/hwx9EROUHKkuJmOYQB4lduH+cLT90zGXbUSi4YKjeW5C5vn9ISDYikhvgq+ZWV0EQraKxGQ3Y88yC10Cqtko3phFbFg/fEvKMf0IO41p360hv7MAAYhj39gI5szLBZ+a8jpoV+SvREI5GVkrqStJFWKIVaMHK0T1lRCnWkrGmVV/fkcxtiFsSU6IDSznz44VNfe9kAoO/viQlD0hqzYAeXI4fnzJLokWTSKq1QC7VQC+OatmZcU9asLxnXlBXjBau1zCZuPkBfGCYIJHU49HvfPfX7DADWy3u2rzKu6TpaY2vk2oyHdpgM6MhGJInWyEprZKNVWqEUaqEVaqGO1Ma6cOcOWxiDYQpkMJT9CAkDQJtt3unGQj8hkCPXkis91zYYEEEgIQGIJBuSTDQgG5lo9APLtTh7ky00DB0RrJN1OQEYALqnHztxcM7BKZMeHds9Q+OVQ67O6IIIMsmGRKNVstAqrZGVbLRKFrLSBXtLGSuxfQ1rho7VyOaUB292fA8MAG6+5cRDyZ09Xt2ndWwm8+T+mqFHIMkkk1ZohdpoI61QC2VNLdQ1tdBGsnL3RD6V7ExEadTC7jXe/ShXZpcAA4Bx/QPR8fgNKt484MFkN/hOADqykmhJbZRKKdSRumYcKSvKJesVdU25wBqnPP6Y2J3xo0s2N3j6UYaB8/PvAwwA9HdpF8a68NAOZ5dcrPjkirfPZY8+6TsZIZLUCzOiiWxkpRVylG0Utco6sl6xXMmOeG7ByQU54eFdZgPna4a4CzAAxBN/tpe3P3XPurzDdOCBDe6dcHOfJ09FCzS6EIIIARFEEBBERxIJKXTknLYQEdxfcoBrV9hesCr0QS23AAYAUHxaXz+jm77DtcXSwfn3XWQ4vyCRkVpNANGlkGRKQKupYaLRpRpNF01IXRId87i0PX/SbPIu6/qqVv82nvrCvwMAAAAAAAAAAAAAAAAAAAAAAACA/wfUYruhMAktLAAAAABJRU5ErkJggg==`} />}
        onClick={() => {
          onClickToInvite();
          closeMenuDrawer();
        }}
      />
      <MobileMenuLink
        text={'Introdução ao nível VIP'}
        className="text-[#838ca0]"
        icon={<img className="w-[16px] h-[16px] mr-2" alt={"vip"} src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAfCAMAAABXofT6AAAAAXNSR0IArs4c6QAAAR1QTFRFAAAAgICfgICZiYmdgI+fgIymgIuihZCbgIqfhY+jf4ihho2hg4mdhoyfhYuigoyfhI2egoqfhIyggo6ig4uegY2ggYyfg42fg42hhIuhg4yfhI2fhIyggo2gg42ggoyhgouhg4yghI2hg4yghI2gg4ughIyhg42fgoygg4uhgoyggoyfgoufg4yggo2ghIyfg4ugg4ufg42hg42ghIyhg4ygg4ugg4ygg4ygg4yhg4yggougg4yhg4yggoygg4ygg4ygg4ufg4ygg4ygg4ygg4ygg4yhg4ygg4yggoyggoygg4yhhIygg4ygg4yhg4ygg4ygg4ygg4ygg4ygg4ygg4ugg4ygg4ygg4ygg4ygg4ygg4ygg4ygg4ygg4ygEeXUbwAAAF50Uk5TAAgKDRAUFhcYGR4mJygsNTo9Pj9CQ0VKTE9QVVteaWpscXJzdHl6fYGCg4WNjo+VlpianJ2eoaSnqqusra+ys7vAwcnKzNDR1NXX2Nvc4OPk5efo6ers9vj5+vv8/WtwqO4AAAEMSURBVBgZhcEHO0JhAIbhxyy7hOysrJC9skJGw04J7///Gb7vVK6kzrlvHFN3by+NvD6fdlAVUHNpqnJyMU3ZtNx8tGC1FuRqG2tXHnqBPnm5Aq7laYJReXsgKm/fdBblaQuG5SWNsSR3pS6sM1Wsx1WVj12qIkRZVo4IzKqs5IOUHHNUdMvhA5JyhIF9Wcf8GpN1CLQVZGwD/ncZGWqsypoEwpIeMVIyvvzUOpfVCexI/cCKrCH+epJxi5FbAwZkRanTIytGRV7GEf+MywrgSMi4oYEFGcUQxoaMQjuNJGRdLMczsoI0llWNCE34PvXrgKZGVHWPi0WVFX24OZEjiLukjBm8zO9tDlLnB2Kz7twF+fVjAAAAAElFTkSuQmCC`} />}
        onClick={() => {
          onClickToVipGrade();
          closeMenuDrawer();
        }}
      />
      <InviteCopySection/>
    </>
  )
}
