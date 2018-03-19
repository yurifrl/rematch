"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isListener_1 = require("./isListener");
exports.default = (function (models) {
    return Object.keys(models).reduce(function (actionCreators, modelName) {
        var _a = models[modelName].reducers, reducers = _a === void 0 ? {} : _a;
        Object.keys(reducers)
            .filter(function (reducerName) { return !isListener_1.default(reducerName); })
            .forEach(function (reducerName) {
            var type = modelName + "/" + reducerName;
            // We have to dynamically create the function like this,
            // so that the argument name is not minified.
            var createCreator = new Function('type', "\n                    return function(payload) {\n                        return { type, payload };\n                    }\n                ");
            actionCreators[type] = createCreator(type);
        });
        return actionCreators;
    }, {});
});
//# sourceMappingURL=getActionCreators.js.map