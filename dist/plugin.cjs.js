'use strict';

var core = require('@capacitor/core');
var html2canvas = require('html2canvas');

const Screenshot = core.registerPlugin('Screenshot', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.ScreenshotWeb()),
});

class ScreenshotWeb extends core.WebPlugin {
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

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ScreenshotWeb: ScreenshotWeb
});

exports.Screenshot = Screenshot;
//# sourceMappingURL=plugin.cjs.js.map
