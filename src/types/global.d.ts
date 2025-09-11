// global.d.ts

import type { TModuleFederationPlugin } from '@module-federation/typescript';

declare global {
  interface Window {
    [key: string]: any; // This allows dynamic string indexing on the window object
  }

  // Declare the Webpack globals to avoid 'Cannot find name' errors
  const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
  const __webpack_share_scopes__: { default: any };
}