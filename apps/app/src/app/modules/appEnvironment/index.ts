import { environment } from '../../../environments/environment';

export const AppEnvironment = {
  isLocalhost: function () {
    return window.location.hostname === 'localhost';
  },
  isDev: function () {
    return [
      "frontend.india-api-dev.com",
    ].indexOf(window.location.hostname) > -1;
  },
  getEnvironmentName: function () {
    let envMachine;
    if(this.isLocalhost()) {
      envMachine = 'localhost'
    } else if(AppEnvironment.isDev()) {
      envMachine = 'development'
    } else {
      envMachine = 'production'
    }
    return `${envMachine}:${environment.countryName}`;
  },
};
