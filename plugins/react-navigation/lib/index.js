"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_navigation_1 = require("react-navigation");
var Navigator_1 = require("./Navigator");
var redux_1 = require("./redux");
var reactNavigationPlugin = function (_a) {
    var Routes = _a.Routes, initialScreen = _a.initialScreen;
    if (!Routes) {
        throw new Error('Rematch React Navigation requires app routes.');
    }
    if (!initialScreen) {
        throw new Error('Rematch React Navigation requires an initial screen name. For example, "Login"');
    }
    var _b = redux_1.default(Routes, initialScreen), addListener = _b.addListener, navMiddleware = _b.navMiddleware, navReducer = _b.navReducer;
    return {
        Navigator: Navigator_1.default(Routes, addListener),
        reactNavigationPlugin: {
            config: {
                redux: {
                    middleware: [navMiddleware],
                    reducers: {
                        nav: navReducer,
                    },
                },
            },
            init: function (_a) {
                var dispatch = _a.dispatch;
                return ({
                    onStoreCreated: function () {
                        dispatch.nav = {};
                        dispatch.nav.navigate = function (action) { return dispatch(react_navigation_1.NavigationActions.navigate(action)); };
                        dispatch.nav.reset = function (action) { return dispatch(react_navigation_1.NavigationActions.reset(action)); };
                        dispatch.nav.back = function (action) { return dispatch(react_navigation_1.NavigationActions.back(action)); };
                        dispatch.nav.setParams = function (action) { return dispatch(react_navigation_1.NavigationActions.setParams(action)); };
                    },
                });
            },
        },
    };
};
exports.default = reactNavigationPlugin;
//# sourceMappingURL=index.js.map