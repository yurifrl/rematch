"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = {};
var selectPlugin = function () { return ({
    expose: { select: exports.select },
    init: function (_a) {
        var validate = _a.validate;
        return ({
            onModel: function (model) {
                exports.select[model.name] = {};
                Object.keys(model.selectors || {}).forEach(function (selectorName) {
                    validate([
                        [
                            typeof model.selectors[selectorName] !== 'function',
                            "Selector (" + model.name + "/" + selectorName + ") must be a function",
                        ],
                    ]);
                    exports.select[model.name][selectorName] = function (state) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
                        return (_a = model.selectors)[selectorName].apply(_a, [state[model.name]].concat(args));
                        var _a;
                    };
                });
            },
        });
    },
}); };
exports.default = selectPlugin;
//# sourceMappingURL=index.js.map