"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Validate
 *
 * takes an array of arrays of validations and
 * throws if an error occurs
 */
/* istanbul ignore next */
var validate = function (validations) {
    if (process.env.NODE_ENV !== 'production') {
        validations.forEach(function (validation) {
            var condition = validation[0];
            var errorMessage = validation[1];
            if (condition) {
                throw new Error(errorMessage);
            }
        });
    }
};
exports.default = validate;
//# sourceMappingURL=validate.js.map