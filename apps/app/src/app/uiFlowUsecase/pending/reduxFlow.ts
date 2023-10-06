// // React Component User Action State: select, input
// // React Component RecommendProducts: api response product list -> (option)1. api response product list (component) -> (option) 2.redux
// // Form Validation
// // API Response:
//
// /*
// api formData , component(form, page)
//
// model viewModel view
// model controller view
// model controller view(form-formData, page)
// redux component(form-useState, page)
// redux presentation(container, connect, formData-> formDataresponse) component;
//
// redux(reducer: rtk api, modal, pages, createSsyncThunk->data ), page, modal, component(flow), formData, formValidation
// redux-saga->redux, flow.
//
// componeet( useEffet=>dispatch("").then(data))
// componeet( useEffet=>dispatch(IndexCreateAsyncThunk("page")).then(data))
//
// code: 200,
// records: {
//   data: {
//     name: "1",
//   }
// }
// // appStore.dispatch(API.endpoints.getUserProcess.initiate({}))
// // yield put(appStore.dispatch(API.endpoints.getUserProcess.initiate({})))
//
// const responseData = useSelector(state => state.api.queries["getLoanRecordList"]);
// const responseData = useSelector(state => state.api.mutation["submit"]);
// const responseData = yield select(state => state.api.queries["getLoanRecordList"]);
// const responseData = yield select(state => state.api.mutation["submit"]);
// */
//
// // dynamicReduxModule
// // sharedModule
// // inModule
// // bdModule
// // pkModule
// const inModule = {
//   // component: {
//   //
//   // },
//   indiaPage: {},
// };
//
// const bdModule = {};
//
// const reducer = {
//   modalReducer: {
//     apiModal: {
//       zIndex: 0,
//       show: false,
//       data: {},
//     },
//     modal1V1: {
//       zIndex: 0,
//       show: false,
//       data: {
//         b: 1,
//       },
//     },
//     // modal1V2: {
//     //   zIndex: 0,
//     //   show: false,
//     //   data: {
//     //     a: 1,
//     //   }
//     // },
//     // modal2: {
//     //   zIndex: 0,
//     //   show: false,
//     //   data: {}
//     // },
//   },
//   pageReducer: {
//     indexPage: {
//       // 之後移除
//       api: {
//         indexResponse: {},
//         openIndexResponse: {},
//       },
//       // 比較常見
//       computed: {
//         recommendedProduct: {},
//       },
//       // 比較少需要
//       components: {
//         header: {},
//         footer: {},
//         component1: {
//           // 資料不同
//           shard: {},
//           in: {},
//           bd: {},
//           pk: {},
//         },
//         component2: {
//           // 資料相同
//           shard: {},
//         },
//         component3: {},
//       },
//     },
//     page2: {},
//   },
//   module: {
//     appInfo: {
//       packageId: {},
//     },
//     theme: {},
//   },
//   // repository: {
//   //
//   // },
//   modelReducer: {
//     user: {},
//     order: {},
//     risk: {},
//   },
//   apiReducer: {
//     getIndexPage: {},
//     getOpenIndexPage: {},
//   },
// };
