"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("./init");
exports.init = init_1.default;
var model_1 = require("./model");
exports.model = model_1.createModel;
var dispatch_1 = require("./plugins/dispatch");
var store_1 = require("./redux/store");
var deprecate_1 = require("./utils/deprecate");
var dispatch = dispatch_1.default.expose.dispatch;
exports.dispatch = dispatch;
var getState = function () {
    deprecate_1.default('getState import will be removed in @rematch/core@v1.0.0');
    return store_1.store.getState();
};
exports.getState = getState;
exports.default = {
    dispatch: dispatch,
    getState: getState,
    init: init_1.default,
    model: model_1.createModel,
};
//# sourceMappingURL=index.js.map