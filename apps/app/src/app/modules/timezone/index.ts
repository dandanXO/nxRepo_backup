// NOTICE: refactor me
import moment from 'moment-timezone';
import {environment} from "../../../environments/environment";

moment.tz.setDefault(environment.timezone);
