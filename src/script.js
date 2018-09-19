/* @flow */

import { getScript, inlineMemoize } from 'belter/src';

import { SDK_SETTINGS } from './constants';
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
    stageHost : ?string
};

export function getSDKSettings() : SDKScriptSettings {
    return inlineMemoize(getSDKSettings, () => {
        let sdkScript = getSDKScript();

        return {
            clientToken:          sdkScript.getAttribute(SDK_SETTINGS.CLIENT_TOKEN),
            partnerAttributionID: sdkScript.getAttribute(SDK_SETTINGS.PARTNER_ATTRIBUTION_ID),
            stageHost:            sdkScript.getAttribute(SDK_SETTINGS.STAGE_HOST)
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

export function getPartnerAttributionID() : ?string {
    return getSDKSettings().partnerAttributionID;
}

export function getStageHost() : string {
    return getSDKSettings().stageHost || getDefaultStageHost();
}
