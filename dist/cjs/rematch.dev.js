'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelHooks = [];
exports.pluginMiddlewares = [];
exports.preStore = function (plugins) {
    plugins.forEach(function (plugin) {
        if (plugin.middleware) {
            exports.pluginMiddlewares.push(plugin.middleware);
        }
        if (plugin.onModel) {
            exports.modelHooks.push(plugin.onModel);
        }
    });
};
exports.postStore = function (plugins, store) {
    plugins.forEach(function (plugin) {
        if (plugin.onStoreCreated) {
            plugin.onStoreCreated(store);
        }
    });
};

});

unwrapExports(core);
var core_1 = core.modelHooks;
var core_2 = core.pluginMiddlewares;
var core_3 = core.preStore;
var core_4 = core.postStore;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root$1;

if (typeof self !== 'undefined') {
  root$1 = self;
} else if (typeof window !== 'undefined') {
  root$1 = window;
} else if (typeof global !== 'undefined') {
  root$1 = global;
} else if (typeof module !== 'undefined') {
  root$1 = module;
} else {
  root$1 = Function('return this')();
}

var result = symbolObservablePonyfill(root$1);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    {
      if (typeof reducers[key] === 'undefined') {
        warning('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


var redux_1 = Object.freeze({
	createStore: createStore,
	combineReducers: combineReducers,
	bindActionCreators: bindActionCreators,
	applyMiddleware: applyMiddleware,
	compose: compose
});

var devtools = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */

exports.composeEnhancers = function (devtoolOptions) {
    if (devtoolOptions === void 0) { devtoolOptions = {}; }
    /* istanbul ignore next */
    return (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devtoolOptions)
        : redux_1.compose;
};

});

unwrapExports(devtools);
var devtools_1 = devtools.composeEnhancers;

var isListener = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (reducer) { return reducer.includes('/'); });

});

unwrapExports(isListener);

var reducers = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-underscore-dangle: 0 */


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
        var action = isListener.default(reducer) ? reducer : name + "/" + reducer;
        modelReducers[action] = reducers[reducer];
    });
    return _b = {}, _b[name] = exports.createReducer(modelReducers, state), _b;
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

});

unwrapExports(reducers);
var reducers_1 = reducers.createReducer;
var reducers_2 = reducers.createModelReducer;
var reducers_3 = reducers.mergeReducers;
var reducers_4 = reducers.initReducers;
var reducers_5 = reducers.createRootReducer;

var store = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-underscore-dangle: 0 */




var rootReducers;
exports.initStore = function (_a) {
    var redux = _a.redux;
    var initialState = typeof redux.initialState === 'undefined' ? {} : redux.initialState;
    var createStore = redux.createStore || redux_1.createStore;
    rootReducers = redux.rootReducers;
    var rootReducer = reducers.createRootReducer(rootReducers);
    var middlewareList = core.pluginMiddlewares.concat((redux.middlewares || []));
    var middlewares = redux_1.applyMiddleware.apply(void 0, middlewareList);
    var enhancers = devtools.composeEnhancers(redux.devtoolOptions).apply(void 0, (redux.enhancers || []).concat([middlewares]));
    exports.store = createStore(rootReducer, initialState, enhancers);
    return exports.store;
};
// allows for "model" to dynamically update the reducers/store
exports.createReducersAndUpdateStore = function (model) {
    reducers.mergeReducers(reducers.createModelReducer(model));
    exports.store.replaceReducer(reducers.createRootReducer(rootReducers));
};

});

unwrapExports(store);
var store_1 = store.initStore;
var store_2 = store.store;
var store_3 = store.createReducersAndUpdateStore;

var validate_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Validate
 *
 * takes an array of arrays of validations and
 * throws if an error occurs
 */
/* istanbul ignore next */
var validate = function (validations) {
    {
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

});

unwrapExports(validate_1);

var model = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



var addModel = function (model) {
    {
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
    core.modelHooks.forEach(function (modelHook) { return modelHook(model); });
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
    store.createReducersAndUpdateStore(model);
};

});

unwrapExports(model);
var model_1 = model.initModelHooks;
var model_2 = model.createModel;

var dispatch = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = commonjsGlobal;
Object.defineProperty(exports, "__esModule", { value: true });
var storeDispatch;
var dispatchPlugin = {
    expose: {
        createDispatcher: function (modelName, reducerName) {
            return function (payload, meta) { return __awaiter(_this, void 0, void 0, function () {
                var action;
                return __generator(this, function (_a) {
                    action = { type: modelName + "/" + reducerName };
                    if (typeof payload !== 'undefined') {
                        action.payload = payload;
                    }
                    if (typeof meta !== 'undefined') {
                        action.meta = meta;
                    }
                    return [2 /*return*/, storeDispatch(action)];
                });
            }); };
        },
        dispatch: function (action) { return storeDispatch(action); },
    },
    init: function (_a) {
        var dispatch = _a.dispatch, createDispatcher = _a.createDispatcher, validate = _a.validate;
        return ({
            onStoreCreated: function (store) {
                storeDispatch = store.dispatch;
            },
            onModel: function (model) {
                dispatch[model.name] = {};
                Object.keys(model.reducers || {}).forEach(function (reducerName) {
                    {
                        validate([
                            [
                                !!reducerName.match(/\/.+\//),
                                "Invalid reducer name (" + model.name + "/" + reducerName + ")",
                            ],
                            [
                                typeof model.reducers[reducerName] !== 'function',
                                "Invalid reducer (" + model.name + "/" + reducerName + "). Must be a function",
                            ],
                        ]);
                    }
                    dispatch[model.name][reducerName] = createDispatcher(model.name, reducerName);
                });
            },
        });
    },
};
exports.default = dispatchPlugin;

});

unwrapExports(dispatch);

var effects = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = commonjsGlobal;
Object.defineProperty(exports, "__esModule", { value: true });
var effectsPlugin = {
    expose: {
        effects: {},
    },
    init: function (_a) {
        var effects = _a.effects, dispatch = _a.dispatch, createDispatcher = _a.createDispatcher, validate = _a.validate;
        return ({
            onModel: function (model) {
                Object.keys(model.effects || {}).forEach(function (effectName) {
                    {
                        validate([
                            [
                                !!effectName.match(/\//),
                                "Invalid effect name (" + model.name + "/" + effectName + ")",
                            ],
                            [
                                typeof model.effects[effectName] !== 'function',
                                "Invalid effect (" + model.name + "/" + effectName + "). Must be a function",
                            ],
                        ]);
                    }
                    effects[model.name + "/" + effectName] = model.effects[effectName].bind(dispatch[model.name]);
                    // add effect to dispatch
                    // is assuming dispatch is available already... that the dispatch plugin is in there
                    dispatch[model.name][effectName] = createDispatcher(model.name, effectName);
                    // tag effects so they can be differentiated from normal actions
                    dispatch[model.name][effectName].isEffect = true;
                });
            },
            middleware: function (store) { return function (next) { return function (action) { return __awaiter(_this, void 0, void 0, function () {
                var result, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(action.type in effects)) return [3 /*break*/, 2];
                            return [4 /*yield*/, effects[action.type](action.payload, store.getState(), action.meta)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, next(action)];
                        case 3:
                            _a = _b.sent();
                            _b.label = 4;
                        case 4:
                            result = _a;
                            return [2 /*return*/, result];
                    }
                });
            }); }; }; },
        });
    },
};
exports.default = effectsPlugin;

});

unwrapExports(effects);

var plugins = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var corePlugins = [
    dispatch.default,
    effects.default,
];
exports.default = corePlugins;

});

unwrapExports(plugins);

var buildPlugins = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (plugins, exposed) { return plugins.reduce(function (all, _a) {
    var init = _a.init;
    if (init) {
        var plugin = init(exposed);
        {
            exposed.validate([
                [
                    plugin.onStoreCreated && typeof plugin.onStoreCreated !== 'function',
                    'Plugin onStoreCreated must be a function',
                ],
                [
                    plugin.onModel && typeof plugin.onModel !== 'function',
                    'Plugin onModel must be a function',
                ],
                [
                    plugin.middleware && typeof plugin.middleware !== 'function',
                    'Plugin middleware must be a function',
                ],
            ]);
        }
        all.push(plugin);
    }
    return all;
}, []); });

});

unwrapExports(buildPlugins);

var getActionCreators = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = (function (models) {
    return Object.keys(models).reduce(function (actionCreators, modelName) {
        var _a = models[modelName].reducers, reducers = _a === void 0 ? {} : _a;
        Object.keys(reducers)
            .filter(function (reducerName) { return !isListener.default(reducerName); })
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

});

unwrapExports(getActionCreators);

var getExposed = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });

exports.default = (function (plugins) {
    return plugins.reduce(function (exposed, plugin) { return (__assign({}, exposed, (plugin.expose || {}))); }, {
        validate: validate_1.default,
    });
});

});

unwrapExports(getExposed);

var getModels = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (models) {
    return Object.keys(models).map(function (name) { return (__assign({ name: name }, models[name])); });
});

});

unwrapExports(getModels);

var isObject = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (obj) { return (Array.isArray(obj) || typeof obj !== 'object'); });

});

unwrapExports(isObject);

var mergeConfig = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge = function (original, next) {
    return (next) ? __assign({}, next, (original || {})) : original || {};
};
// merges init config with plugin configs
exports.default = (function (config) {
    // defaults
    var plugins = config.plugins || [];
    return (plugins).reduce(function (merged, plugin) {
        if (plugin.config) {
            // models
            merged.models = merge(merged.models, plugin.config.models);
            // plugins
            if (plugin.config.plugins) {
                merged.plugins = merged.plugins.concat(plugin.config.plugins);
            }
            // redux
            if (plugin.config.redux) {
                merged.redux.initialState = merge(merged.redux.initialState, plugin.config.redux.initialState);
                merged.redux.reducers = merge(merged.redux.reducers, plugin.config.redux.reducers);
                merged.redux.rootReducers = merge(merged.redux.rootReducers, plugin.config.redux.reducers);
                if (plugin.config.redux.enhancers) {
                    merged.redux.enhancers = merged.redux.enhancers.concat(plugin.config.redux.enhancers);
                }
                merged.redux.combineReducers = merged.redux.combineReducers || plugin.config.redux.combineReducers;
                merged.redux.createStore = merged.redux.createStore || plugin.config.redux.createStore;
            }
        }
        return merged;
    }, config);
});

});

unwrapExports(mergeConfig);

var init_1 = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });












var init = function (config) {
    if (config === void 0) { config = {}; }
    config = __assign({}, config, { models: config.models || {}, redux: config.redux || {} });
    {
        validate_1.default([
            [
                config.plugins && !Array.isArray(config.plugins),
                'init config.plugins must be an array',
            ],
            [
                config.models && isObject.default(config.models),
                'init config.models must be an object',
            ],
            [
                config.redux.reducers
                    && isObject.default(config.redux.reducers),
                'init config.redux.reducers must be an object',
            ],
            [
                config.redux.middlewares && !Array.isArray(config.redux.middlewares),
                'init config.redux.middlewares must be an array',
            ],
            [
                config.redux.enhancers
                    && !Array.isArray(config.redux.enhancers),
                'init config.redux.enhancers must be an array of functions',
            ],
            [
                config.redux.combineReducers && typeof config.redux.combineReducers !== 'function',
                'init config.redux.combineReducers must be a function',
            ],
            [
                config.redux.createStore && typeof config.redux.createStore !== 'function',
                'init config.redux.createStore must be a function',
            ],
        ]);
    }
    config = __assign({}, config, { redux: __assign({}, config.redux, { devtoolOptions: __assign({ 
                // We use our devtool options before spreading the user's
                // configured devtool options so that they can override ours
                actionCreators: getActionCreators.default(config.models) }, config.redux.devtoolOptions || {}) }) });
    var mergedConfig = mergeConfig.default(config);
    var pluginConfigs = plugins.default.concat(mergedConfig.plugins || []);
    var exposed = getExposed.default(pluginConfigs);
    var plugins$$1 = buildPlugins.default(pluginConfigs, exposed);
    // preStore: middleware, model hooks
    core.preStore(plugins$$1);
    // collect all models
    var models = getModels.default(mergedConfig.models);
    model.initModelHooks(models);
    reducers.initReducers(models, mergedConfig.redux);
    // create a redux store with initialState
    // merge in additional extra reducers
    var store$$1 = store.initStore(mergedConfig);
    core.postStore(plugins$$1, store$$1);
    // use plugin dispatch as store.dispatch
    store$$1.dispatch = plugins.default[0].expose.dispatch;
    return store$$1;
};
exports.default = init;

});

unwrapExports(init_1);

var deprecate = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (warning) {
    {
        console.warn(warning);
    }
});

});

unwrapExports(deprecate);

var lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.init = init_1.default;

exports.model = model.createModel;



var dispatch$$1 = dispatch.default.expose.dispatch;
exports.dispatch = dispatch$$1;
var getState = function () {
    deprecate.default('getState import will be removed in @rematch/core@v1.0.0');
    return store.store.getState();
};
exports.getState = getState;
exports.default = {
    dispatch: dispatch$$1,
    getState: getState,
    init: init_1.default,
    model: model.createModel,
};

});

var index$1 = unwrapExports(lib);
var lib_1 = lib.init;
var lib_2 = lib.model;
var lib_3 = lib.dispatch;
var lib_4 = lib.getState;

exports.default = index$1;
exports.init = lib_1;
exports.model = lib_2;
exports.dispatch = lib_3;
exports.getState = lib_4;
