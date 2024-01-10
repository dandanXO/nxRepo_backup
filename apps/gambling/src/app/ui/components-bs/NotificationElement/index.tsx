import { renderByUVersion } from "../../utils/renderByUVersion";

import { NotificationElement as RioNotificationElement } from './env/riojungle'

export const NotificationElement = renderByUVersion({
  "u2": RioNotificationElement
}, RioNotificationElement)
