import React, { useState, useEffect, useMemo, useRef, useCallback, memo } from 'react';
import { map, filter } from 'rxjs/operators';
import Presence from '@yomo/presencejs';
import { fromEvent } from 'rxjs';

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

var Cursor = /*#__PURE__*/function () {
  function Cursor(id, x, y, name, avatar, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    this.avatar = avatar;
    this.color = color;
  }

  var _proto = Cursor.prototype;

  _proto.move = function move(x, y) {
    this.x = x;
    this.y = y;
  };

  _proto.onMove = function onMove(_mousePosition) {};

  _proto.onGetLatency = function onGetLatency(_data) {};

  _proto.subscribeLatency = function subscribeLatency(yomo) {
    var _this = this;

    return yomo.on$('latency').subscribe(function (data) {
      if (data.id !== _this.id) {
        return;
      }

      _this.onGetLatency(data);
    });
  };

  return Cursor;
}();

var uuidv4 = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
var getViewportSize = function getViewportSize() {
  if (window.getViewportSize) {
    return window.getViewportSize;
  }

  window.onresize = function () {
    window.getViewportSize = {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
  };

  window.onresize();
  return window.getViewportSize;
};
var getScale = function getScale(x, y) {
  var _getViewportSize = getViewportSize(),
      width = _getViewportSize.width,
      height = _getViewportSize.height;

  return {
    scaleX: x / width,
    scaleY: y / height
  };
};
var getMousePosition = function getMousePosition(scaleX, scaleY) {
  var _getViewportSize2 = getViewportSize(),
      width = _getViewportSize2.width,
      height = _getViewportSize2.height;

  return {
    mouseX: scaleX * width,
    mouseY: scaleY * height
  };
};

var Me = /*#__PURE__*/function (_Cursor) {
  _inheritsLoose(Me, _Cursor);

  function Me(_ref) {
    var _this;

    var id = _ref.id,
        x = _ref.x,
        y = _ref.y,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? '' : _ref$name,
        _ref$avatar = _ref.avatar,
        avatar = _ref$avatar === void 0 ? '' : _ref$avatar,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? '' : _ref$color;
    _this = _Cursor.call(this, id, x, y, name, avatar, color) || this;
    _this.subscription = _this.subscribeMousemove();
    return _this;
  }

  var _proto = Me.prototype;

  _proto.goOnline = function goOnline(yomo) {
    this.yomo = yomo;
    this.online(yomo);
    var onlineSubscription = this.subscribeOnline(yomo);
    var mousePositionSubscription = this.subscribeMousePosition(yomo);

    var latencySubscription = _Cursor.prototype.subscribeLatency.call(this, yomo);

    var visibilitySubscription = this.subscribeVisibility(yomo);
    this.subscription.add(onlineSubscription);
    this.subscription.add(mousePositionSubscription);
    this.subscription.add(latencySubscription);
    this.subscription.add(visibilitySubscription);
  };

  _proto.goOffline = /*#__PURE__*/function () {
    var _goOffline = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.yomo) {
                this.yomo.send('offline', {
                  id: this.id
                });
              }

              if (this.subscription) {
                this.subscription.unsubscribe();
              }

              _context.next = 4;
              return new Promise(function (resolve) {
                setTimeout(resolve, 500);
              });

            case 4:
              return _context.abrupt("return", _context.sent);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function goOffline() {
      return _goOffline.apply(this, arguments);
    }

    return goOffline;
  }();

  _proto.sendMessage = function sendMessage(message) {
    if (this.yomo) {
      this.yomo.send('text', {
        id: this.id,
        message: message
      });
    }
  };

  _proto.online = function online(yomo) {
    yomo.send('online', {
      id: this.id,
      x: 0,
      y: 0,
      name: this.name,
      avatar: this.avatar,
      color: this.color
    });
  };

  _proto.subscribeOnline = function subscribeOnline(yomo) {
    var _this2 = this;

    return yomo.on$('online').subscribe(function () {
      yomo.send('sync', {
        id: _this2.id,
        x: _this2.x,
        y: _this2.y,
        name: _this2.name,
        avatar: _this2.avatar,
        color: _this2.color
      });
    });
  };

  _proto.subscribeMousemove = function subscribeMousemove() {
    var _this3 = this;

    var mousemove$ = fromEvent(document, 'mousemove');
    return mousemove$.subscribe(function (event) {
      var clientX = event.clientX,
          clientY = event.clientY;

      _Cursor.prototype.move.call(_this3, clientX, clientY);

      _this3.onMove({
        mouseX: clientX,
        mouseY: clientY
      });
    });
  };

  _proto.subscribeMousePosition = function subscribeMousePosition(yomo) {
    var _this4 = this;

    var mousemove$ = fromEvent(document, 'mousemove');
    var movement$ = mousemove$.pipe(map(function (event) {
      var _getScale = getScale(event.clientX, event.clientY),
          scaleX = _getScale.scaleX,
          scaleY = _getScale.scaleY;

      return {
        id: _this4.id,
        x: scaleX,
        y: scaleY
      };
    }));
    return movement$.subscribe(function (data) {
      yomo.send('movement', data);
    });
  };

  _proto.subscribeVisibility = function subscribeVisibility(yomo) {
    var _this5 = this;

    var visibilityChange$ = fromEvent(document, 'visibilitychange');
    return visibilityChange$.pipe(map(function () {
      var event;
      if (document.hidden) event = 'leave';else event = 'enter';
      return {
        event: event
      };
    })).subscribe(function (_ref2) {
      var event = _ref2.event;
      yomo.send(event, {
        id: _this5.id
      });
    });
  };

  return Me;
}(Cursor);

var Other = /*#__PURE__*/function (_Cursor) {
  _inheritsLoose(Other, _Cursor);

  function Other(_ref) {
    var id = _ref.id,
        x = _ref.x,
        y = _ref.y,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? '' : _ref$name,
        _ref$avatar = _ref.avatar,
        avatar = _ref$avatar === void 0 ? '' : _ref$avatar,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? '' : _ref$color;
    return _Cursor.call(this, id, x, y, name, avatar, color) || this;
  }

  var _proto = Other.prototype;

  _proto.goOnline = function goOnline(yomo) {
    this.subscription = this.subscribeMovement(yomo);
    var textMessageSubscription = this.subscribeTextMessage(yomo);

    var latencySubscription = _Cursor.prototype.subscribeLatency.call(this, yomo);

    var leaveSubscription = this.subscribeLeave(yomo);
    var enterSubscription = this.subscribeEnter(yomo);
    this.subscription.add(textMessageSubscription);
    this.subscription.add(latencySubscription);
    this.subscription.add(leaveSubscription);
    this.subscription.add(enterSubscription);
  };

  _proto.unsubscribe = function unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  _proto.onTextMessage = function onTextMessage(_message) {};

  _proto.subscribeTextMessage = function subscribeTextMessage(yomo) {
    var _this = this;

    return yomo.on$('text').pipe(filter(function (data) {
      return data.id === _this.id;
    })).subscribe(function (data) {
      _this.onTextMessage(data.message);
    });
  };

  _proto.subscribeMovement = function subscribeMovement(yomo) {
    var _this2 = this;

    return yomo.on$('movement').pipe(filter(function (data) {
      return data.id === _this2.id;
    }), map(function (data) {
      return getMousePosition(data.x, data.y);
    })).subscribe(function (_ref2) {
      var mouseX = _ref2.mouseX,
          mouseY = _ref2.mouseY;

      _Cursor.prototype.move.call(_this2, mouseX, mouseY);

      _this2.onMove({
        mouseX: mouseX,
        mouseY: mouseY
      });
    });
  };

  _proto.subscribeLeave = function subscribeLeave(yomo) {
    var _this3 = this;

    return yomo.on$('leave').pipe(filter(function (data) {
      return data.id === _this3.id;
    })).subscribe(function () {
      _this3.onLeave();
    });
  };

  _proto.subscribeEnter = function subscribeEnter(yomo) {
    var _this4 = this;

    return yomo.on$('enter').pipe(filter(function (data) {
      return data.id === _this4.id;
    })).subscribe(function () {
      _this4.onEnter();
    });
  };

  _proto.onLeave = function onLeave() {
    throw new Error('Method not implemented.');
  };

  _proto.onEnter = function onEnter() {
    throw new Error('Method not implemented.');
  };

  return Other;
}(Cursor);

var useOnlineCursor = function useOnlineCursor(_ref) {
  var presenceURL = _ref.presenceURL,
      presenceAuthEndpoint = _ref.presenceAuthEndpoint,
      room = _ref.room,
      name = _ref.name,
      avatar = _ref.avatar,
      color = _ref.color;

  var _useState = useState(null),
      me = _useState[0],
      setMe = _useState[1];

  var _useState2 = useState(new Map()),
      otherMap = _useState2[0],
      setOtherMap = _useState2[1];

  useEffect(function () {
    var ID = uuidv4();
    var me = new Me({
      id: ID,
      x: 0,
      y: 0,
      name: name || '',
      avatar: avatar || '',
      color: color || ''
    });
    setMe(me);
    var yomo = new Presence(presenceURL, {
      auth: {
        type: 'token',
        endpoint: presenceAuthEndpoint
      }
    });
    yomo.on('connected', function () {
      if (room) {
        yomo.toRoom(room);
      }

      yomo.on$('online').pipe(filter(function (data) {
        return data.id !== ID;
      })).subscribe(function (data) {
        setOtherMap(function (old) {
          if (old.has(data.id)) {
            return old;
          }

          var cursorMap = new Map(old);
          var other = new Other(data);
          other.goOnline(yomo);
          cursorMap.set(other.id, other);
          return cursorMap;
        });
      });
      yomo.on('offline', function (data) {
        setOtherMap(function (old) {
          var cursorMap = new Map(old);
          var other = cursorMap.get(data.id);

          if (other) {
            other.unsubscribe();
          }

          cursorMap.delete(data.id);
          return cursorMap;
        });
      }); // Answer server query, when other other go online, server will ask others states,
      // this is the response

      yomo.on$('sync').pipe(filter(function (data) {
        return data.id !== ID;
      })).subscribe(function (data) {
        setOtherMap(function (old) {
          if (old.has(data.id)) {
            return old;
          }

          var cursorMap = new Map(old);
          var other = new Other(data);
          other.goOnline(yomo);
          cursorMap.set(other.id, other);
          return cursorMap;
        });
      });
      me.goOnline(yomo);
    }); // yomo.on('closed', () => {});

    var cleanup = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return me.goOffline();

              case 2:
                yomo.close();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function cleanup() {
        return _ref2.apply(this, arguments);
      };
    }();

    window.addEventListener('unload', cleanup);
    return function () {
      cleanup();
      window.removeEventListener('unload', cleanup);
    };
  }, [room]);
  var others = [];
  otherMap.forEach(function (value) {
    others.push(value);
  });
  return {
    me: me,
    others: others
  };
};

function CursorIcon(_ref) {
  var color = _ref.color;
  return useMemo(function () {
    return React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: color,
      xmlns: "http://www.w3.org/2000/svg"
    }, React.createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M0 0L20 7.14286L11.0948 11.1194L7.14286 20L0 0Z"
    }));
  }, [color]);
}

var Latency = function Latency(_ref) {
  var cursor = _ref.cursor,
      showLatency = _ref.showLatency;

  var _useState = useState({
    meshId: '',
    latency: 0
  }),
      latencyData = _useState[0],
      setLatencyData = _useState[1];

  useEffect(function () {
    if (showLatency) {
      cursor.onGetLatency = function (data) {
        setLatencyData({
          meshId: data.meshId,
          latency: data.latency
        });
      };
    } else {
      cursor.onGetLatency = function (_) {};

      setLatencyData({
        meshId: '',
        latency: 0
      });
    }
  }, [showLatency]);

  if (latencyData.latency === 0) {
    return null;
  }

  return React.createElement("div", {
    className: "online-cursor-wrapper__latency-box"
  }, "\xA0", React.createElement("svg", {
    width: "8",
    height: "10",
    viewBox: "0 0 8 10",
    fill: "white",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M3.99993 0C4.99609 0 5.99332 0.367541 6.77237 1.10262C8.41307 2.65187 8.37032 5.28494 6.87655 6.95267L6.72235 7.11615L4.43096 9.41998C4.31176 9.53999 4.15531 9.6 3.99886 9.6C3.87371 9.6 3.74855 9.5616 3.64246 9.48479L3.56677 9.41998L1.27751 7.11508C-0.365737 5.46061 -0.467907 2.70352 1.22855 1.10262C2.00654 0.367541 3.00377 0 3.99993 0ZM3.99993 1C3.22932 1 2.48657 1.28975 1.91488 1.82992C0.711907 2.96512 0.701036 4.96169 1.84937 6.26336L1.98702 6.41038L3.999 8.436L6.01284 6.41146C7.2978 5.11772 7.33439 3.00868 6.08609 1.82996C5.51361 1.28979 4.77055 1 3.99993 1ZM4 2C5.10238 2 6 2.89762 6 4C6 5.10238 5.10238 6 4 6C2.89762 6 2 5.10238 2 4C2 2.89762 2.89762 2 4 2ZM4 3C3.4499 3 3 3.4499 3 4C3 4.5501 3.4499 5 4 5C4.5501 5 5 4.5501 5 4C5 3.4499 4.5501 3 4 3Z",
    fill: "white"
  })), "\xA0", React.createElement("span", null, latencyData.meshId), "\xA0", React.createElement("span", null, latencyData.latency, "ms"), "\xA0");
};

var useRenderPosition = function useRenderPosition(cursor, refContainer) {
  var finaliRefContainer = refContainer || useRef(null);
  useEffect(function () {
    var renderPosition = function renderPosition(position) {
      if (finaliRefContainer.current) {
        finaliRefContainer.current.style.setProperty('transform', "translate3d(" + position.mouseX + "px, " + position.mouseY + "px, 0)");
      }
    };

    renderPosition({
      mouseX: cursor.x,
      mouseY: cursor.y
    });

    cursor.onMove = function (position) {
      renderPosition(position);
    };
  }, [cursor]);
  return finaliRefContainer;
};

var useRenderOpacity = function useRenderOpacity(cursor, refContainer) {
  var finaliRefContainer = refContainer || useRef(null);
  useEffect(function () {
    var renderOpacity = function renderOpacity(opacity) {
      if (finaliRefContainer.current) {
        finaliRefContainer.current.style.setProperty('opacity', String(opacity));
      }
    };

    cursor.onLeave = function () {
      renderOpacity(0.5);
    };

    cursor.onEnter = function () {
      renderOpacity(1);
    };
  }, [cursor]);
  return finaliRefContainer;
};

var OtherCursor = function OtherCursor(_ref) {
  var cursor = _ref.cursor,
      showLatency = _ref.showLatency;
  var refContainer = useRenderPosition(cursor);
  useRenderOpacity(cursor, refContainer);

  var _useState = useState(''),
      msg = _useState[0],
      setMsg = _useState[1];

  useEffect(function () {
    cursor.onTextMessage = function (msg) {
      setMsg(msg);
    };
  }, []);
  return useMemo(function () {
    return React.createElement("div", {
      className: "online-cursor-wrapper__cursor",
      ref: refContainer
    }, React.createElement(CursorIcon, {
      color: cursor.color
    }), React.createElement("div", {
      className: "online-cursor-wrapper__tail-box",
      style: {
        borderRadius: msg ? 35 : 15,
        borderTopLeftRadius: msg ? 10 : 15,
        backgroundColor: "" + cursor.color
      }
    }, React.createElement("div", {
      className: "online-cursor-wrapper__user"
    }, cursor.avatar && React.createElement("img", {
      className: "online-cursor-wrapper__avatar",
      src: cursor.avatar,
      alt: "avatar"
    }), cursor.name && React.createElement("span", {
      className: "online-cursor-wrapper__name"
    }, cursor.name), React.createElement(Latency, {
      cursor: cursor,
      showLatency: showLatency
    })), React.createElement("div", {
      style: {
        height: '1px',
        width: '100%',
        visibility: 'hidden',
        background: 'transparent'
      }
    }), msg && React.createElement("div", {
      className: "online-cursor-wrapper__text"
    }, msg)));
  }, [msg, showLatency]);
};

var OthersCursors = function OthersCursors(_ref) {
  var others = _ref.others,
      _ref$showLatency = _ref.showLatency,
      showLatency = _ref$showLatency === void 0 ? false : _ref$showLatency;
  return React.createElement(React.Fragment, null, others.map(function (item) {
    return React.createElement(OtherCursor, {
      key: item.id,
      cursor: item,
      showLatency: showLatency
    });
  }));
};

var MeCursor = function MeCursor(_ref) {
  var cursor = _ref.cursor,
      showLatency = _ref.showLatency;
  var refContainer = useRenderPosition(cursor);

  var _useState = useState(false),
      showInput = _useState[0],
      setShowInput = _useState[1];

  var _useState2 = useState(''),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var onChangeInput = useCallback(function (e) {
    var inputValue = e.target.value;

    if (inputValue === '/') {
      return;
    }

    setInputValue(inputValue);
    cursor.sendMessage(inputValue);
  }, []);
  useEffect(function () {
    var keydown = function keydown(e) {
      /*if (e.code === 'Slash') {
          setShowInput(true);
      }*/
      if (e.code === 'KeyC' && e.shiftKey) {
        setShowInput(true);
      }

      if (e.code === 'Escape') {
        setShowInput(false);
        setInputValue('');
        cursor.sendMessage('');
      }
    };

    document.addEventListener('keydown', keydown);
    return function () {
      document.removeEventListener('keydown', keydown);
    };
  }, []);
  return useMemo(function () {
    return React.createElement("div", {
      className: "online-cursor-wrapper__cursor",
      ref: refContainer
    }, React.createElement(CursorIcon, {
      color: cursor.color
    }), React.createElement("div", {
      className: "online-cursor-wrapper__tail-box",
      style: {
        borderRadius: showInput ? 35 : 15,
        borderTopLeftRadius: showInput ? 10 : 15,
        backgroundColor: "" + cursor.color
      }
    }, React.createElement("div", {
      className: "online-cursor-wrapper__user"
    }, cursor.avatar && React.createElement("img", {
      className: "online-cursor-wrapper__avatar",
      src: cursor.avatar,
      alt: "avatar"
    }), cursor.name && React.createElement("span", {
      className: "online-cursor-wrapper__name"
    }, cursor.name), React.createElement(Latency, {
      cursor: cursor,
      showLatency: showLatency
    })), React.createElement("div", {
      style: {
        height: '1px',
        width: '100%',
        visibility: 'hidden',
        background: 'transparent'
      }
    }), showInput && React.createElement("div", {
      className: "online-cursor-wrapper__input-box"
    }, React.createElement("span", null, inputValue), React.createElement("input", {
      autoFocus: true,
      placeholder: "Say something",
      value: inputValue,
      onChange: onChangeInput
    }))));
  }, [showInput, inputValue, showLatency]);
};

var CursorChat = function CursorChat(_ref) {
  var presenceURL = _ref.presenceURL,
      presenceAuthEndpoint = _ref.presenceAuthEndpoint,
      room = _ref.room,
      _ref$showLatency = _ref.showLatency,
      showLatency = _ref$showLatency === void 0 ? false : _ref$showLatency,
      name = _ref.name,
      avatar = _ref.avatar,
      _ref$colors = _ref.colors,
      colors = _ref$colors === void 0 ? ['#604CFF', '#FF0BC6', '#00C0ED', '#FFAB24', '#F52768'] : _ref$colors;

  var _useOnlineCursor = useOnlineCursor({
    presenceURL: presenceURL,
    presenceAuthEndpoint: presenceAuthEndpoint,
    room: room,
    name: name,
    avatar: avatar,
    color: "" + colors[Math.floor(Math.random() * colors.length)]
  }),
      me = _useOnlineCursor.me,
      others = _useOnlineCursor.others;

  if (!me) {
    return null;
  }

  return React.createElement("div", {
    className: "online-cursor-wrapper"
  }, React.createElement(OthersCursors, {
    others: others,
    showLatency: showLatency
  }), React.createElement(MeCursor, {
    cursor: me,
    showLatency: showLatency
  }));
};

var CursorChat$1 = /*#__PURE__*/memo(CursorChat);

export default CursorChat$1;
export { useOnlineCursor, useRenderPosition };
//# sourceMappingURL=react-cursor-chat.esm.js.map
