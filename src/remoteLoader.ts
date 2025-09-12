// src/remoteLoader.ts
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: any };

export async function loadRemoteComponent(remoteName: string, module: string) {
  const container = (window as any)[remoteName];
  if (!container) {
    throw new Error(`Remote ${remoteName} not found on window`);
  }

  // Ensure sharing is initialized
  await __webpack_init_sharing__('default');
  if (!container.__initialized) {
    await container.init(__webpack_share_scopes__.default);
    container.__initialized = true; // avoid double init
  }

  // Load the exposed module
  const factory = await container.get(module);
  return factory();
}
