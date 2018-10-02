/* @flow */

import { getScript, inlineMemoize, parseQuery } from 'belter/src';
import { SDK_SETTINGS, SDK_QUERY } from 'paypal-sdk-constants/src';

import { getHost, getPath, getDefaultStageHost } from './globals';

export function getSDKScript() : HTMLScriptElement {
    return inlineMemoize(getSDKScript, () => {
        let { host, path } = { host: getHost(), path: getPath() };
        let script = getScript({ host, path });

        if (!script) {
            throw new Error(`PayPal Payments SDK script not present on page! Excected to find <script src="https://${ host }${ path }">`);
        }

        return script;
    });
}

type SDKScriptSettings = {
    clientToken : ?string,
    partnerAttributionID : ?string,
    stageHost : ?string,
    apiStageHost : ?string
};

export function getSDKSettings() : SDKScriptSettings {
    return inlineMemoize(getSDKSettings, () => {
        let sdkScript = getSDKScript();

        return {
            clientToken:          sdkScript.getAttribute(SDK_SETTINGS.CLIENT_TOKEN),
            partnerAttributionID: sdkScript.getAttribute(SDK_SETTINGS.PARTNER_ATTRIBUTION_ID),
            stageHost:            sdkScript.getAttribute(SDK_SETTINGS.STAGE_HOST),
            apiStageHost:         sdkScript.getAttribute(SDK_SETTINGS.API_STAGE_HOST)
        };
    });
}

export function getClientToken() : string {
    let { clientToken } = getSDKSettings();

    if (!clientToken) {
        throw new Error(`Expected data-client-token="xyz" to be passed with client token, to ${ getSDKScript().outerHTML }`);
    }

    return clientToken;
}

export function getScriptQueryParams() : { [string] : string } {
    let script = getSDKScript();
    return parseQuery(script.src.split('?')[1] || '');
}

export function getClientID() : string {
    return getScriptQueryParams()[SDK_QUERY.CLIENT_ID];
}

export function getPartnerAttributionID() : ?string {
    return getSDKSettings().partnerAttributionID;
}

export function getStageHost() : string {
    return getSDKSettings().stageHost || getDefaultStageHost();
}

export function getAPIStageHost() : string {
    return getSDKSettings().apiStageHost || getStageHost();
}
