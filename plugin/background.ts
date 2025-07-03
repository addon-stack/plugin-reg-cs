import {defineBackground} from "adnbn";
import {getManifest, queryTabs} from "@adnbn/browser";
import injectCssFactory from "@adnbn/inject-css";
import injectScriptFactory from "@adnbn/inject-script";

type ContentScript = NonNullable<chrome.runtime.Manifest["content_scripts"]>[number] & {
    world?: chrome.scripting.ExecutionWorld;
};

export default defineBackground({
    permissions: ["tabs", "scripting"],
    main: async () => {
        const contents = getManifest().content_scripts as ContentScript[] | undefined;

        if (!contents?.length) return;

        const executeContentScript = async (content: ContentScript) => {
            const {world, matches, run_at: runAt, all_frames: frameId, match_about_blank: matchAboutBlank} = content;

            const tabs = await queryTabs({url: matches});

            const scriptPromises = tabs
                .filter(tab => tab.id !== undefined)
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
    },
});
