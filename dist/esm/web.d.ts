import { WebPlugin } from '@capacitor/core';
import type { ScreenshotPlugin } from './definitions';
export declare class ScreenshotWeb extends WebPlugin implements ScreenshotPlugin {
    take(opts?: {
        saveToDisk: boolean;
    }): Promise<{
        base64: string;
    }>;
}
