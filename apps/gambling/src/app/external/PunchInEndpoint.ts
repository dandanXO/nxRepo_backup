import { ExternelEndpoint } from "./types";
import { POST_PUNCH_IN_URL } from "./ApiUrl";


const PostPunchInEndpoint = (builder: ExternelEndpoint) => builder.mutation({
  query: () => ({
    method: 'post',
    url: POST_PUNCH_IN_URL
  })
})

export {
  PostPunchInEndpoint
}
