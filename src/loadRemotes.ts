declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: any };

interface RemoteConfig {
  [key: string]: string;
}

export async function loadRemotes() {
  try {
    const res = await fetch('/config.json');
    console.log("Iam", res)
    const remotes: RemoteConfig = await res.json();
    console.log("remotes",remotes)

    // Initialize sharing once before loading any remotes
    await __webpack_init_sharing__('default');

    const scriptPromises = Object.entries(remotes).map(([name, url]) => {
      console.log(name,url,
        "******"
      )
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        console.log("script",script)
        script.crossOrigin = 'anonymous';
        script.src = url;
        console.log(script)
        script.onload = () => {
          console.log("here")
          try {
            console.log("--------",window)
            const container = (window as any)[name];
            // if (container && container.init) {
            //   container.init(__webpack_share_scopes__.default);
            // }
            if (container && container.init) {
    container.init(__webpack_share_scopes__.default);
  } else {
    console.error(`❌ Remote ${name} not found on window after loading ${url}`);
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
    console.log("✅ All remote scripts loaded and initialized.");

  } catch (err) {
    console.error("❌ Failed to load remotes config", err);
  }
}
