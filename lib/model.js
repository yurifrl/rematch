"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var store_1 = require("./redux/store");
var validate_1 = require("./utils/validate");
var addModel = function (model) {
    if (process.env.NODE_ENV !== 'production') {
        validate_1.default([
            [!model, 'model config is required'],
            [
                !model.name || typeof model.name !== 'string',
                'model "name" [string] is required',
            ],
            [model.state === undefined, 'model "state" is required'],
        ]);
    }
    // run plugin model subscriptions
    core_1.modelHooks.forEach(function (modelHook) { return modelHook(model); });
};
// main model import method
// adds config.models
exports.initModelHooks = function (models) {
    models.forEach(function (model) { return addModel(model); });
};
// allows merging of models dynamically
// model(model)
exports.createModel = function (model) {
    addModel(model);
    // add model reducers to redux store
    store_1.createReducersAndUpdateStore(model);
};
//# sourceMappingURL=model.js.map