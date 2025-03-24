export function getIsElectron(): boolean {
    return navigator.userAgent.toLowerCase().indexOf(" electron/") > -1;
}
