export { homeHash, homeLink, liveMonitorLink } from "./pages";

export const solscanApiGetAccount = "https://api.solscan.io/account?address=";
export const buildUriSolscanApiGetHolders = (nftAddress) =>
  `https://public-api.solscan.io/token/holders?tokenAddress=${nftAddress}&offset=0&limit=1`;
export const solscanUrl = "https://solscan.io/token/";
export const lineBreakCode = "%0A";
export const solscanLinkToAccount = 'https://solscan.io/account/';