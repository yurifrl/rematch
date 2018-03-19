"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (plugins, exposed) { return plugins.reduce(function (all, _a) {
    var init = _a.init;
    if (init) {
        var plugin = init(exposed);
        if (process.env.NODE_ENV !== 'production') {
            exposed.validate([
                [
                    plugin.onStoreCreated && typeof plugin.onStoreCreated !== 'function',
                    'Plugin onStoreCreated must be a function',
                ],
                [
                    plugin.onModel && typeof plugin.onModel !== 'function',
                    'Plugin onModel must be a function',
                ],
                [
                    plugin.middleware && typeof plugin.middleware !== 'function',
                    'Plugin middleware must be a function',
                ],
            ]);
        }
        all.push(plugin);
    }
    return all;
}, []); });
//# sourceMappingURL=buildPlugins.js.map