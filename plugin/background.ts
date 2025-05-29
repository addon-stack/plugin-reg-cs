import {defineBackground} from 'adnbn'
import {executeScript, getManifest, insertScriptingCSS, queryTabs} from 'adnbn/browser'

type ContentScript = NonNullable<chrome.runtime.Manifest['content_scripts']>[number] & {
    world?: chrome.scripting.ExecutionWorld
};

export default defineBackground({
    permissions: [
        'tabs',
        'scripting',
    ],
    main: async () => {
        const contents = getManifest().content_scripts as ContentScript[] | undefined

        if (!contents?.length) return;

        const executeContentScript = async (content: ContentScript) => {
            const tabs = await queryTabs({url: content.matches});

            const scriptPromises = tabs
                .filter(tab => tab.id !== undefined)
                .map(async (tab) => {
                    const target = {tabId: tab.id!, allFrames: content.all_frames};

                    const promises = [];

                    if (content.js?.length) {
                        promises.push(
                            executeScript({
                                target,
                                files: content.js,
                                world: content.world
                            }).catch(err =>
                                console.error(`ExecuteScript error on tab "${tab.title}":`, err)
                            )
                        );
                    }

                    if (content.css?.length) {
                        promises.push(
                            insertScriptingCSS({
                                target,
                                files: content.css
                            }).catch(err =>
                                console.error(`InsertCSS error on tab "${tab.title}":`, err)
                            )
                        );
                    }

                    return Promise.allSettled(promises);
                });

            await Promise.allSettled(scriptPromises);
        };

        await Promise.allSettled(contents.map(executeContentScript));
    }
})
