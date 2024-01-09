import { renderByPlatform } from "../../utils/renderByPlatform";

import { NotificationElement as RioNotificationElement } from './env/riojungle'

export const NotificationElement = renderByPlatform({
  "u2": RioNotificationElement
}, RioNotificationElement)
