
// NOTE: Just for testing
// https://redux-toolkit.js.org/api/createAsyncThunk
// export const refreshToFetchLoanQuota = createAsyncThunk("/api/v2/loan/quota/refresh",
//   async (arg: null, thunkAPI) => {
//
//     const parsedQueryString = queryString.parse(window.location.search);
//     const token = parsedQueryString.token
//       ? (parsedQueryString.token as string)
//       : "";
//
//     const response = await fetch(`/api/v2/loan/quota/refresh`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: token,
//         Authorization: "45d9ab38654247e88406fa06308fa604",
//       }
//     })
//     const data = await response.json() as PostLoanQuotaRefreshResponse;
//     console.log("refreshToFetchLoanQuota.data", data)
//     if (response.status < 200 || response.status >= 300) {
//       return thunkAPI.rejectWithValue(data)
//     }
//     return data
//   },
//   {
//     condition: (data, { getState, extra }) => {
//       console.log("refreshToFetchLoanQuota.condition.data", data)
//       console.log("refreshToFetchLoanQuota.condition.getState", getState())
//       console.log("refreshToFetchLoanQuota.condition.extra", extra)
//       return true;
//     },
//   }
// )
