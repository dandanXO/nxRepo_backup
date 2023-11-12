import {IOpenNotificationWithIcon} from "../ui/pageTemplate";

export const promiseHandler = {
  then: (response: any, done: () => void, openNotificationWithIcon: (props: IOpenNotificationWithIcon) => void) => {
    if((response as any).data.code !== 200) {
      // alert((response as any).data.msg);
      openNotificationWithIcon({
        // message: (response as any).data.msg,
        description: (response as any).data.msg,
      })
    } else {
      done()
    }
  }
}
