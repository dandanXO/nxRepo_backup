* India 登入頁面
  * 需要參數
    * appName=Oasis
    * appID=com.api
    * appDomain=https://www.oasis-gold.com
  * example
    * https://frontend.india-api-dev.com/v2/login?appName=Oasis&appID=com.api&appDomain=https://www.oasis-gold.com

---
- 差異化
  - 元件差異化看能不能找到靈感
    - [bit.dev](https://bit.dev/)
- css
  - 使用 tailwind，在合理情況下去使用指定 px
  - [tailwind 常用類別](./docs/TAILWIND.md)
- UI/UX
  - 按鈕可點擊範圍盡量合理加大
  - [區分 select, listbox ]https://www.nngroup.com/articles/listbox-dropdown/
- typescript
  - 開啟 strict 模式
  - [Typescript strict](./docs/TYPESCRIPT.md)
- react
  - side effect
    - 盡量不去使用 useEffect 完成功能，而用 redux + redux saga 使用
  - state
    - rtk 有 immer 去改變 redux 狀態
    - ~~複雜邏輯 使用 xstate 去建構 state, event 改變 state 與 context~~
  - actions
    - 使用 rtk createAction 去建構事件
    - ~~再更複雜頁面邏輯使用 xstate 或是後續再引用 rxjs~~
  - API
    - 使用 rtk query OpenAPI 去產生後端 API 對應的 typescript interface。
      - 發生錯誤時，請與後端確認 swagger model 不能為中文名字，否則工具無法產生對應 ts file
  - Pages/Modals
    - 切換 page, modal 使用 saga 控制，來控制整個流程
  - react-icons
    - [React Icons Imports everything even when included 2 or 3 icons #154](https://github.com/react-icons/react-icons/issues/154#issuecomment-895976123)
    - [Doesn't tree shake when bundled with Webpack and Create React App #574](https://github.com/react-icons/react-icons/issues/574)
    - [release @react-icons/all-files #593
      ](https://github.com/react-icons/react-icons/issues/593)
- react-router
  - 得使用 react-router 的 useNavigate 做跳轉以及 useLocation
    - 因使用 redux-react-router ，所以不能 import react-router-dom 的 useNavigate
- Core Library
  - 初期先不使用 storybook
- e2e testing
  - 根據重要或複雜情境撰寫 cypress e2e testing
  - 使用 mocha 方式建構測試案例 describe, it，未來再考慮使用 cucumber 去 BDD
  - 使用 testing library 方式 query
    - [About Queries](https://testing-library.com/docs/queries/about)
  - 使用 chai, sinon chai 方式 assert
  - 未來再考慮使用 BDD, ATDD 方式改變開發流程
- 監控部分
  - sentry
- Martech
  - ~~mixpanel~~

---

- other issues
  - [【Day16】滾動條 - 避免滾動穿透(Lock Scroll Chaining)](https://ithelp.ithome.com.tw/articles/10301290?sc=iThelpR)

---

- Pure H5
  - 下拉刷狀態沒管理好會失效
