"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-underscore-dangle: 0 */
var redux_1 = require("redux");
var core_1 = require("../core");
var devtools_1 = require("./devtools");
var reducers_1 = require("./reducers");
var rootReducers;
exports.initStore = function (_a) {
    var redux = _a.redux;
    var initialState = typeof redux.initialState === 'undefined' ? {} : redux.initialState;
    var createStore = redux.createStore || redux_1.createStore;
    rootReducers = redux.rootReducers;
    var rootReducer = reducers_1.createRootReducer(rootReducers);
    var middlewareList = core_1.pluginMiddlewares.concat((redux.middlewares || []));
    var middlewares = redux_1.applyMiddleware.apply(void 0, middlewareList);
    var enhancers = devtools_1.composeEnhancers(redux.devtoolOptions).apply(void 0, (redux.enhancers || []).concat([middlewares]));
    exports.store = createStore(rootReducer, initialState, enhancers);
    return exports.store;
};
// allows for "model" to dynamically update the reducers/store
exports.createReducersAndUpdateStore = function (model) {
    reducers_1.mergeReducers(reducers_1.createModelReducer(model));
    exports.store.replaceReducer(reducers_1.createRootReducer(rootReducers));
};
//# sourceMappingURL=store.js.map