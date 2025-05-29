import {defineConfig, Plugin} from 'adnbn';

const hostPermissionsPlugin: Plugin = {
    name: 'host-permissions',
    manifest: ({manifest}) => {
        manifest.setHostPermissions(new Set(["<all_urls>"]))
    }
}
export default defineConfig({
    plugins: [hostPermissionsPlugin],
})
