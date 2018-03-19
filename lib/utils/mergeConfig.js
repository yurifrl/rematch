"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge = function (original, next) {
    return (next) ? __assign({}, next, (original || {})) : original || {};
};
// merges init config with plugin configs
exports.default = (function (config) {
    // defaults
    var plugins = config.plugins || [];
    return (plugins).reduce(function (merged, plugin) {
        if (plugin.config) {
            // models
            merged.models = merge(merged.models, plugin.config.models);
            // plugins
            if (plugin.config.plugins) {
                merged.plugins = merged.plugins.concat(plugin.config.plugins);
            }
            // redux
            if (plugin.config.redux) {
                merged.redux.initialState = merge(merged.redux.initialState, plugin.config.redux.initialState);
                merged.redux.reducers = merge(merged.redux.reducers, plugin.config.redux.reducers);
                merged.redux.rootReducers = merge(merged.redux.rootReducers, plugin.config.redux.reducers);
                if (plugin.config.redux.enhancers) {
                    merged.redux.enhancers = merged.redux.enhancers.concat(plugin.config.redux.enhancers);
                }
                merged.redux.combineReducers = merged.redux.combineReducers || plugin.config.redux.combineReducers;
                merged.redux.createStore = merged.redux.createStore || plugin.config.redux.createStore;
            }
        }
        return merged;
    }, config);
});
//# sourceMappingURL=mergeConfig.js.map