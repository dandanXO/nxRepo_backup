import { i18nComponent } from "./i18nComponent";

export const i18nCommon: i18nComponent = {
    namespace: 'common',
    translation: {
        "zh-CN": {
            menu: {
                homePage: '首页',
                currentDayOverdueCall: '当日催收',
                currentDayOverdueCallList: '当日电催列表'
            }
        },
        "en-US": {
            menu: {
                homePage: 'Home',
                currentDayOverdueCall: 'CurrentDay Collection',
                currentDayOverdueCallList: 'CurrentDay Overdue Call List'
            }
        }
    }
}
