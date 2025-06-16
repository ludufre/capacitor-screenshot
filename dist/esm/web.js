import { WebPlugin } from '@capacitor/core';
import html2canvas from 'html2canvas';
export class ScreenshotWeb extends WebPlugin {
    async take(opts) {
        if (opts === null || opts === void 0 ? void 0 : opts.saveToDisk) {
            console.warn('ScreenshotPlugin: saveToDisk is not supported on web');
        }
        return await new Promise((ok, nook) => {
            html2canvas(document.getElementsByTagName('ion-app')[0]).then((ret) => {
                ok({ base64: ret.toDataURL().split(',')[1] });
            }, (err) => {
                nook(err);
            });
        });
    }
}
//# sourceMappingURL=web.js.map