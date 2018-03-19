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
/* eslint no-underscore-dangle: 0 */
var redux_1 = require("redux");
var isListener_1 = require("../utils/isListener");
var combine = redux_1.combineReducers;
var allReducers = {};
// create reducer for given dispatch type
// pass in (state, payload)
exports.createReducer = function (reducer, initialState) {
    return function (state, action) {
        if (state === void 0) { state = initialState; }
        // handle effects
        if (typeof reducer[action.type] === 'function') {
            return reducer[action.type](state, action.payload, action.meta);
        }
        return state;
    };
};
// creates a reducer out of "reducers" keys and values
exports.createModelReducer = function (_a) {
    var name = _a.name, reducers = _a.reducers, state = _a.state;
    var modelReducers = {};
    Object.keys(reducers || {})
        .forEach(function (reducer) {
        var action = isListener_1.default(reducer) ? reducer : name + "/" + reducer;
        modelReducers[action] = reducers[reducer];
    });
    return _b = {},
        _b[name] = exports.createReducer(modelReducers, state),
        _b;
    var _b;
};
// uses combineReducers to merge new reducers into existing reducers
exports.mergeReducers = function (nextReducers) {
    if (nextReducers === void 0) { nextReducers = {}; }
    allReducers = __assign({}, allReducers, nextReducers);
    if (!Object.keys(allReducers).length) {
        return function (state) { return state; };
    }
    return combine(allReducers);
};
exports.initReducers = function (models, redux) {
    // optionally overwrite combineReducers on init
    combine = redux.combineReducers || combine;
    // combine existing reducers, redux.reducers & model.reducers
    exports.mergeReducers(models.reduce(function (reducers, model) { return (__assign({}, exports.createModelReducer(model), reducers)); }, redux.reducers));
};
exports.createRootReducer = function (rootReducers) {
    if (rootReducers === void 0) { rootReducers = {}; }
    var mergedReducers = exports.mergeReducers();
    if (Object.keys(rootReducers).length) {
        return function (state, action) {
            var rootReducerAction = rootReducers[action.type];
            if (rootReducers[action.type]) {
                return mergedReducers(rootReducerAction(state, action), action);
            }
            return mergedReducers(state, action);
        };
    }
    return mergedReducers;
};
//# sourceMappingURL=reducers.js.map