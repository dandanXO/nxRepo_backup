import { renderByUVersion } from "../../utils/renderByUVersion";

import { NotificationElement as RioNotificationElement } from './env/u2'

export const NotificationElement = renderByUVersion({
  "u2": RioNotificationElement
}, RioNotificationElement)
