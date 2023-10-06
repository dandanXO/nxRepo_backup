import { environment } from '../../../environments/environmentModule/environment';

export const AppEnvironment = {
  isLocalhost: function () {
    return (
      window.location.hostname === 'localhost' ||
      window.location.hostname.indexOf('192.168') > -1
    );
  },
  isDev: function () {
    // NOTICE: refactor me
    return (
      [
        'frontend.india-api-dev.com',
        'frontend.mx-api-dev.com',
        'frontend.ph-api-dev.com',
      ].indexOf(window.location.hostname) > -1
    );
  },
  getEnvironmentName: function () {
    let envMachine;
    if (this.isLocalhost()) {
      envMachine = 'localhost';
    } else if (AppEnvironment.isDev()) {
      envMachine = 'development';
    } else {
      envMachine = 'production';
    }
    return `${envMachine}:${environment.countryName}`;
  },
};
