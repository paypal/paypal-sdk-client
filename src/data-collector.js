export const FRAUDNET_FNCLS = "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99";
export const FRAUDNET_APP_NAME = "SMART_PAYMENT_BUTTONS";

export const loadDataCollector = async (options) => {
  const configScript = document.createElement("script");
  configScript.setAttribute("nonce", options.cspNonce);
  configScript.setAttribute("type", "application/json");
  configScript.setAttribute("id", "fconfig");
  configScript.setAttribute("fncls", FRAUDNET_FNCLS);
};
