'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Preact = _interopDefault(require('preact'));
var W = _interopDefault(require('wasmuth'));
var Helmet = _interopDefault(require('preact-helmet'));
var Portal = _interopDefault(require('preact-portal'));
var render = _interopDefault(require('preact-render-to-string'));

var DEBUG = typeof window !== 'undefined' ? window.location.hostname.indexOf('local') > -1 : process.env.NODE_ENV;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

if (typeof window !== 'undefined') {
  console.log(window.__initial_store__);
}

var state = {
  currentPath: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/',
  pendingRequests: 0
};
var components = [];

var subscribe = function subscribe(component) {
  components.push(component);
  return getState();
};

var unsubscribe = function unsubscribe(component) {
  var idx = components.findIndex(function (c) {
    return c === component;
  });
  idx > -1 && components.splice(idx, 1);
};

var getState = function getState() {
  return Object.freeze(_extends({}, state));
};

var setState = function setState(updatedState) {
  Object.assign(state, updatedState);
  DEBUG && console.log('setState', updatedState, state);
  components.forEach(function (c) {
    return c.setState(state);
  });
};

var clickState = function clickState(state) {
  return function (ev) {
    ev.preventDefault();
    setState(typeof state === 'function' ? state(getState(), ev) : state);
  };
};

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

function equal(a, b) {
  if (a === b) return true;

  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
    var arrA = isArray(a);
    var arrB = isArray(b);

    var i = void 0;
    var length = void 0;
    var key = void 0;

    if (arrA && arrB) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }
      return true;
    }

    if (arrA !== arrB) return false;

    var dateA = a instanceof Date;
    var dateB = b instanceof Date;
    if (dateA !== dateB) return false;
    if (dateA && dateB) return a.getTime() === b.getTime();

    var regexpA = a instanceof RegExp;
    var regexpB = b instanceof RegExp;
    if (regexpA !== regexpB) return false;
    if (regexpA && regexpB) return a.toString() === b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) return false;
    }

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

var WithState = function (_Preact$Component) {
  inherits(WithState, _Preact$Component);

  function WithState(props) {
    classCallCheck(this, WithState);

    var _this = possibleConstructorReturn(this, (WithState.__proto__ || Object.getPrototypeOf(WithState)).call(this, props));

    var state = subscribe(_this);
    _this.state = _extends({}, state, { _mappedState: props.mapper(state, props) });
    return _this;
  }

  createClass(WithState, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      unsubscribe(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !equal(nextProps.mapper(nextState, nextProps), this.state._mappedState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _mappedState = this.props.mapper(getState(), this.props);
      if (!equal(_mappedState, this.state._mappedState)) {
        this.setState({ _mappedState: _mappedState });
      }
    }
  }, {
    key: 'render',
    value: function render$$1(_ref, _ref2) {
      var children = _ref.children;
      var _mappedState = _ref2._mappedState;

      var child = children[0];
      if (!child || typeof child !== 'function') {
        throw new Error('WithState requires a function as its only child');
      }
      return child(_mappedState);
    }
  }]);
  return WithState;
}(Preact.Component);

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
var decode = function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
};

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function parse(query) {
  var parser = /([^=?&]+)=?([^&]*)/g;
  var result = {};
  var part = void 0;

  while ((part = parser.exec(query)) != null) {
    var key = decode(part[1]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = decode(part[2]);
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function stringify(obj) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if (typeof prefix !== 'string') prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

var qs = {
  stringify: stringify,
  parse: parse
};

var Level = function Level(_ref) {
  var children = _ref.children,
      props = objectWithoutProperties(_ref, ['children']);
  return Preact.h(
    'div',
    props,
    Preact.h(
      'div',
      { className: 'level' },
      children
    )
  );
};

var Carousel = function (_Preact$Component) {
  inherits(Carousel, _Preact$Component);

  function Carousel(props) {
    classCallCheck(this, Carousel);

    var _this = possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.state = { active: _this.props.active || 0, width: 0 };
    _this.next = _this.next.bind(_this);
    _this.prev = _this.prev.bind(_this);
    _this.setActive = _this.setActive.bind(_this);
    _this.getRef = _this.getRef.bind(_this);
    _this.getStyle = _this.getStyle.bind(_this);
    _this.getSlidesStyle = _this.getSlidesStyle.bind(_this);
    return _this;
  }

  createClass(Carousel, [{
    key: 'next',
    value: function next(ev) {
      ev.preventDefault();
      var active = this.state.active + this.state.numFit;
      var n = active >= this.props.children.length - 1 ? 0 : this.state.active + 1;
      this.setState({ active: n });
    }
  }, {
    key: 'prev',
    value: function prev(ev) {
      ev.preventDefault();
      var n = this.state.active <= 0 ? this.props.children.length - (this.state.numFit + 1) : this.state.active - 1;
      this.setState({ active: n });
    }
  }, {
    key: 'setActive',
    value: function setActive(active) {
      var _this2 = this;

      return function (ev) {
        ev.preventDefault();
        _this2.setState({ active: active });
      };
    }
  }, {
    key: 'getRef',
    value: function getRef(ref) {
      var _this3 = this;

      if (!ref || this.ref) return;
      this.ref = ref;
      window.requestAnimationFrame(function () {
        var width = _this3.ref.offsetWidth;
        var parent = _this3.ref.parentNode;
        var parentWidth = parent.offsetWidth;
        var numFit = parent != null ? Math.max(0, Math.floor(parent.offsetWidth / width) - 1) : 0;
        _this3.setState({ width: width, parentWidth: parentWidth, numFit: numFit });
      });
    }
  }, {
    key: 'getStyle',
    value: function getStyle(idx, active) {
      var _state = this.state,
          parentWidth = _state.parentWidth,
          width = _state.width;

      var style = parentWidth != null ? 'width: ' + parentWidth + 'px;' : '';
      if (active === 0 || idx >= active) {
        return style;
      }
      return style + ' margin-left: -' + width + 'px;';
    }
  }, {
    key: 'getSlidesStyle',
    value: function getSlidesStyle() {
      return 'width: ' + this.state.parentWidth * this.props.children.length + 'px;';
    }
  }, {
    key: 'render',
    value: function render$$1(_ref) {
      var _this4 = this;

      var children = _ref.children,
          _ref$className = _ref.className,
          className = _ref$className === undefined ? 'carousel-slide' : _ref$className,
          _ref$noNav = _ref.noNav,
          noNav = _ref$noNav === undefined ? false : _ref$noNav,
          _ref$withDots = _ref.withDots,
          withDots = _ref$withDots === undefined ? false : _ref$withDots,
          _ref$wrapperClass = _ref.wrapperClass,
          wrapperClass = _ref$wrapperClass === undefined ? '' : _ref$wrapperClass;
      var active = this.state.active;

      return Preact.h(
        'div',
        { className: 'carousel ' + wrapperClass },
        Preact.h(
          'div',
          null,
          Preact.h(
            'div',
            { className: 'carousel-inner' },
            !noNav && Preact.h(
              'nav',
              { className: 'nav prev' },
              Preact.h('button', { onClick: this.prev })
            ),
            Preact.h(
              'div',
              { className: 'slides-wrapper' },
              Preact.h(
                'div',
                { className: 'slides', style: this.getSlidesStyle() },
                W.map(function (c, idx) {
                  return Preact.h(
                    'div',
                    {
                      ref: function ref(_ref2) {
                        return idx === 0 && _this4.getRef(_ref2);
                      },
                      style: _this4.getStyle(idx, active),
                      'class': '' + className + (idx === active ? ' active' : '')
                    },
                    c
                  );
                }, children)
              )
            ),
            !noNav && Preact.h(
              'nav',
              { className: 'nav next' },
              Preact.h('button', { onClick: this.next })
            )
          ),
          withDots && Preact.h(
            Level,
            { className: 'carousel-dots' },
            W.map(function (i) {
              return Preact.h(
                'button',
                {
                  onClick: _this4.setActive(i),
                  className: '' + (i === active ? 'active' : '')
                },
                i
              );
            }, W.range(0, children.length))
          )
        )
      );
    }
  }]);
  return Carousel;
}(Preact.Component);

var DEFAULT_PROPS = {
  mapper: function mapper(_ref, _ref2) {
    var dropdown = _ref.dropdown;
    var uid = _ref2.uid;

    if (!uid) {
      console.warn('<Dropdown> must include a uid prop.');
    }
    return {
      isOpen: dropdown === uid
    };
  }
};

var Dropdown = function (_WithState) {
  inherits(Dropdown, _WithState);

  function Dropdown(props) {
    classCallCheck(this, Dropdown);

    var _this = possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = _extends({}, _this.state, { isOpen: false });
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  createClass(Dropdown, [{
    key: 'handleClick',
    value: function handleClick(ev) {
      ev.preventDefault();
      var isOpen = this.state._mappedState.isOpen;

      setState({ dropdown: isOpen ? null : this.props.uid });
    }
  }, {
    key: 'render',
    value: function render$$1(_ref3) {
      var Trigger = _ref3.Trigger,
          _ref3$buttonText = _ref3.buttonText,
          buttonText = _ref3$buttonText === undefined ? 'Select' : _ref3$buttonText,
          _ref3$noWrapper = _ref3.noWrapper,
          noWrapper = _ref3$noWrapper === undefined ? false : _ref3$noWrapper,
          children = _ref3.children;
      var isOpen = this.state._mappedState.isOpen;

      console.log({ isOpen: isOpen });
      var cls = isOpen ? 'dropdown-menu open' : isOpen === false ? 'dropdown-menu close' : 'dropdown-menu';
      return Preact.h(
        'div',
        null,
        Trigger === undefined ? Preact.h(
          'button',
          { className: 'btn btn-dropdown black-ghost-btn', onClick: this.handleClick },
          Preact.h(
            Level,
            { noPadding: true },
            buttonText
          )
        ) : Preact.h(Trigger, { className: 'btn-dropdown', onClick: this.handleClick }),
        noWrapper ? isOpen && children : Preact.h(
          'div',
          { className: cls },
          Preact.h('div', { 'class': 'dropdown-arrow' }),
          children
        )
      );
    }
  }]);
  return Dropdown;
}(WithState);


Dropdown.defaultProps = DEFAULT_PROPS;

// DOM event to close all Dropdown's on off-click
var isDropdown = function isDropdown(el) {
  return el.classList && el.classList.contains('dropdown-menu') || el.classList && el.classList.contains('btn-dropdown');
};

try {
  document.body.addEventListener('click', function (ev) {
    var activeDropdown = W.path('dropdown', getState());
    console.log({ activeDropdown: activeDropdown });
    if (!activeDropdown) {
      return;
    }
    var el = ev.target;
    if (isDropdown(el)) return;
    while (el.parentNode) {
      el = el.parentNode;
      if (isDropdown(el)) return;
    }
    setState({ dropdown: null });
  });
} catch (_) {}

function LoadingIndicator(_ref) {
  var _ref$variant = _ref.variant,
      variant = _ref$variant === undefined ? 'flashing' : _ref$variant;

  return Preact.h('div', { className: 'dot-' + variant });
}

var getPos = function getPos(props) {
  return W.pipe(W.pick(['up', 'right', 'down', 'left']), W.filter(function (x) {
    return !!x;
  }), W.toPairs, W.path('0.0'))(props);
};

function Tooltip(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$text = _ref.text,
      text = _ref$text === undefined ? 'I am default text' : _ref$text,
      _ref$length = _ref.length,
      length = _ref$length === undefined ? 'medium' : _ref$length,
      children = _ref.children,
      props = objectWithoutProperties(_ref, ['className', 'text', 'length', 'children']);

  return Preact.h(
    'div',
    _extends({
      className: 'tooltip ' + className,
      'data-tooltip': text,
      'data-tooltip-pos': getPos(props),
      'data-tooltip-length': length
    }, props),
    children
  );
}

var ref = void 0;

function showNotification(notification) {
  ref && ref.setState(_extends({}, ref.state, notification, { open: true }));
}

var Notification = function (_Preact$Component) {
  inherits(Notification, _Preact$Component);

  function Notification(props) {
    classCallCheck(this, Notification);

    var _this = possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

    _this.state = { open: false, message: null, type: 'error', length: 3000 };
    return _this;
  }

  createClass(Notification, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.state.message) {
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          return _this2.timeout && _this2.setState({ open: false });
        }, this.state.length);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timeout && clearTimeout(this.timeout);
    }
  }, {
    key: 'render',
    value: function render$$1(_, _ref) {
      var open = _ref.open,
          message = _ref.message,
          type = _ref.type;

      if (!ref) ref = this;
      if (!message) return null;
      return Preact.h(
        'div',
        { className: 'notification-bar ' + type + ' ' + (open ? 'open' : 'close') },
        Preact.h(
          'span',
          { className: 'text' },
          message
        ),
        Preact.h('div', { className: 'close-icon', onClick: this.onClose })
      );
    }
  }]);
  return Notification;
}(Preact.Component);

var Home = (function () {
  return Preact.h(
    'div',
    { style: { padding: '1em' } },
    Preact.h(
      'h1',
      null,
      Preact.h(
        Tooltip,
        { text: 'This is home!' },
        'Home'
      )
    ),
    Preact.h(LoadingIndicator, null),
    Preact.h(
      Dropdown,
      { uid: 'home-example' },
      Preact.h(
        'p',
        null,
        Preact.h(
          'button',
          { onClick: function onClick(ev) {
              return setState({ modal: 'ExampleModal' });
            } },
          'Open Example Modal'
        )
      ),
      Preact.h(
        'p',
        null,
        Preact.h(
          'button',
          { onClick: function onClick(ev) {
              return showNotification({ message: 'PIRATES!' });
            } },
          'Pirates!'
        )
      ),
      Preact.h(
        'p',
        null,
        'Classy Penguin'
      )
    ),
    Preact.h(
      Carousel,
      { withDots: true },
      W.map(function (hex) {
        return Preact.h('img', { src: 'http://www.placehold.it/400x300/' + hex + '/f44?text=' + hex, style: 'width: 100%;' });
      }, ['fff', 'a7c', '09d', '411', '111'])
    )
  );
});

var API_URL = 'http://10.0.2.2:8000';

var XMLHttpRequest = typeof window !== 'undefined' ? window.XMLHttpRequest : require('xmlhttprequest').XMLHttpRequest;

var safelyParse = function safelyParse(json, key) {
  try {
    var parsed = JSON.parse(json);
    return key != null ? parsed[key] : parsed;
  } catch (_) {
    return json;
  }
};

var getAuthHeader = function getAuthHeader() {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var token = getState().token;
  if (token) {
    headers.Authorization = 'Token ' + token;
  }
  return headers;
};

var makeErr = function makeErr(code, msg) {
  var e = new Error(msg);
  e.code = code;
  if (code === 401) {
    typeof window !== 'undefined' && window.localStorage.removeItem('token');
  }
  console.log('makeErr', { code: code, msg: msg });
  return e;
};

function makeRequest(_ref) {
  var endpoint = _ref.endpoint,
      url = _ref.url,
      _ref$method = _ref.method,
      method = _ref$method === undefined ? 'get' : _ref$method,
      data = _ref.data,
      headers = _ref.headers,
      invalidate = _ref.invalidate;

  if (endpoint != null) {
    url = endpoint.indexOf('http') === -1 ? API_URL + '/' + endpoint : endpoint;
  }

  var xhr = new XMLHttpRequest();
  var promise = new Promise(function (resolve, reject) {
    xhr.open(method.toUpperCase(), url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      invalidate && clearCache(invalidate);
      xhr.status >= 400 ? reject(makeErr(xhr.status, safelyParse(xhr.responseText, 'detail'))) : resolve(safelyParse(xhr.responseText));
    };
    xhr.onerror = function () {
      return reject(xhr);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');

    headers = getAuthHeader(headers);
    if (headers && W.toType(headers) === 'object') {
      W.map(function (k, v) {
        return xhr.setRequestHeader(k, v);
      }, headers);
    }

    var dataType = W.toType(data);

    xhr.send(dataType === 'object' || dataType === 'array' ? JSON.stringify(data) : data);
  });
  return { xhr: xhr, promise: promise };
}

var OK_TIME = 30000;
var CACHE = {};

var clearCache = function clearCache(endpoint) {
  CACHE[endpoint] = null;
  console.log('clearCache', endpoint, CACHE);
};

var cache = function cache(endpoint, result) {
  CACHE[endpoint] = { result: result, timestamp: Date.now() };
};

var validCache = function validCache(endpoint) {
  var ts = CACHE[endpoint] && CACHE[endpoint].timestamp;
  if (!ts) return false;
  var diff = Date.now() - ts;
  if (diff < OK_TIME) {
    return true;
  }
  clearCache(endpoint);
  return false;
};

var reducePending = function reducePending() {
  var curr = getState().pendingRequests;
  if (curr > 0) {
    setState({ pendingRequests: curr - 1 });
  }
};

var WithRequest = function (_React$Component) {
  inherits(WithRequest, _React$Component);

  function WithRequest(props) {
    classCallCheck(this, WithRequest);

    var _this = possibleConstructorReturn(this, (WithRequest.__proto__ || Object.getPrototypeOf(WithRequest)).call(this, props));

    _this.state = _extends({}, _this.state || {}, { isLoading: true, result: null, error: null });
    _this._existing = null;
    setState({ pendingRequests: getState().pendingRequests + 1 });
    _this._loadResult(_this.props);
    return _this;
  }

  createClass(WithRequest, [{
    key: '_performRequest',
    value: function _performRequest(endpoint, parse) {
      var _this2 = this;

      var token = getState().token;
      var headers = {};
      if (token) {
        headers.Authorization = 'Token ' + token;
      }

      var _makeRequest = makeRequest({ endpoint: endpoint, headers: headers }),
          xhr = _makeRequest.xhr,
          promise = _makeRequest.promise;

      this._existing = xhr;
      this._existing._endpoint = endpoint;

      promise.then(function (result) {
        cache(endpoint, result);
        _this2.setState({ result: result, isLoading: false });
        reducePending();
      }).catch(function (error) {
        console.log('_performRequest', { error: error });
        _this2.setState({ error: error, isLoading: false });
        reducePending();
      });
    }
  }, {
    key: '_loadResult',
    value: function _loadResult(props) {
      if (!props.request || !props.request.endpoint) {
        return;
      }
      if (this._existing && !this.state.error) {
        this._existing.abort();
        this._existing = null;
      }

      var _props$request = props.request,
          endpoint = _props$request.endpoint,
          parse = _props$request.parse;

      if (validCache(endpoint)) {
        this.setState({ result: CACHE[endpoint].result, isLoading: false });
        reducePending();
      } else {
        this._performRequest(endpoint, parse);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var nextEndpoint = (nextProps.request || {}).endpoint;
      var currEndpoint = (this.props.request || {}).endpoint;
      if (currEndpoint !== nextEndpoint) {
        return true;
      }
      return !equal(nextState, this.state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var endpointChanged = this.props.request !== prevProps.request;
      if (endpointChanged) {
        this.setState({ isLoading: true, result: null });
        this._loadResult(this.props);
        return;
      }
      if (!this._existing) return;
      if ((this.props.request || {}).endpoint !== this._existing._endpoint) {
        this.setState({ isLoading: true });
        this._loadResult(this.props);
      }
    }
  }, {
    key: 'render',
    value: function render$$1(_ref) {
      var children = _ref.children;

      var child = children[0];
      if (!child || typeof child !== 'function') {
        throw new Error('WithRequest requires a function as its only child');
      }
      return child(this.state);
    }
  }]);
  return WithRequest;
}(Preact.Component);

function paginationRange(current, numPages) {
  var delta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (numPages <= 1) return [1];

  var left = current - delta;
  var right = current + delta + 1;
  var range = [];
  var rangeWithDots = [];

  range.push(1);

  for (var i = current - delta; i <= current + delta; i++) {
    if (i >= left && i < right && i < numPages && i > 1) {
      range.push(i);
    }
  }

  range.push(numPages);

  var count = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = range[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _i = _step.value;

      if (count) {
        if (_i - count === delta - 1) {
          rangeWithDots.push(count + 1);
        } else if (_i - count !== 1) {
          rangeWithDots.push(null);
        }
      }
      rangeWithDots.push(_i);
      count = _i;
    }

    // if at first or last page, pad range so there are at least 4 options
    // if `numPages` permits it.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (numPages >= 4 && rangeWithDots.length === 4) {
    if (current === numPages) {
      return [].concat(toConsumableArray(rangeWithDots.slice(0, 2)), [numPages - 2], toConsumableArray(rangeWithDots.slice(-2)));
    } else if (current === 1) {
      return [].concat(toConsumableArray(rangeWithDots.slice(0, 2)), [current + 2], toConsumableArray(rangeWithDots.slice(-2)));
    }
  }

  return rangeWithDots;
}

function updateQuery(queries) {
  var existingParams = qs.parse(window.location.search);
  return window.location.pathname + ('?' + qs.stringify(_extends({}, existingParams, queries)));
}

var pageBuilder = function pageBuilder(page) {
  return updateQuery({ page: page });
};

var Pagination = function (_Preact$Component) {
  inherits(Pagination, _Preact$Component);

  function Pagination() {
    classCallCheck(this, Pagination);
    return possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  createClass(Pagination, [{
    key: 'render',
    value: function render$$1(_ref) {
      var activePage = _ref.activePage,
          pageSize = _ref.pageSize,
          request = _ref.request;
      var count = request.count,
          next = request.next,
          previous = request.previous;

      if (!count || count < pageSize) {
        return;
      }

      var numPages = Math.ceil(count / pageSize);
      var pages = paginationRange(activePage, numPages);

      return Preact.h(
        'nav',
        { 'class': 'pagination' },
        previous ? Preact.h(
          'a',
          { href: pageBuilder(activePage - 1) },
          Preact.h('span', { className: 'arrow back' }),
          ' Back'
        ) : Preact.h(
          'span',
          { className: 'disabled' },
          Preact.h('span', { className: 'arrow back' }),
          ' Back'
        ),
        Preact.h(
          'ul',
          null,
          W.map(function (page, index) {
            return page ? Preact.h(
              'li',
              { key: 'page-' + page },
              Preact.h(
                'a',
                { href: pageBuilder(page), className: activePage === page ? 'active' : '' },
                page
              )
            ) : Preact.h(
              'li',
              { key: 'break-' + index },
              '\u2026'
            );
          }, pages)
        ),
        next ? Preact.h(
          'a',
          { href: pageBuilder(activePage + 1) },
          'Next ',
          Preact.h('span', { className: 'arrow next' })
        ) : Preact.h(
          'span',
          { className: 'disabled' },
          'Next ',
          Preact.h('span', { className: 'arrow next' })
        )
      );
    }
  }]);
  return Pagination;
}(Preact.Component);

var OK_TYPES = ['function', 'object'];

var ListResource = function (_WithState) {
  inherits(ListResource, _WithState);

  function ListResource() {
    classCallCheck(this, ListResource);
    return possibleConstructorReturn(this, (ListResource.__proto__ || Object.getPrototypeOf(ListResource)).apply(this, arguments));
  }

  createClass(ListResource, [{
    key: 'render',
    value: function render$$1(_ref) {
      var children = _ref.children,
          endpoint = _ref.endpoint,
          _ref$list = _ref.list,
          list = _ref$list === undefined ? true : _ref$list,
          limit = _ref.limit,
          _ref$pagination = _ref.pagination,
          pagination = _ref$pagination === undefined ? false : _ref$pagination;

      var Child = children[0];
      var type = typeof Child === 'undefined' ? 'undefined' : _typeof(Child);
      if (!Child || !OK_TYPES.includes(type)) {
        throw new Error('ListResource requires a function or Component as its only child');
      }
      var func = type === 'function' ? Child : function (props) {
        return Preact.h(Child, props);
      };

      // @TODO: Needs to access search params on SSR
      var search = typeof window !== 'undefined' ? window.location.search : '';
      var args = qs.parse(search);
      var activePage = args.page ? parseInt(args.page, 10) : 1;

      var request = {
        endpoint: limit != null ? endpoint + '?limit=' + limit + (activePage > 1 ? '&offset=' + limit * activePage : '') : endpoint
      };
      return Preact.h(
        WithRequest,
        { request: request },
        function (_ref2) {
          var result = _ref2.result,
              isLoading = _ref2.isLoading;
          return isLoading ? Preact.h(
            'p',
            null,
            'Loading...'
          ) : Preact.h(
            'div',
            { key: request.endpoint },
            list ? W.map(func, W.pathOr(result, 'results', result)) : func(_extends({}, result)),
            pagination && limit != null ? Preact.h(Pagination, { activePage: activePage, request: result, pageSize: limit }) : null
          );
        }
      );
    }
  }]);
  return ListResource;
}(WithState);


ListResource.defaultProps = { mapper: function mapper(_ref3) {
    var currentPath = _ref3.currentPath;
    return { currentPath: currentPath };
  } };

var endpoint = 'https://input-qee-prod.herokuapp.com/videos';

var Videos = (function () {
  return Preact.h(
    ListResource,
    { endpoint: endpoint, limit: 5, pagination: true },
    function (_ref) {
      var title = _ref.title;
      return Preact.h(
        'div',
        null,
        Preact.h(
          'h2',
          null,
          title
        )
      );
    }
  );
});

var routes = {
  home: {
    path: '/',
    Page: Home
  },
  videos: {
    path: '/videos',
    Page: Videos
  }
};

var endpoint$1 = 'https://jsonplaceholder.typicode.com/users';

var Users = (function () {
  return Preact.h(
    ListResource,
    { endpoint: endpoint$1 },
    function (_ref) {
      var id = _ref.id,
          name = _ref.name,
          email = _ref.email;
      return Preact.h(
        'div',
        null,
        Preact.h(
          'h2',
          null,
          Preact.h(
            'a',
            { href: '/users/' + id },
            name
          )
        ),
        Preact.h(
          'p',
          null,
          email
        )
      );
    }
  );
});

var Resource = (function (_ref) {
  var endpoint = _ref.endpoint,
      props = objectWithoutProperties(_ref, ['endpoint']);
  return Preact.h(ListResource, _extends({ key: 'resource-' + endpoint, list: false, endpoint: endpoint }, props));
});

var url = 'https://jsonplaceholder.typicode.com/users/';

var User = (function (_ref) {
  var id = _ref.id;
  return Preact.h(
    'div',
    { key: 'user' },
    Preact.h(
      Resource,
      { endpoint: '' + url + id },
      function (_ref2) {
        var name = _ref2.name,
            email = _ref2.email;
        return Preact.h(
          'div',
          null,
          Preact.h(Helmet, {
            title: name
          }),
          Preact.h(
            'h1',
            null,
            name
          ),
          Preact.h(
            'p',
            null,
            email
          ),
          Preact.h(
            'p',
            null,
            Preact.h(
              'a',
              { href: '/users' },
              '\u2190 Back to all Users'
            )
          )
        );
      }
    ),
    Preact.h(
      'a',
      { href: '/users/' + (parseInt(id, 10) + 1) },
      'Next'
    )
  );
});

var isReactNative = typeof window !== 'undefined' && window.navigator.product === 'ReactNative';

// children can be an array or object in React,
// but always array in Preact.
var compatMap = Preact.Children ? Preact.Children.map : function (ls, fn) {
  return Array.prototype.map.call(ls, fn);
};

// React method to skip textNodes, and Preact fallback.
var compatIsValid = Preact.isValidElement ? Preact.isValidElement : function (child) {
  return child.nodeName != null;
};

// These are the component names that we will sync values
// to our parent Form state.
// @TODO: This should be props passed into <Form />
var formFieldNames = [
// Our ReactNative 'form' components
'InputIcon', 'InputText'];

var getNodeName = function getNodeName(child) {
  return child.type ? child.type.displayName : child.nodeName.name;
};

var getProps = function getProps(child) {
  return child.attributes || child.props || {};
};

// Is one of the above defined form fields, and has a `name`
// prop set. We can't sync state if the component doesn't have
// have a `name` prop set.
var isFormField = function isFormField(child) {
  return formFieldNames.includes(getNodeName(child)) && getProps(child).name != null;
};

/**
 * Our Form Component
 *
 * Required Props:
 *
 *  name: A unique String identifer for your Form
 *
 * Optional Props:
 *
 *  initialData: An Object whose keys match formFieldNames and whose values will
 *  be set as defaults.
 *
 *  onSubmit: When the Form is submitted, this will be called with
 *  `{hasError, errors, data}`
 *
 * If you do not specify an `onSubmit` prop, you should specify a `action` and
 * optional `method` prop.
 *
 *  action: The URL to send the form data to.
 *  method: The HTTP method to use, defaults to POST.
 */

var Form = function (_React$Component) {
  inherits(Form, _React$Component);

  function Form(props) {
    classCallCheck(this, Form);

    var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    if (!_this.props.name) throw new Error('<Form /> Components needs a `name` prop.');
    _this.state = {
      values: _this.props.initialData || {},
      errors: {}
    };
    _this._fields = {};
    return _this;
  }

  createClass(Form, [{
    key: '_updateChildFormFields',
    value: function _updateChildFormFields(children, formName) {
      var _this2 = this;

      return compatMap(children, function (child) {
        if (!compatIsValid(child)) {
          return child;
        }

        var childProps = child.attributes || child.props;
        if (childProps.isSubmit) {
          // if has isSubmit flag, treat as Submit button on ReactNative
          child = Preact.cloneElement(child, { formName: formName, onPress: function onPress() {
              return _this2._onSubmit();
            } });
        } else if (isFormField(child)) {
          // If one of our nested Form Fields, add syncState prop.
          // If not ReactNative, override the onChange event to sync value.
          var newProps = {
            formName: formName,
            text: _this2.state.values[child.props.name],
            syncState: function syncState(state) {
              return _this2.setState({ values: _extends({}, _this2.state.values, defineProperty({}, childProps.name, state.value || state.text)) });
            }
          };
          if (!isReactNative) {
            newProps.onChange = function (ev) {
              return _this2.setState({ values: _extends({}, _this2.state.values, defineProperty({}, childProps.name, ev.target.value)) });
            };
          }
          child = Preact.cloneElement(child, newProps);
          // Store a reference to our fields, so we can validate them on submit
          _this2._fields[childProps.name] = child;
        } else if (child.children || child.props.children) {
          // Recursively search children for more form fields
          child = Preact.cloneElement(child, {
            formName: formName,
            children: _this2._updateChildFormFields(child.children || child.props.children, formName)
          });
        }

        return child;
      });
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(ev) {
      var _this3 = this;

      ev && ev.preventDefault();
      var fieldNames = Object.keys(this._fields);

      // @TODO: More validations, allow props to set them, etc.
      var errors = fieldNames.reduce(function (errs, name) {
        var comp = _this3._fields[name];
        if (getProps(comp).required && !_this3.state.values[name]) {
          errs[name] = 'Is required.';
        }
        return errs;
      }, {});

      var hasError = Object.keys(errors).length > 0;
      hasError && this.setState({ errors: _extends({}, this.state.errors, errors) });

      if (this.props.onSubmit) {
        this.props.onSubmit({
          hasError: hasError,
          errors: errors,
          data: this.state.values
        });
      } else {
        var _makeRequest = makeRequest({
          endpoint: this.props.action,
          method: this.props.method || 'post',
          data: this.state.values
        }),
            xhr = _makeRequest.xhr,
            promise = _makeRequest.promise;

        console.log('makeRequest', this.state.values);
        promise.then(function (r) {
          return _this3.props.onSuccess && _this3.props.onSuccess(r);
        }).catch(function (_) {
          return _this3.props.onFailure && _this3.props.onFailure(xhr);
        });
      }
    }
  }, {
    key: 'render',
    value: function render$$1() {
      var children = this._updateChildFormFields(this.children || this.props.children, this.props.name);
      return isReactNative ? children : Preact.h(
        'form',
        {
          id: 'Form-' + this.props.name,
          key: this.props.name,
          onSubmit: this._onSubmit.bind(this)
        },
        children
      );
    }
  }]);
  return Form;
}(Preact.Component);

var TextInput = function TextInput(_ref) {
  var props = objectWithoutProperties(_ref, []);
  return Preact.h('input', _extends({ type: 'text' }, props));
};

var Login = (function () {
  return Preact.h(
    Form,
    { name: 'Login', onSubmit: function onSubmit(form) {
        return console.log('form', form);
      } },
    'cool',
    Preact.h(TextInput, { required: true, name: 'email', placeholder: 'Your Email' }),
    Preact.h(TextInput, { required: true, type: 'password', name: 'password', placeholder: 'Your Password' }),
    Preact.h(
      'button',
      { type: 'submit' },
      'Login'
    )
  );
});

var accountRoutes = {
  users: {
    path: '/users',
    Page: Users
  },
  user: {
    path: '/users/:id',
    Page: User
  },
  login: {
    path: '/login',
    Page: Login
  }
};

// Define all routes here so `urlFor` works
var allRoutes = {
  Main: routes,
  Account: accountRoutes
};

var routes$1 = Object.values(allRoutes).reduce(function (acc, el) {
  return _extends({}, acc, el);
}, {});

/**
 * Get the path string for the route with name `name`
 * Best understood with an example:
 *
 * ```
 * const routes = {
 *  myRoute: '/some/:fancy/:route'
 * }
 *
 * urlFor('myRoute', {
 *   args: {fancy: 12, route: 'r2d2'},
 *   queries: {search: 'hi'}
 * })
 * > '/some/12/r2d2?search=hi'
 * ```
 */
var urlFor = function urlFor(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$args = _ref.args,
      args = _ref$args === undefined ? {} : _ref$args,
      _ref$queries = _ref.queries,
      queries = _ref$queries === undefined ? {} : _ref$queries;

  var rule = routes$1[name];
  if (!rule) {
    console.warn('No route found for name: ' + name);
  }
  var replaced = Object.keys(args).reduce(function (acc, k) {
    return acc.replace(':' + k, args[k]);
  }, rule.path);
  var hasQueries = Object.keys(queries).length > 0;
  return '' + replaced + (!hasQueries ? '' : '?' + qs.stringify(queries));
};

var Header = (function () {
  return Preact.h(
    WithState,
    { mapper: function mapper(_ref) {
        var clicks = _ref.clicks;
        return { clicks: clicks };
      } },
    function (_ref2) {
      var clicks = _ref2.clicks;
      return Preact.h(
        'header',
        { 'class': 'layout-center' },
        Preact.h(
          'h1',
          null,
          'Daily ',
          clicks
        ),
        Preact.h(
          'button',
          { onClick: clickState({ clicks: clicks + 1 }) },
          '+'
        ),
        Preact.h(
          'a',
          { href: urlFor('home') },
          'Main App'
        ),
        '\xA0',
        Preact.h(
          'a',
          { href: urlFor('users') },
          'Account App'
        ),
        '\xA0'
      );
    }
  );
});

var Base = function Base() {
  return Preact.h(
    'div',
    null,
    'Not Found :('
  );
};

var NotFound = (function (props) {
  return !getState().route ? Base() : null;
});

var segmentize = function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
};

var exec = function exec(url, route) {
  var reg = /(?:\?([^#]*))?(#.*)?$/;
  var c = url.match(reg);
  var matches = {};
  var ret = void 0;
  if (c && c[1]) {
    var p = c[1].split('&');
    for (var i = 0; i < p.length; i++) {
      var r = p[i].split('=');
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
    }
  }
  url = segmentize(url.replace(reg, ''));
  route = segmentize(route || '');
  var max = Math.max(url.length, route.length);
  for (var _i = 0; _i < max; _i++) {
    if (route[_i] && route[_i].charAt(0) === ':') {
      var param = route[_i].replace(/(^:|[+*?]+$)/g, '');
      var flags = (route[_i].match(/[+*?]+$/) || {})[0] || '';
      var plus = ~flags.indexOf('+');
      var star = ~flags.indexOf('*');
      var val = url[_i] || '';
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false;
        break;
      }
      matches[param] = decodeURIComponent(val);
      if (plus || star) {
        matches[param] = url.slice(_i).map(decodeURIComponent).join('/');
        break;
      }
    } else if (route[_i] !== url[_i]) {
      ret = false;
      break;
    }
  }
  if (ret === false) return false;
  return matches;
};

if (typeof window !== 'undefined') {
  document.addEventListener('click', function (ev) {
    if (ev.target.nodeName === 'A') {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      window.scrollTo(0, 0);
      var url = ev.target.getAttribute('href');
      window.history['pushState'](null, null, url);
      setState({ currentPath: url });
    }
  });
}

var Router = (function (_ref) {
  var routes = _ref.routes;
  return Preact.h(
    WithState,
    { mapper: function mapper(_ref2) {
        var currentPath = _ref2.currentPath;
        return { currentPath: currentPath };
      } },
    function (_ref3) {
      var currentPath = _ref3.currentPath;

      for (var route in routes) {
        var routeArgs = exec(currentPath, routes[route].path);
        if (routeArgs) {
          var newRoute = {
            name: route,
            path: routes[route].path,
            args: routeArgs
          };
          if (!equal(newRoute, getState().route)) {
            setState({
              route: {
                name: route,
                path: routes[route].path,
                args: routeArgs
              }
            });
          }
          var Page = routes[route].Page;
          return Preact.h(Page, routeArgs);
        }
      }
    },
    '}'
  );
});

var Apps = function (_WithState) {
  inherits(Apps, _WithState);

  function Apps() {
    classCallCheck(this, Apps);
    return possibleConstructorReturn(this, (Apps.__proto__ || Object.getPrototypeOf(Apps)).apply(this, arguments));
  }

  createClass(Apps, [{
    key: 'render',
    value: function render$$1(_ref, _ref2) {
      var children = _ref.children,
          routes = _ref.routes;
      var _mappedState = _ref2._mappedState;
      var currentPath = _mappedState.currentPath;

      var routeMatches = function routeMatches(r) {
        return exec(currentPath, r.path);
      };
      var appName = W.pipe(W.map(function (name, routes) {
        return Object.values(routes);
      }), W.toPairs, W.find(function (_ref3) {
        var _ref4 = slicedToArray(_ref3, 2),
            name = _ref4[0],
            routes = _ref4[1];

        return W.find(routeMatches, routes);
      }), function (_ref5) {
        var _ref6 = slicedToArray(_ref5, 2),
            name = _ref6[0],
            _ = _ref6[1];

        return name;
      })(routes);
      var App = W.pipe(W.find(W.pathEq('nodeName.name', appName)), function (child) {
        return Preact.cloneElement(child, { routes: routes[appName] });
      })(children);
      return App;
    }
  }]);
  return Apps;
}(WithState);

var isOverlay = function isOverlay(el) {
  return el.classList && el.classList.contains('modal-container');
};

var Modal = function (_Preact$Component) {
  inherits(Modal, _Preact$Component);

  function Modal(props) {
    classCallCheck(this, Modal);

    var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.onContainerClick = _this.onContainerClick.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }

  createClass(Modal, [{
    key: 'onContainerClick',
    value: function onContainerClick(ev) {
      if (isOverlay(ev.target)) {
        this.props.onClose ? this.props.onClose() : setState({ modal: null });
      }
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.props.onClose ? this.props.onClose() : setState({ modal: null });
    }
  }, {
    key: 'render',
    value: function render$$1(_ref) {
      var _ref$className = _ref.className,
          className = _ref$className === undefined ? '' : _ref$className,
          children = _ref.children;

      return Preact.h(
        Portal,
        { into: 'body' },
        Preact.h(
          'div',
          {
            'class': 'modal-container ' + className,
            onClick: this.onContainerClick
          },
          Preact.h(
            'div',
            { 'class': 'modal-content' },
            Preact.h(
              'div',
              { className: 'close', onClick: this.closeModal },
              'close'
            ),
            children
          )
        )
      );
    }
  }]);
  return Modal;
}(Preact.Component);


var Modals = function (_WithState) {
  inherits(Modals, _WithState);

  function Modals() {
    classCallCheck(this, Modals);
    return possibleConstructorReturn(this, (Modals.__proto__ || Object.getPrototypeOf(Modals)).apply(this, arguments));
  }

  createClass(Modals, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_, prevState) {
      get(Modals.prototype.__proto__ || Object.getPrototypeOf(Modals.prototype), 'componentDidUpdate', this).call(this);
      var modal = this.state._mappedState.modal;

      var prevModal = W.path('_mappedState.modal', prevState);
      if (!modal) {
        if (prevModal != null) {
          document.body.classList.remove('modal-open');
        }
        return;
      } else if (modal !== prevModal) {
        document.body.classList.add('modal-open');
      }

      var route = W.path('_mappedState.route.name', this.state);
      var prevRoute = W.path('_mappedState.route.name', prevState);
      if (route !== prevRoute) {
        setState({ modal: null });
      }
    }
  }, {
    key: 'render',
    value: function render$$1(_ref2, _ref3) {
      var children = _ref2.children;
      var _mappedState = _ref3._mappedState;
      var modal = _mappedState.modal;

      var child = W.find(function (c) {
        return W.pathEq('nodeName.name', modal, c);
      }, children);
      return child;
    }
  }]);
  return Modals;
}(WithState);

Modals.defaultProps = {
  mapper: function mapper(_ref4) {
    var modal = _ref4.modal,
        route = _ref4.route;
    return { modal: modal, route: route };
  }
};

function ExampleModal() {
  return Preact.h(
    Modal,
    null,
    Preact.h(
      'h1',
      null,
      'Example Modal'
    )
  );
}

var Main = (function () {
  return Preact.h(
    'div',
    null,
    Preact.h(Router, { routes: routes }),
    Preact.h(
      Modals,
      null,
      Preact.h(ExampleModal, null)
    )
  );
});

var AccountHeader = function AccountHeader() {
  return Preact.h(
    'header',
    { className: 'alt' },
    Preact.h(
      'a',
      { href: urlFor('users') },
      'Users'
    ),
    '\xA0',
    Preact.h(
      'a',
      { href: urlFor('login') },
      'Login'
    )
  );
};

var Account = (function (_ref) {
  var routes = _ref.routes;
  return Preact.h(
    'div',
    { id: 'account-layout' },
    Preact.h(AccountHeader, null),
    Preact.h(Router, { routes: routes })
  );
});

var MainApp = function MainApp() {
  return Preact.h(
    'div',
    { className: 'main-app-container' },
    Preact.h(Helmet, {
      title: 'Welcome',
      titleTemplate: 'PWA Starter | %s',
      defaultTitle: 'Welcome'
    }),
    Preact.h(Header, null),
    Preact.h(Notification, null),
    Preact.h(
      Apps,
      { routes: allRoutes, mapper: function mapper(_ref) {
          var currentPath = _ref.currentPath;
          return { currentPath: currentPath };
        } },
      Preact.h(Main, null),
      Preact.h(Account, null)
    ),
    Preact.h(NotFound, null)
  );
};

if (typeof window !== 'undefined') {
  Preact.render(Preact.h(MainApp, null), document.body, document.body.children[0]);
}

var renderReact = function renderReact(url) {
  return new Promise(function (resolve, reject) {
    setState({ currentPath: url });
    render(Preact.h(MainApp, null)); // Render, to register pendingRequests

    var helmet = Helmet.rewind();
    var head = '\n    ' + helmet.title.toString() + '\n    ' + helmet.meta.toString() + '\n    ' + helmet.link.toString() + '\n  ';
    console.log('pendingRequests', getState().pendingRequests);
    var maxTime = 6000;
    var delay = 1;
    var count = 0;
    var id = setInterval(function () {
      var pending = getState().pendingRequests;
      if (!pending || count * delay >= maxTime) {
        clearInterval(id);
        var state = JSON.stringify(getState());
        // Rerender html again, now that pendingRequests are done
        resolve({ html: render(Preact.h(MainApp, null)), head: head, state: state });
      }
      count++;
    }, delay);
  });
};

var sirv = require('sirv');
var polka = require('polka');
var compress = require('compression')();

var port = process.env.PORT || 5000;

var assets = sirv('public', {
  immutable: false
});

var ssr = function ssr(req, res, next) {
  renderReact(req.url).then(function (_ref) {
    var html = _ref.html,
        head = _ref.head,
        state = _ref.state;

    res.end('<!doctype html>\n      <html lang="en">\n        <head>\n          <base href="/">\n          <meta charset="utf-8">\n          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">\n          <link rel="stylesheet" href="./bundle.css?nosafaricache=123123" />\n          ' + head + '\n        </head>\n        <body>\n          <div class=\'main-app-container\'>' + html + '</div>\n          <script>window.__initial_store__ = ' + JSON.stringify(state) + ';</script>\n          <script src="./bundle.js?nosafaricache=123123"></script>\n        </body>\n      </html>');
  });
};

polka().use(compress, assets, ssr).listen(port).then(function () {
  console.log('> Ready on http://localhost:' + port);
});
