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

        if (!contents) return

        for await (const content of contents) {

            const tabs = await queryTabs({url: content.matches})

            tabs.forEach(tab => {
                if (tab.id === undefined) return

                content.js?.length && executeScript({
                    target: {tabId: tab.id, allFrames: content.all_frames},
                    files: content.js || [],
                    world: content.world
                }).catch((err: Error) => console.error(`ExecuteScript error on tab - "${tab.title}" \n`, err))

                content.css?.length && insertScriptingCSS({
                    target: {tabId: tab.id, allFrames: content.all_frames},
                    files: content.css || [],
                }).catch((err: Error) => console.error(`InsertCSS error on tab - "${tab.title}" \n`, err))
            })
        }
    }
})
