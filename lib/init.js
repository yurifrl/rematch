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
var core_1 = require("./core");
var model_1 = require("./model");
var plugins_1 = require("./plugins");
var reducers_1 = require("./redux/reducers");
var store_1 = require("./redux/store");
var buildPlugins_1 = require("./utils/buildPlugins");
var getActionCreators_1 = require("./utils/getActionCreators");
var getExposed_1 = require("./utils/getExposed");
var getModels_1 = require("./utils/getModels");
var isObject_1 = require("./utils/isObject");
var mergeConfig_1 = require("./utils/mergeConfig");
var validate_1 = require("./utils/validate");
var init = function (config) {
    if (config === void 0) { config = {}; }
    config = __assign({}, config, { models: config.models || {}, redux: config.redux || {} });
    if (process.env.NODE_ENV !== 'production') {
        validate_1.default([
            [
                config.plugins && !Array.isArray(config.plugins),
                'init config.plugins must be an array',
            ],
            [
                config.models && isObject_1.default(config.models),
                'init config.models must be an object',
            ],
            [
                config.redux.reducers
                    && isObject_1.default(config.redux.reducers),
                'init config.redux.reducers must be an object',
            ],
            [
                config.redux.middlewares && !Array.isArray(config.redux.middlewares),
                'init config.redux.middlewares must be an array',
            ],
            [
                config.redux.enhancers
                    && !Array.isArray(config.redux.enhancers),
                'init config.redux.enhancers must be an array of functions',
            ],
            [
                config.redux.combineReducers && typeof config.redux.combineReducers !== 'function',
                'init config.redux.combineReducers must be a function',
            ],
            [
                config.redux.createStore && typeof config.redux.createStore !== 'function',
                'init config.redux.createStore must be a function',
            ],
        ]);
    }
    config = __assign({}, config, { redux: __assign({}, config.redux, { devtoolOptions: __assign({ 
                // We use our devtool options before spreading the user's
                // configured devtool options so that they can override ours
                actionCreators: getActionCreators_1.default(config.models) }, config.redux.devtoolOptions || {}) }) });
    var mergedConfig = mergeConfig_1.default(config);
    var pluginConfigs = plugins_1.default.concat(mergedConfig.plugins || []);
    var exposed = getExposed_1.default(pluginConfigs);
    var plugins = buildPlugins_1.default(pluginConfigs, exposed);
    // preStore: middleware, model hooks
    core_1.preStore(plugins);
    // collect all models
    var models = getModels_1.default(mergedConfig.models);
    model_1.initModelHooks(models);
    reducers_1.initReducers(models, mergedConfig.redux);
    // create a redux store with initialState
    // merge in additional extra reducers
    var store = store_1.initStore(mergedConfig);
    core_1.postStore(plugins, store);
    // use plugin dispatch as store.dispatch
    store.dispatch = plugins_1.default[0].expose.dispatch;
    return store;
};
exports.default = init;
//# sourceMappingURL=init.js.map