import {PagePathEnum} from "../../../app/src/app/presentation/pages/PagePathEnum";

declare global {
  namespace Cypress {
    interface Chainable {
      visitApp(PagePathEnum: pagePathEnum): void;
    }
  }
}
