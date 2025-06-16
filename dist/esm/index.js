import { registerPlugin } from '@capacitor/core';
const Screenshot = registerPlugin('Screenshot', {
    web: () => import('./web').then(m => new m.ScreenshotWeb()),
});
export * from './definitions';
export { Screenshot };
//# sourceMappingURL=index.js.map