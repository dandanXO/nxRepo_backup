export const Application = {
    isLocalhost: function () {
        return window.location.hostname === "localhost"
    },
    getEnvironmentName: function (){
        const envMachine = this.isLocalhost() ? "localhost" : "production";
        return `${envMachine}:${appInfo.COUNTRY}`;
    }
}