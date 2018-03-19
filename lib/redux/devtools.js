"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var redux_1 = require("redux");
exports.composeEnhancers = function (devtoolOptions) {
    if (devtoolOptions === void 0) { devtoolOptions = {}; }
    /* istanbul ignore next */
    return (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devtoolOptions)
        : redux_1.compose;
};
//# sourceMappingURL=devtools.js.map