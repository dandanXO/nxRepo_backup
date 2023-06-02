import {Moment} from "moment";

export function formatDate(moment: Moment) {
  return moment.format('DD-MM-YYYY');
}
