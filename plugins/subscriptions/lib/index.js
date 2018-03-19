"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_1 = require("./create");
var subscriptions_1 = require("./subscriptions");
var unsubscribe_1 = require("./unsubscribe");
var localGetState;
exports.default = (function () { return ({
    init: function (_a) {
        var validate = _a.validate;
        var triggerAllSubscriptions = function (matches) { return function (action, matcher) {
            // call each subscription in each model
            Object.keys(matches).forEach(function (modelName) {
                // create subscription with (action, unsubscribe)
                matches[modelName](action, localGetState(), function () { return unsubscribe_1.createUnsubscribe(modelName, matcher)(); });
            });
        }; };
        return {
            onStoreCreated: function (store) {
                localGetState = store.getState;
            },
            onModel: function (model) {
                // a list of actions is only necessary
                // to create warnings for invalid subscription names
                var actionList = Object.keys(model.reducers || {}).concat(Object.keys(model.effects || {}));
                Object.keys(model.subscriptions || {}).forEach(function (matcher) {
                    validate([
                        [
                            !!matcher.match(/\/(.+)?\//),
                            "Invalid subscription matcher (" + matcher + ")",
                        ],
                        [
                            typeof model.subscriptions[matcher] !== 'function',
                            "Subscription matcher in " + model.name + " (" + matcher + ") must be a function",
                        ],
                    ]);
                    var onAction = model.subscriptions[matcher];
                    create_1.createSubscription(model.name, matcher, onAction, actionList);
                });
            },
            middleware: function () { return function (next) { return function (action) {
                var type = action.type;
                // exact match
                if (subscriptions_1.subscriptions.has(type)) {
                    var allMatches = subscriptions_1.subscriptions.get(type);
                    // call each hook[modelName] with action
                    triggerAllSubscriptions(allMatches)(action, type);
                }
                else {
                    subscriptions_1.patternSubscriptions.forEach(function (handler, matcher) {
                        if (type.match(new RegExp(matcher))) {
                            var patternMatches = subscriptions_1.patternSubscriptions.get(matcher);
                            triggerAllSubscriptions(patternMatches)(action, matcher);
                        }
                    });
                }
                return next(action);
            }; }; },
        };
    }
}); });
//# sourceMappingURL=index.js.map