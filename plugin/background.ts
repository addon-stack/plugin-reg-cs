import {defineBackground} from "adnbn";
import {getManifest, onInstalled, queryTabs} from "adnbn/browser";

import injectCssFactory from "@addon-core/inject-css";
import injectScriptFactory from "@addon-core/inject-script";

type ContentScript = NonNullable<chrome.runtime.Manifest["content_scripts"]>[number] & {
    world?: chrome.scripting.ExecutionWorld;
};

const register = async (): Promise<void> => {
    const contents = getManifest().content_scripts as ContentScript[] | undefined;

    if (!contents?.length) return;

    const executeContentScript = async (content: ContentScript) => {
        const {world, matches, run_at: runAt, all_frames: frameId, match_about_blank: matchAboutBlank} = content;

        const tabs = await queryTabs({url: matches});

        const scriptPromises = tabs
            .filter(tab => tab.id !== undefined && !tab.frozen && !tab.discarded)
            .map(async tab => {
                const injectScript = injectScriptFactory({
                    tabId: tab.id!,
                    frameId,
                    matchAboutBlank,
                    runAt,
                    world,
                });

                const injectCss = injectCssFactory({
                    tabId: tab.id!,
                    frameId,
                    matchAboutBlank,
                    runAt,
                });

                const promises = [];

                if (content.js?.length) {
                    promises.push(
                        injectScript
                            .file(content.js)
                            .catch(err => console.error(`ExecuteScript error on tab "${tab.title}":`, err))
                    );
                }

                if (content.css?.length) {
                    promises.push(
                        injectCss
                            .file(content.css)
                            .catch(err => console.error(`InsertCSS error on tab "${tab.title}":`, err))
                    );
                }

                return Promise.allSettled(promises);
            });

        await Promise.allSettled(scriptPromises);
    };

    await Promise.allSettled(contents.map(executeContentScript));
};

export default defineBackground({
    permissions: ["tabs", "scripting"],
    main: async () => {
        onInstalled(async details => {
            if (details.reason === "install") {
                await register();
            }
        });
    },
});
