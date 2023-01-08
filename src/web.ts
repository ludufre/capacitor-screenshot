import { WebPlugin } from '@capacitor/core';
import html2canvas from 'html2canvas';

import type { ScreenshotPlugin } from './definitions';

export class ScreenshotWeb extends WebPlugin implements ScreenshotPlugin {
  async take(): Promise<{ base64: string }> {
    return await new Promise((ok, nook) => {
      html2canvas(document.getElementsByTagName('ion-app')[0] as HTMLElement).then(ret => {
        ok({ base64: ret.toDataURL().split(',')[1] });
      }, err => {
        nook(err);
      });
    });
  }
}
