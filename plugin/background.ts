import injectCssFactory from "@addon-core/inject-css";
import injectScriptFactory from "@addon-core/inject-script";
import {defineBackground} from "adnbn";
import {containsPermissions, getManifest, onInstalled, onPermissionsAdded, queryTabs} from "adnbn/browser";

type Tab = chrome.tabs.Tab;
type Permissions = chrome.permissions.Permissions;

type ManifestContent = NonNullable<chrome.runtime.Manifest["content_scripts"]>[number];

type ContentScript = Omit<ManifestContent, "run_at" | "world"> & {
    run_at?: chrome.extensionTypes.RunAt;
    world?: chrome.scripting.ExecutionWorld;
};

const getContentsScripts = (): ContentScript[] | undefined => {
    return getManifest().content_scripts as ContentScript[] | undefined;
};

const isInjectableTab = (tab: Tab): tab is Tab & {id: number} => {
    return tab.id !== undefined && !tab.frozen && !tab.discarded;
};

const register = async (): Promise<void> => {
    const contents = getContentsScripts();

    if (!contents?.length) return;

    const executeContentScript = async (content: ContentScript) => {
        const {world, matches, run_at: runAt, all_frames: frameId, match_about_blank: matchAboutBlank} = content;

        const tabs = await queryTabs({url: matches});

        const scriptPromises = tabs.filter(isInjectableTab).map(async tab => {
            const injectScript = injectScriptFactory({
                tabId: tab.id,
                frameId,
                matchAboutBlank,
                runAt,
                world,
            });

            const injectCss = injectCssFactory({
                tabId: tab.id,
                frameId,
                matchAboutBlank,
                runAt,
            });

            const promises = [];

            if (content.js?.length) {
                promises.push(
                    injectScript
                        .file(content.js)
                        .catch(err => console.error(`ExecuteScript error on tab "${tab.title}":`, err)),
                );
            }

            if (content.css?.length) {
                promises.push(
                    injectCss
                        .file(content.css)
                        .catch(err => console.error(`InsertCSS error on tab "${tab.title}":`, err)),
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
    main: async ({permissions}) => {
        onInstalled(async details => {
            if (details.reason === "install") {
                const origins = getContentsScripts()?.flatMap(content => content.matches || []);

                const perm: Permissions = {permissions, origins};

                if (await containsPermissions(perm)) {
                    await register();

                    return;
                }

                const off = onPermissionsAdded(async () => {
                    if (await containsPermissions(perm)) {
                        await register();
                        off();
                    }
                });
            }
        });
    },
});
