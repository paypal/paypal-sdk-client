import { setupLogger } from './logger';
import { getSDKScript } from './script';

export function setupClient() {
    getSDKScript();
    setupLogger();
}