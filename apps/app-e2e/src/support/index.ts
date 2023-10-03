import {PageOrModalPathEnum} from "../../../app/src/app/presentation/PageOrModalPathEnum";

declare global {
  namespace Cypress {
    interface Chainable {
      visitApp(PagePathEnum: pagePathEnum): void;
    }
  }
}
