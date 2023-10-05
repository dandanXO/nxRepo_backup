import {PageOrModalPathEnum} from "../../../app/src/app/ui/PageOrModalPathEnum";

declare global {
  namespace Cypress {
    interface Chainable {
      visitApp(PagePathEnum: pagePathEnum): void;
    }
  }
}
