import { environment } from '../../../environments/environment';

export const AppEnvironment = {
  isLocalhost: function () {
    return window.location.hostname === 'localhost';
  },
  getEnvironmentName: function () {
    const envMachine = this.isLocalhost() ? 'localhost' : 'production';
    return `${envMachine}:${environment.countryName}`;
  },
};
