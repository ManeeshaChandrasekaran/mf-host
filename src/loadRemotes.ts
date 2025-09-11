// src/loadRemotes.ts


declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: any };

interface RemoteConfig {
  [key: string]: string;
}

export async function loadRemotes() {
  try {
    const res = await fetch('/config.json');
    const remotes: RemoteConfig = await res.json();

    const scriptPromises = Object.entries(remotes).map(([name, url]) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          try {
            // Now, TypeScript will recognize that `window` can have a property with a string key
            if (window[name] && window[name].init) {
              window[name].init(__webpack_share_scopes__.default);
            }
            resolve();
          } catch (e) {
            console.error(`Failed to initialize remote "${name}"`, e);
            reject(e);
          }
        };
        script.onerror = (e) => {
          console.error(`Failed to load script for remote "${name}" from ${url}`, e);
          reject(e);
        };
        document.head.appendChild(script);
      });
    });

    await Promise.all(scriptPromises);
    console.log("All remote scripts loaded and initialized.");

  } catch (err) {
    console.error("Failed to load remotes config", err);
  }
}