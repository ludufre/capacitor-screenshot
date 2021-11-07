import { WebPlugin } from '@capacitor/core';

import type { ScreenshotPlugin } from './definitions';

export class ScreenshotWeb extends WebPlugin implements ScreenshotPlugin {
  async take(): Promise<{ base64: string }> {
    throw new Error('Method not implemented.');
  }
}
