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
var validate_1 = require("./validate");
exports.default = (function (plugins) {
    return plugins.reduce(function (exposed, plugin) { return (__assign({}, exposed, (plugin.expose || {}))); }, {
        validate: validate_1.default,
    });
});
//# sourceMappingURL=getExposed.js.map