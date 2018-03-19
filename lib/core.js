"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelHooks = [];
exports.pluginMiddlewares = [];
exports.preStore = function (plugins) {
    plugins.forEach(function (plugin) {
        if (plugin.middleware) {
            exports.pluginMiddlewares.push(plugin.middleware);
        }
        if (plugin.onModel) {
            exports.modelHooks.push(plugin.onModel);
        }
    });
};
exports.postStore = function (plugins, store) {
    plugins.forEach(function (plugin) {
        if (plugin.onStoreCreated) {
            plugin.onStoreCreated(store);
        }
    });
};
//# sourceMappingURL=core.js.map