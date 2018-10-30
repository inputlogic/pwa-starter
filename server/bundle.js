'use strict';

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var VNode = function VNode() {};

var options = {};

var stack = [];

var EMPTY_CHILDREN = [];

function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') ; else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		try {
			node[name] = value == null ? '' : value;
		} catch (e) {}
		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

var hydrating = false;

function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	if (!diffLevel++) {
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	if (! --diffLevel) {
		hydrating = false;

		if (!componentRoot) flushMounts();
	}

	return ret;
}

function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			}
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	} else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	diffAttributes(out, vnode.attributes, props);

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			} else if (min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		unmountComponent(component);
	} else {
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

function diffAttributes(dom, attrs, old) {
	var name;

	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

var recyclerComponents = [];

function createComponent(Ctor, props, context) {
	var inst,
	    i = recyclerComponents.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	while (i--) {
		if (recyclerComponents[i].constructor === Ctor) {
			inst.nextBase = recyclerComponents[i].nextBase;
			recyclerComponents.splice(i, 1);
			return inst;
		}
	}

	return inst;
}

function doRender(props, state, context) {
	return this.constructor(props, context);
}

function setComponentProps(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode !== 0) {
		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

function renderComponent(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    snapshot = previousContext,
	    rendered,
	    inst,
	    cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	while (component._renderCallbacks.length) {
		component._renderCallbacks.pop().call(component);
	}if (!diffLevel && !isChild) flushMounts();
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;

			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

function Component(props, context) {
	this._dirty = true;

	this.context = context;

	this.props = props;

	this.state = this.state || {};

	this._renderCallbacks = [];
}

extend(Component.prototype, {
	setState: function setState(state, callback) {
		if (!this.prevState) this.prevState = this.state;
		this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	},
	forceUpdate: function forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent(this, 2);
	},
	render: function render() {}
});

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

var preact$1 = /*#__PURE__*/Object.freeze({
            default: preact,
            h: h,
            createElement: h,
            cloneElement: cloneElement,
            Component: Component,
            render: render,
            rerender: rerender,
            options: options
});

var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},r={};function n(t){var n="";for(var o in t){var a=t[o];null!=a&&(n&&(n+=" "),n+=r[o]||(r[o]=o.replace(/([A-Z])/g,"-$1").toLowerCase()),n+=": ",n+=a,"number"==typeof a&&!1===e.test(o)&&(n+="px"),n+=";");}return n||void 0}function o(e,t){for(var r in t)e[r]=t[r];return e}var a={shallow:!0},i=[],l=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;c.render=c;var s=function(e,t){return c(e,t,a)};function c(e,r,a,s,f){if(null==e||"boolean"==typeof e)return "";var u,p=e.nodeName,v=e.attributes,d=!1;if(r=r||{},a=a||{},"object"!=typeof e&&!p)return t(e);if("function"==typeof p){if(d=!0,!a.shallow||!s&&!1!==a.renderRootComponent){var h,m=function(e){var t=o({},e.attributes);t.children=e.children;var r=e.nodeName.defaultProps;if(void 0!==r)for(var n in r)void 0===t[n]&&(t[n]=r[n]);return t}(e);if(p.prototype&&"function"==typeof p.prototype.render){var g=new p(m,r);g._disable=g.__x=!0,g.props=m,g.context=r,p.getDerivedStateFromProps?g.state=o(o({},g.state),p.getDerivedStateFromProps(g.props,g.state)):g.componentWillMount&&g.componentWillMount(),h=g.render(g.props,g.state,g.context),g.getChildContext&&(r=o(o({},r),g.getChildContext()));}else h=p(m,r);return c(h,r,a,!1!==a.shallowHighOrder)}p=(u=p).displayName||u!==Function&&u.name||function(e){var t=(Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!t){for(var r=-1,n=i.length;n--;)if(i[n]===e){r=n;break}r<0&&(r=i.push(e)-1),t="UnnamedComponent"+r;}return t}(u);}var b,y="";if(v){var x=Object.keys(v);a&&!0===a.sortAttributes&&x.sort();for(var w=0;w<x.length;w++){var k=x[w],C=v[k];if("children"!==k&&(!k.match(/[\s\n\\/='"\0<>]/)&&(a&&a.allAttributes||"key"!==k&&"ref"!==k))){if("className"===k){if(v.class)continue;k="class";}else f&&k.match(/^xlink:?./)&&(k=k.toLowerCase().replace(/^xlink:?/,"xlink:"));"style"===k&&C&&"object"==typeof C&&(C=n(C));var S=a.attributeHook&&a.attributeHook(k,C,r,a,d);if(S||""===S)y+=S;else if("dangerouslySetInnerHTML"===k)b=C&&C.__html;else if((C||0===C||""===C)&&"function"!=typeof C){if(!(!0!==C&&""!==C||(C=k,a&&a.xml))){y+=" "+k;continue}y+=" "+k+'="'+t(C)+'"';}}}}if(y="<"+p+y+">",String(p).match(/[\s\n\\/='"\0<>]/))throw y;var j=String(p).match(l);j&&(y=y.replace(/>$/," />"));var _=[];if(b)y+=b;else if(e.children)for(var F=0;F<e.children.length;F++){var H=e.children[F];if(null!=H&&!1!==H){var N=c(H,r,a,!0,"svg"===p||"foreignObject"!==p&&f);N&&_.push(N);}}if(_.length)y+=_.join("");else if(a&&a.xml)return y.substring(0,y.length-1)+" />";return j||(y+="</"+p+">"),y}c.shallowRender=s;

var e$1=function(e){return {}.toString.call(e).toLowerCase().slice(8,-1)};function r$1(r,t){for(var o,n,a=0,i=(r=Array.prototype.slice.call(r)).length;a<i;++a)if(o=e$1(r[a]),"-any"!==(n=t[a]))if("array"===e$1(n)){for(var f=!1,p=0,l=n.length;p<l;++p)f=f||o===n[p];if(!f)throw new TypeError("Expected one of ["+n.join(", ")+"] given '"+o+"' for argument at index "+a)}else if(o!==n)throw new TypeError("Expected '"+n+"' given '"+o+"' for argument at index "+a)}r$1.prototype.toType=e$1;

function t$1(r,t){return t=[r].concat(Array.prototype.slice.call(t)),r.bind.apply(r,t)}var n$1=r$1.prototype.toType;function e$2(o,a,u){return arguments.length<2?t$1(e$2,arguments):(r$1(arguments,["number","number",["array","string"]]),"array"===n$1(u)?Array.prototype.slice.call(u,o,a):String.prototype.slice.call(u,o,a))}function o$1(t){return r$1(arguments,[["object","array"]]),JSON.parse(JSON.stringify(t))}var a$1=r$1.prototype.toType;function u(n,e){return arguments.length<2?t$1(u,arguments):(r$1(arguments,["function",["array","object"]]),"array"===a$1(e)?Array.prototype.filter.call(e,n):function(r,t){for(var n=Object.keys(t),e=n.length,o={},a=0;a<e;a++)r(t[n[a]])&&(o[n[a]]=t[n[a]]);return o}(n,e))}function i$1(n,e){if(arguments.length<2)return t$1(i$1,arguments);r$1(arguments,["array","object"]);for(var o={},a=0;a<n.length;a++){var u=n[a];o[u]=e[u];}return o}var c$1=r$1.prototype.toType;function y(n,e){return arguments.length<2?t$1(y,arguments):(r$1(arguments,[["string","array"],"object"]),"string"===c$1(n)&&(n=[n]),i$1(u(function(r){return -1===n.indexOf(r)},Object.keys(e)),e))}function p(n,e,o){if(arguments.length<2)return t$1(p,arguments);r$1(arguments,["function","array","-any"]);for(var a,u=e.length,i=0;i<u;i++)if(n(a=e[i],i,e))return o?i:a}function l$1(n,e,o){return arguments.length<3?t$1(l$1,arguments):(r$1(arguments,["function","-any","array"]),Array.prototype.reduce.call(o,n,e))}var f=r$1.prototype.toType;var g="[^\\.\\s@:][^\\s@:]*(?!\\.)@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*";var s$1=r$1.prototype.toType;var h$1=r$1.prototype.toType;var v=r$1.prototype.toType;function d(){for(var r=arguments,t=arguments.length,n={},e=0;e<t;e++){if("object"!==v(r[e]))throw new TypeError("All arguments must be objects!");for(var o=r[e],a=Object.keys(o),u=a.length,i=0;i<u;i++){var c=a[i],y=v(o[c]);n[c]="object"===y?d(o[c]):"array"===y?o[c].slice(0):o[c];}}return n}function b(n,e){if(arguments.length<2)return t$1(b,arguments);r$1(arguments,[["array","string"],["array","object","window"]]),"string"===r$1.prototype.toType(n)&&(n=n.split("."));for(var o=e,a=0;a<n.length;a++){if(null==o)return;o=o[n[a]];}return o}function j(n,e,a){if(arguments.length<3)return t$1(j,arguments);r$1(arguments,[["array","string"],"-any",["object","array"]]),"string"===r$1.prototype.toType(n)&&(n=n.split("."));var u="object"===r$1.prototype.toType(n)?d({},a):o$1(a);return l$1(function(r,t,o){return r[t]=r[t]||{},n.length===o+1&&(r[t]=e),r[t]},u,n),u}var m=r$1.prototype.toType;var w=r$1.prototype.toType;var T=r$1.prototype.toType;var O=r$1.prototype.toType;var A=r$1.prototype.toType;var W = {assoc:j,check:r$1,chunk:function n(o,a){if(arguments.length<2)return t$1(n,arguments);r$1(arguments,["number",["array","string"]]);for(var u=[],i=a.length,c=0;c<i;)u.push(e$2(c,c+=o,a));return u},deepClone:o$1,diffObj:function(t,n){r$1(arguments,["object","object"]);for(var e={},o=Object.keys(t),a=0;a<o.length;a++){var u=o[a];t[u]!==n[u]&&(e[u]=n[u]);}for(var i=Object.keys(n),c=0;c<i.length;c++)t[i[c]]||(e[i[c]]=n[i[c]]);return e},dissoc:function r(n,e){return arguments.length<2?t$1(r,arguments):y([n],e)},filter:u,find:p,findIndex:function r(n,e){return arguments.length<2?t$1(r,arguments):p(n,e,!0)},fromPairs:function(t){r$1(arguments,["array"]);for(var n={},e=0;e<t.length;e++)n[t[e][0]]=t[e][1];return n},groupBy:function n(e,o){return arguments.length<2?t$1(n,arguments):(r$1(arguments,["string","array"]),l$1(function(r,t){return r[t[e]]||(r[t[e]]=[]),r[t[e]].push(t),r},{},o))},groupPropBy:function n(e,o,a){return arguments.length<3?t$1(n,arguments):(r$1(arguments,["string","string","array"]),l$1(function(r,t){return r[t[o]]||(r[t[o]]=[]),r[t[o]].push(t[e]),r},{},a))},guid:function(){var r=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return r()+r()+"-"+r()+"-"+r()+"-"+r()+"-"+r()+r()+r()},includes:function n(e,o){return arguments.length<2?t$1(n,arguments):(r$1(arguments,["-any",["array","string"]]),"array"===f(o)?Array.prototype.includes.call(o,e):String.prototype.includes.call(o,e))},isEmail:function(r){return new RegExp("^"+g+"$").test(r)},join:function n(e,o){return 0===arguments.length?n:"array"===s$1(e)&&void 0===o?Array.prototype.join.call(e):"string"===s$1(e)&&void 0===o?t$1(n,arguments):(r$1(arguments,["string","array"]),Array.prototype.join.call(o,e))},last:function(t){return r$1([arguments[0]],["array"]),t[t.length?t.length-1:0]},map:function n(e,o){return arguments.length<2?t$1(n,arguments):(r$1(arguments,["function",["array","object"]]),"array"===h$1(o)?1===e.length?function(r,t){for(var n=t.length,e=[],o=0;o<n;o++)e[o]=r(t[o]);return e}(e,o):Array.prototype.map.call(o,e):function(r,t){for(var n=Object.keys(t),e=n.length,o={},a=0;a<e;a++){var u=n[a];o[u]=r(u,t[u]);}return o}(e,o))},merge:d,partial:t$1,path:b,pathEq:function r(n,e,o){return arguments.length<3?t$1(r,arguments):b(n,o)===e},pathOr:function r(n,e,o){return arguments.length<3?t$1(r,arguments):b(e,o)||n},pathSet:j,pick:i$1,pipe:function(){if(arguments&&arguments.length){var r=arguments,t=r.length;return function(n){for(var e=0;e<t;e++)r[e]&&(n=r[e](n));return n}}},range:function(t,n){r$1(arguments,["number","number"]);for(var e=[],o=t;o<n;)e.push(o),o+=1;return e},reduce:l$1,reject:function n(e,o){return arguments.length<2?t$1(n,arguments):(r$1(arguments,["function",["array","object"]]),"array"===m(o)?function(r,t){for(var n=t.length,e=[],o=0;o<n;o++)r(t[o])||e.push(t[o]);return e}(e,o):function(r,t){for(var n=Object.keys(t),e=n.length,o={},a=0;a<e;a++)r(t[n[a]])||(o[n[a]]=t[n[a]]);return o}(e,o))},relativeTime:function(r,t){"string"===w(r)&&(r=new Date(r));var n=(t=t||Date.now())-r;return n<=0?"just now":n<6e4?Math.round(n/1e3)+" seconds ago":n<36e5?Math.round(n/6e4)+" minutes ago":n<864e5?Math.round(n/36e5)+" hours ago":n<2592e6?Math.round(n/864e5)+" days ago":n<31536e6?Math.round(n/2592e6)+" months ago":Math.round(n/31536e6)+" years ago"},safeWindow:function(r){for(var t=[],n=arguments.length-1;n-- >0;)t[n]=arguments[n+1];if("undefined"!=typeof window){var e=b(r,window);return "function"===T(e)?e.call.apply(e,[r.indexOf("localStorage")>-1?window.localStorage:window].concat(t)):e}},slice:e$2,slugify:function(r){return r.toLowerCase().replace(/[^a-zA-Z0-9 ]/g,"").replace(/\s/g,"-").replace(" ","-")},some:function n(e,o){return arguments.length<2?t$1(n,arguments):(r$1(arguments,["function",["array","object"]]),"array"===O(o)?Array.prototype.some.call(o,e):function(r,t){for(var n=Object.keys(t),e=n.length,o=0;o<e;o++)if(r(t[n[o]]))return !0;return !1}(e,o))},sort:function n(e,o){return 0===arguments.length?n:"array"===A(e)&&void 0===o?Array.prototype.sort.call(e):"function"===A(e)&&void 0===o?t$1(n,arguments):(r$1(arguments,["function","array"]),Array.prototype.sort.call(o,e))},toPairs:function(t){r$1(arguments,["object"]);for(var n=Object.keys(t),e=n.length,o=[],a=0;a<e;a++)o.push([n[a],t[n[a]]]);return o},toType:r$1.prototype.toType,uniq:function(t){r$1(arguments,["array"]);for(var n=[],e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);return n},where:function n(e,o,a){return arguments.length<3?t$1(n,arguments):(r$1(Array.prototype.slice.call(arguments,0,3),["string","-any","object"]),a[e]===o)},without:y};

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

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var refs = [];

var rewind = function rewind() {
  var res = W.reduce(function (acc, el) {
    return W.merge(acc, el.props);
  }, {}, refs);
  return res;
};

var Wrapper = function Wrapper(_ref) {
  var children = _ref.children;

  if (typeof window !== 'undefined') {
    var titleChild = W.find(function (_ref2) {
      var nodeName = _ref2.nodeName;
      return nodeName === 'title';
    }, children);
    if (titleChild) {
      var title = titleChild.children[0];
      if (title !== document.title) {
        document.title = title;
      }
    }
    return null;
  } else {
    return preact.h(
      'div',
      null,
      children
    );
  }
};

var Helmet = function (_React$Component) {
  inherits(Helmet, _React$Component);

  function Helmet(props) {
    classCallCheck(this, Helmet);

    var _this = possibleConstructorReturn(this, (Helmet.__proto__ || Object.getPrototypeOf(Helmet)).call(this, props));

    refs.push(_this);
    return _this;
  }

  createClass(Helmet, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      var newRefs = W.reject(function (c) {
        return c === _this2;
      }, refs);
      refs = newRefs;
      document.title = this._getTitle({});
    }
  }, {
    key: '_getTitle',
    value: function _getTitle(props) {
      var _rewind$props = _extends({}, rewind(), props),
          title = _rewind$props.title,
          _rewind$props$titleTe = _rewind$props.titleTemplate,
          titleTemplate = _rewind$props$titleTe === undefined ? '%s' : _rewind$props$titleTe,
          defaultTitle = _rewind$props.defaultTitle;

      return titleTemplate.replace('%s', title || defaultTitle || '');
    }
  }, {
    key: '_getMeta',
    value: function _getMeta(_ref3) {
      var _ref3$meta = _ref3.meta,
          meta = _ref3$meta === undefined ? [] : _ref3$meta;

      return meta.map(function (_ref4) {
        var name = _ref4.name,
            property = _ref4.property,
            content = _ref4.content;
        return preact.h('meta', {
          name: name,
          property: property,
          content: content,
          'data-helmet': true
        });
      });
    }
  }, {
    key: 'render',
    value: function render$$1() {
      return preact.h(
        Wrapper,
        null,
        preact.h(
          'title',
          { 'data-helmet': 'true' },
          this._getTitle(this.props)
        ),
        this._getMeta(this.props)
      );
    }
  }]);
  return Helmet;
}(preact.Component);

function n$2(n,t){for(var r in t)n[r]=t[r];return n}function createStore(t){var r=[];function u(n){for(var t=[],u=0;u<r.length;u++)r[u]===n?n=null:t.push(r[u]);r=t;}function e(u,e,f){t=e?u:n$2(n$2({},t),u);for(var i=r,o=0;o<i.length;o++)i[o](t,f);}return t=t||{},{action:function(n){function r(t){e(t,!1,n);}return function(){for(var u=arguments,e=[t],f=0;f<arguments.length;f++)e.push(u[f]);var i=n.apply(this,e);if(null!=i)return i.then?i.then(r):r(i)}},setState:e,subscribe:function(n){return r.push(n),function(){u(n);}},unsubscribe:u,getState:function(){return t}}}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

var require$$0 = getCjsExportFromNamespace(preact$1);

var preact$2 = createCommonjsModule(function (module, exports) {
var t=require$$0;function n(t,n){for(var r in n)t[r]=n[r];return t}function r(t){this.getChildContext=function(){return {store:t.store}};}r.prototype.render=function(t){return t.children[0]},exports.connect=function(r,e){var o;return "function"!=typeof r&&("string"==typeof(o=r||[])&&(o=o.split(/\s*,\s*/)),r=function(t){for(var n={},r=0;r<o.length;r++)n[o[r]]=t[o[r]];return n}),function(o){function i(i,u){var c=this,f=u.store,s=r(f?f.getState():{},i),a=e?function(t,n){"function"==typeof t&&(t=t(n));var r={};for(var e in t)r[e]=n.action(t[e]);return r}(e,f):{store:f},p=function(){var t=r(f?f.getState():{},c.props);for(var n in t)if(t[n]!==s[n])return s=t,c.setState(null);for(var e in s)if(!(e in t))return s=t,c.setState(null)};this.componentDidMount=function(){f.subscribe(p);},this.componentWillUnmount=function(){f.unsubscribe(p);},this.render=function(r){return t.h(o,n(n(n({},a),r),s))};}return (i.prototype=new t.Component).constructor=i}},exports.Provider=r;

});
var preact_1 = preact$2.connect;
var preact_2 = preact$2.Provider;

var ref = void 0;

function showNotification(notification) {
  ref && ref.setState(_extends({}, ref.state, notification, { open: true }));
}

/**
 * Display a notification when `showNotification` is called.
 *
 * @TODO: Update to use store/global state.
 */

var Notification = function (_React$Component) {
  inherits(Notification, _React$Component);

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
      return preact.h(
        'div',
        { className: 'notification-bar ' + type + ' ' + (open ? 'open' : 'close') },
        preact.h(
          'span',
          { className: 'text' },
          message
        ),
        preact.h('div', { className: 'close-icon', onClick: this.onClose })
      );
    }
  }]);
  return Notification;
}(preact.Component);

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

var WithState = function (_React$Component) {
  inherits(WithState, _React$Component);

  function WithState(props, _ref) {
    var store = _ref.store;
    classCallCheck(this, WithState);

    var _this = possibleConstructorReturn(this, (WithState.__proto__ || Object.getPrototypeOf(WithState)).call(this, props));

    _this._store = store;
    _this._update = _this._update.bind(_this);
    _this._unsubscribe = store.subscribe(_this._update);
    _this.state = _extends({}, _this.state, { _mappedState: props.mapper(store.getState(), props) });
    return _this;
  }

  createClass(WithState, [{
    key: '_update',
    value: function _update(state) {
      console.log('_update', this.props);
      this.setState({ _mappedState: this.props.mapper(this._store.getState(), this.props) });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var mappedStateChanged = !equal(nextProps.mapper(nextState, nextProps), this.state._mappedState);
      if (mappedStateChanged) {
        return true;
      } else if (!equal(nextState, this.state)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _mappedState = this.props.mapper(this._store.getState(), this.props);
      if (!equal(_mappedState, this.state._mappedState)) {
        this.setState({ _mappedState: _mappedState });
      }
    }
  }, {
    key: 'render',
    value: function render$$1() {
      var _mappedState = this.state._mappedState;

      var child = this.children ? this.children[0] : this.props.children[0];
      if (!child || typeof child !== 'function') {
        throw new Error('WithState requires a function as its only child');
      }
      return child(_extends({}, _mappedState, { store: this._store }));
    }
  }]);
  return WithState;
}(preact.Component);

var isArray$1 = Array.isArray;
var keyList$1 = Object.keys;
var hasProp$1 = Object.prototype.hasOwnProperty;

function equal$1(a, b) {
  if (a === b) return true;

  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
    var arrA = isArray$1(a);
    var arrB = isArray$1(b);

    var i = void 0;
    var length = void 0;
    var key = void 0;

    if (arrA && arrB) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!equal$1(a[i], b[i])) return false;
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

    var keys = keyList$1(a);
    length = keys.length;

    if (length !== keyList$1(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!hasProp$1.call(b, keys[i])) return false;
    }

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal$1(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

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

var storeRef = void 0;

var segmentize = function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
};

function updateQuery(queries) {
  var existingParams = qs.parse(window.location.search);
  return window.location.pathname + ('?' + qs.stringify(_extends({}, existingParams, queries)));
}

// route matching logic, taken from preact-router
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

var Router = (function (_ref) {
  var routes = _ref.routes;
  return preact.h(
    WithState,
    { mapper: function mapper(_ref2) {
        var currentPath = _ref2.currentPath;
        return { currentPath: currentPath };
      } },
    function (_ref3) {
      var currentPath = _ref3.currentPath,
          store = _ref3.store;

      if (!storeRef) storeRef = store;
      for (var route in routes) {
        if (routes[route].hasOwnProperty('routes')) {
          var shouldRender = Object.values(routes[route].routes).some(function (_ref4) {
            var path = _ref4.path;
            return path && exec(currentPath, path);
          });
          if (shouldRender) {
            var App = routes[route].component;
            return preact.h(App, null);
          }
        } else {
          var routeArgs = exec(currentPath, routes[route].path);
          if (routeArgs) {
            var newRoute = {
              name: route,
              path: routes[route].path,
              args: routeArgs
            };
            if (!equal$1(newRoute, store.getState().currentRoute)) {
              store.setState({ currentRoute: newRoute });
            }
            var Component$$1 = routes[route].component;
            return preact.h(Component$$1, routeArgs);
          }
        }
      }
    }
  );
});

if (typeof window !== 'undefined') {
  document.addEventListener('click', function (ev) {
    if (ev.target.nodeName === 'A' && storeRef) {
      if (ev.metaKey) return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      window.scrollTo(0, 0);
      var url = ev.target.getAttribute('href');
      var currentPath = storeRef.getState().currentPath;
      if (currentPath !== url) {
        window.history['pushState'](null, null, url);
        storeRef.setState({ currentPath: url });
      }
    }
  });
}

var preactPortal = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory(require$$0);
}(commonjsGlobal, (function (preact) {
var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
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

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Portal = function (_Component) {
	inherits(Portal, _Component);

	function Portal() {
		classCallCheck(this, Portal);
		return possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Portal.prototype.componentDidUpdate = function componentDidUpdate(props) {
		for (var i in props) {
			if (props[i] !== this.props[i]) {
				return setTimeout(this.renderLayer);
			}
		}
	};

	Portal.prototype.componentDidMount = function componentDidMount() {
		this.isMounted = true;
		this.renderLayer = this.renderLayer.bind(this);
		this.renderLayer();
	};

	Portal.prototype.componentWillUnmount = function componentWillUnmount() {
		this.renderLayer(false);
		this.isMounted = false;
		if (this.remote) this.remote.parentNode.removeChild(this.remote);
	};

	Portal.prototype.findNode = function findNode(node) {
		return typeof node === 'string' ? document.querySelector(node) : node;
	};

	Portal.prototype.renderLayer = function renderLayer() {
		var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

		if (!this.isMounted) return;

		if (this.props.into !== this.intoPointer) {
			this.intoPointer = this.props.into;
			if (this.into && this.remote) {
				this.remote = preact.render(preact.h(PortalProxy, null), this.into, this.remote);
			}
			this.into = this.findNode(this.props.into);
		}

		this.remote = preact.render(preact.h(
			PortalProxy,
			{ context: this.context },
			show && this.props.children || null
		), this.into, this.remote);
	};

	Portal.prototype.render = function render() {
		return null;
	};

	return Portal;
}(preact.Component);

var PortalProxy = function (_Component2) {
	inherits(PortalProxy, _Component2);

	function PortalProxy() {
		classCallCheck(this, PortalProxy);
		return possibleConstructorReturn(this, _Component2.apply(this, arguments));
	}

	PortalProxy.prototype.getChildContext = function getChildContext() {
		return this.props.context;
	};

	PortalProxy.prototype.render = function render(_ref) {
		var children = _ref.children;

		return children && children[0] || null;
	};

	return PortalProxy;
}(preact.Component);

return Portal;

})));

});

var isOverlay = function isOverlay(el) {
  return el.classList && el.classList.contains('modal-container');
};

var actions = function actions(store) {
  return {
    onContainerClick: function onContainerClick(state, event) {
      if (isOverlay(event.target)) {
        return { modal: null };
      }
    },
    closeModal: function closeModal(state) {
      return { modal: null };
    }
  };
};

var Modal = preact_1('', actions)(function (_ref) {
  var onContainerClick = _ref.onContainerClick,
      closeModal = _ref.closeModal,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      children = _ref.children;
  return preact.h(
    preactPortal,
    { into: 'body' },
    preact.h(
      'div',
      {
        'class': 'modal-container ' + className,
        onClick: onContainerClick
      },
      preact.h(
        'div',
        { 'class': 'modal-content' },
        preact.h(
          'div',
          { className: 'close', onClick: closeModal },
          'close'
        ),
        children
      )
    )
  );
});

/**
* Component that should wrap any modal instances.
*
*   <Modals>
*     <SomeModal />
*     <AnotherModal />
*   </Modals>
*/
var prevState = {};
var Modals = preact_1('currentRoute, modal', actions)(function (_ref2) {
  var currentRoute = _ref2.currentRoute,
      modal = _ref2.modal,
      closeModal = _ref2.closeModal,
      children = _ref2.children;

  var prevModal = prevState.modal;
  var prevRouteName = W.path('currentRoute.name', prevState);

  prevState = { currentRoute: currentRoute, modal: modal };

  if (!modal) {
    if (prevModal != null) {
      document.body.classList.remove('modal-open');
    }
    return;
  } else if (modal !== prevModal) {
    document.body.classList.add('modal-open');
  }

  if (W.path('name', currentRoute || {}) !== prevRouteName) {
    closeModal();
  }

  var child = W.find(function (c) {
    return W.pathEq('nodeName.name', modal, c);
  }, children);
  return child;
});

var isArray$2 = Array.isArray;
var keyList$2 = Object.keys;
var hasProp$2 = Object.prototype.hasOwnProperty;

function equal$2(a, b) {
  if (a === b) return true;

  if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') {
    var arrA = isArray$2(a);
    var arrB = isArray$2(b);

    var i = void 0;
    var length = void 0;
    var key = void 0;

    if (arrA && arrB) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!equal$2(a[i], b[i])) return false;
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

    var keys = keyList$2(a);
    length = keys.length;

    if (length !== keyList$2(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!hasProp$2.call(b, keys[i])) return false;
    }

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal$2(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

var storeRef$1 = void 0;

var segmentize$1 = function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
};

// route matching logic, taken from preact-router
var exec$1 = function exec(url, route) {
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
  url = segmentize$1(url.replace(reg, ''));
  route = segmentize$1(route || '');
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

var Router$1 = (function (_ref) {
  var routes = _ref.routes;
  return preact.h(
    WithState,
    { mapper: function mapper(_ref2) {
        var currentPath = _ref2.currentPath;
        return { currentPath: currentPath };
      } },
    function (_ref3) {
      var currentPath = _ref3.currentPath,
          store = _ref3.store;

      if (!storeRef$1) storeRef$1 = store;
      for (var route in routes) {
        if (routes[route].hasOwnProperty('routes')) {
          var shouldRender = Object.values(routes[route].routes).some(function (_ref4) {
            var path = _ref4.path;
            return path && exec$1(currentPath, path);
          });
          if (shouldRender) {
            var App = routes[route].component;
            return preact.h(App, null);
          }
        } else {
          var routeArgs = exec$1(currentPath, routes[route].path);
          if (routeArgs) {
            var newRoute = {
              name: route,
              path: routes[route].path,
              args: routeArgs
            };
            if (!equal$2(newRoute, store.getState().currentRoute)) {
              store.setState({ currentRoute: newRoute });
            }
            var Component$$1 = routes[route].component;
            return preact.h(Component$$1, routeArgs);
          }
        }
      }
    }
  );
});

if (typeof window !== 'undefined') {
  document.addEventListener('click', function (ev) {
    if (ev.target.nodeName === 'A' && storeRef$1) {
      if (ev.metaKey) return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      window.scrollTo(0, 0);
      var url = ev.target.getAttribute('href');
      var currentPath = storeRef$1.getState().currentPath;
      if (currentPath !== url) {
        window.history['pushState'](null, null, url);
        storeRef$1.setState({ currentPath: url });
      }
    }
  });
}

function ExampleModal() {
  return preact.h(
    Modal,
    null,
    preact.h(
      'h1',
      null,
      'Example Modal'
    )
  );
}

var Level = function Level(_ref) {
  var children = _ref.children,
      props = objectWithoutProperties(_ref, ['children']);
  return preact.h(
    'div',
    props,
    preact.h(
      'div',
      { className: 'level' },
      children
    )
  );
};

var Carousel = function (_React$Component) {
  inherits(Carousel, _React$Component);

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
    value: function render$$1() {
      var _this4 = this;

      var _props = this.props,
          children = _props.children,
          _props$className = _props.className,
          className = _props$className === undefined ? 'carousel-slide' : _props$className,
          _props$noNav = _props.noNav,
          noNav = _props$noNav === undefined ? false : _props$noNav,
          _props$withDots = _props.withDots,
          withDots = _props$withDots === undefined ? false : _props$withDots,
          _props$wrapperClass = _props.wrapperClass,
          wrapperClass = _props$wrapperClass === undefined ? '' : _props$wrapperClass;
      var active = this.state.active;


      return preact.h(
        'div',
        { className: 'carousel ' + wrapperClass },
        preact.h(
          'div',
          null,
          preact.h(
            'div',
            { className: 'carousel-inner' },
            !noNav && preact.h(
              'nav',
              { className: 'nav prev' },
              preact.h('button', { onClick: this.prev })
            ),
            preact.h(
              'div',
              { className: 'slides-wrapper' },
              preact.h(
                'div',
                { className: 'slides', style: this.getSlidesStyle() },
                W.map(function (c, idx) {
                  return preact.h(
                    'div',
                    {
                      ref: function ref(_ref) {
                        return idx === 0 && _this4.getRef(_ref);
                      },
                      style: _this4.getStyle(idx, active),
                      'class': '' + className + (idx === active ? ' active' : '')
                    },
                    c
                  );
                }, children)
              )
            ),
            !noNav && preact.h(
              'nav',
              { className: 'nav next' },
              preact.h('button', { onClick: this.next })
            )
          ),
          withDots && preact.h(
            Level,
            { className: 'carousel-dots' },
            W.map(function (i) {
              return preact.h(
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
}(preact.Component);

/**
 * Virtual DOM Node
 * @typedef VNode
 * @property {string | function} nodeName The string of the DOM node to create or Component constructor to render
 * @property {Array<VNode | string>} children The children of node
 * @property {string | number | undefined} key The key used to identify this VNode in a list
 * @property {object} attributes The properties of this VNode
 */
const VNode$1 = function VNode() {};

/**
 * @typedef {import('./component').Component} Component
 * @typedef {import('./vnode').VNode} VNode
 */

/**
 * Global options
 * @public
 * @typedef Options
 * @property {boolean} [syncComponentUpdates] If `true`, `prop` changes trigger synchronous component updates. Defaults to true.
 * @property {(vnode: VNode) => void} [vnode] Processes all created VNodes.
 * @property {(component: Component) => void} [afterMount] Hook invoked after a component is mounted.
 * @property {(component: Component) => void} [afterUpdate] Hook invoked after the DOM is updated with a component's latest render.
 * @property {(component: Component) => void} [beforeUnmount] Hook invoked immediately before a component is unmounted.
 * @property {(rerender: function) => void} [debounceRendering] Hook invoked whenever a rerender is requested. Can be used to debounce rerenders.
 * @property {(event: Event) => Event | void} [event] Hook invoked before any Preact event listeners. The return value (if any) replaces the native browser event given to event listeners
 */

/** @type {Options}  */
const options$1 = {};

const stack$1 = [];

const EMPTY_CHILDREN$1 = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility
 * reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a
 * lightweight representation of the structure of a DOM tree. This structure can
 * be realized by recursively comparing it against the current _actual_ DOM
 * structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string | function} nodeName An element name. Ex: `div`, `a`, `span`, etc.
 * @param {object | null} attributes Any attributes/props to set on the created element.
 * @param {VNode[]} [rest] Additional arguments are taken to be children to
 *  append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h$2(nodeName, attributes) {
	let children=EMPTY_CHILDREN$1, lastSimple, child, simple, i;
	for (i=arguments.length; i-- > 2; ) {
		stack$1.push(arguments[i]);
	}
	if (attributes && attributes.children!=null) {
		if (!stack$1.length) stack$1.push(attributes.children);
		delete attributes.children;
	}
	while (stack$1.length) {
		if ((child = stack$1.pop()) && child.pop!==undefined) {
			for (i=child.length; i--; ) stack$1.push(child[i]);
		}
		else {
			if (typeof child==='boolean') child = null;

			if ((simple = typeof nodeName!=='function')) {
				if (child==null) child = '';
				else if (typeof child==='number') child = String(child);
				else if (typeof child!=='string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length-1] += child;
			}
			else if (children===EMPTY_CHILDREN$1) {
				children = [child];
			}
			else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	let p = new VNode$1();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes==null ? undefined : attributes;
	p.key = attributes==null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options$1.vnode!==undefined) options$1.vnode(p);

	return p;
}

/**
 * Copy all properties from `props` onto `obj`.
 * @param {object} obj Object onto which properties should be copied.
 * @param {object} props Object from which to copy properties.
 * @returns {object}
 * @private
 */
function extend$1(obj, props) {
	for (let i in props) obj[i] = props[i];
	return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 * @type {(callback: function) => void}
 */
const defer$1 = typeof Promise=='function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its
 * children.
 * @param {import('./vnode').VNode} vnode The virtual DOM element to clone
 * @param {object} props Attributes/props to add when cloning
 * @param {Array<import('./vnode').VNode>} [rest] Any additional arguments will be used as replacement
 *  children.
 */
function cloneElement$1(vnode, props) {
	return h$2(
		vnode.nodeName,
		extend$1(extend$1({}, vnode.attributes), props),
		arguments.length>2 ? [].slice.call(arguments, 2) : vnode.children
	);
}

// render modes

/** Do not re-render a component */
const NO_RENDER = 0;
/** Synchronously re-render a component and its children */
const SYNC_RENDER = 1;
/** Synchronously re-render a component, even if its lifecycle methods attempt to prevent it. */
const FORCE_RENDER = 2;
/** Queue asynchronous re-render of a component and it's children */
const ASYNC_RENDER = 3;


const ATTR_KEY = '__preactattr_';

/** DOM properties that should NOT have "px" added when numeric */
const IS_NON_DIMENSIONAL$1 = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/**
 * Managed queue of dirty components to be re-rendered
 * @type {Array<import('./component').Component>}
 */
let items$1 = [];

/**
 * Enqueue a rerender of a component
 * @param {import('./component').Component} component The component to rerender
 */
function enqueueRender$1(component) {
	if (!component._dirty && (component._dirty = true) && items$1.push(component)==1) {
		(options$1.debounceRendering || defer$1)(rerender$1);
	}
}

/** Rerender all enqueued dirty components */
function rerender$1() {
	let p, list = items$1;
	items$1 = [];
	while ( (p = list.pop()) ) {
		if (p._dirty) renderComponent$1(p);
	}
}

/**
 * Check if two nodes are equivalent.
 * @param {import('../dom').PreactElement} node DOM Node to compare
 * @param {import('../vnode').VNode} vnode Virtual DOM node to compare
 * @param {boolean} [hydrating=false] If true, ignores component constructors
 *  when comparing.
 * @private
 */
function isSameNodeType$1(node, vnode, hydrating) {
	if (typeof vnode==='string' || typeof vnode==='number') {
		return node.splitText!==undefined;
	}
	if (typeof vnode.nodeName==='string') {
		return !node._componentConstructor && isNamedNode$1(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor===vnode.nodeName;
}


/**
 * Check if an Element has a given nodeName, case-insensitively.
 * @param {import('../dom').PreactElement} node A DOM Element to inspect the name of.
 * @param {string} nodeName Unnormalized name to compare against.
 */
function isNamedNode$1(node, nodeName) {
	return node.normalizedNodeName===nodeName || node.nodeName.toLowerCase()===nodeName.toLowerCase();
}


/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {import('../vnode').VNode} vnode The VNode to get props for
 * @returns {object} The props to use for this VNode
 */
function getNodeProps$1(vnode) {
	let props = extend$1({}, vnode.attributes);
	props.children = vnode.children;

	let defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps!==undefined) {
		for (let i in defaultProps) {
			if (props[i]===undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/**
 * A DOM event listener
 * @typedef {(e: Event) => void} EventListner
 */

/**
 * A mapping of event types to event listeners
 * @typedef {Object.<string, EventListener>} EventListenerMap
 */

/**
 * Properties Preact adds to elements it creates
 * @typedef PreactElementExtensions
 * @property {string} [normalizedNodeName] A normalized node name to use in diffing
 * @property {EventListenerMap} [_listeners] A map of event listeners added by components to this DOM node
 * @property {import('../component').Component} [_component] The component that rendered this DOM node
 * @property {function} [_componentConstructor] The constructor of the component that rendered this DOM node
 */

/**
 * A DOM element that has been extended with Preact properties
 * @typedef {Element & ElementCSSInlineStyle & PreactElementExtensions} PreactElement
 */

/**
 * Create an element with the given nodeName.
 * @param {string} nodeName The DOM node to create
 * @param {boolean} [isSvg=false] If `true`, creates an element within the SVG
 *  namespace.
 * @returns {PreactElement} The created DOM node
 */
function createNode$1(nodeName, isSvg) {
	/** @type {PreactElement} */
	let node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}


/**
 * Remove a child node from its parent if attached.
 * @param {Node} node The node to remove
 */
function removeNode$1(node) {
	let parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}


/**
 * Set a named attribute on the given Node, with special behavior for some names
 * and event handlers. If `value` is `null`, the attribute/handler will be
 * removed.
 * @param {PreactElement} node An element to mutate
 * @param {string} name The name/key to set, such as an event or attribute name
 * @param {*} old The last value that was set for this name/node pair
 * @param {*} value An attribute value, such as a function to be used as an
 *  event handler
 * @param {boolean} isSvg Are we currently diffing inside an svg?
 * @private
 */
function setAccessor$1(node, name, old, value, isSvg) {
	if (name==='className') name = 'class';


	if (name==='key') ;
	else if (name==='ref') {
		if (old) old(null);
		if (value) value(node);
	}
	else if (name==='class' && !isSvg) {
		node.className = value || '';
	}
	else if (name==='style') {
		if (!value || typeof value==='string' || typeof old==='string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value==='object') {
			if (typeof old!=='string') {
				for (let i in old) if (!(i in value)) node.style[i] = '';
			}
			for (let i in value) {
				node.style[i] = typeof value[i]==='number' && IS_NON_DIMENSIONAL$1.test(i)===false ? (value[i]+'px') : value[i];
			}
		}
	}
	else if (name==='dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	}
	else if (name[0]=='o' && name[1]=='n') {
		let useCapture = name !== (name=name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy$1, useCapture);
		}
		else {
			node.removeEventListener(name, eventProxy$1, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	}
	else if (name!=='list' && name!=='type' && !isSvg && name in node) {
		// Attempt to set a DOM property to the given value.
		// IE & FF throw for certain property-value combinations.
		try {
			node[name] = value==null ? '' : value;
		} catch (e) { }
		if ((value==null || value===false) && name!='spellcheck') node.removeAttribute(name);
	}
	else {
		let ns = isSvg && (name !== (name = name.replace(/^xlink:?/, '')));
		// spellcheck is treated differently than all other boolean values and
		// should not be removed when the value is `false`. See:
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-spellcheck
		if (value==null || value===false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());
			else node.removeAttribute(name);
		}
		else if (typeof value!=='function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);
			else node.setAttribute(name, value);
		}
	}
}


/**
 * Proxy an event to hooked event handlers
 * @param {Event} e The event object from the browser
 * @private
 */
function eventProxy$1(e) {
	return this._listeners[e.type](e);
}

/**
 * Queue of components that have been mounted and are awaiting componentDidMount
 * @type {Array<import('../component').Component>}
 */
const mounts$1 = [];

/** Diff recursion count, used to track the end of the diff cycle. */
let diffLevel$1 = 0;

/** Global flag indicating if the diff is currently within an SVG */
let isSvgMode$1 = false;

/** Global flag indicating if the diff is performing hydration */
let hydrating$1 = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts$1() {
	let c;
	while ((c=mounts$1.pop())) {
		if (c.componentDidMount) c.componentDidMount();
	}
}


/**
 * Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 * @param {import('../dom').PreactElement} dom A DOM node to mutate into the shape of a `vnode`
 * @param {import('../vnode').VNode} vnode A VNode (with descendants forming a tree) representing
 *  the desired DOM structure
 * @param {object} context The current context
 * @param {boolean} mountAll Whether or not to immediately mount all components
 * @param {Element} parent ?
 * @param {boolean} componentRoot ?
 * @returns {import('../dom').PreactElement} The created/mutated element
 * @private
 */
function diff$1(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel$1++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode$1 = parent!=null && parent.ownerSVGElement!==undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating$1 = dom!=null && !(ATTR_KEY in dom);
	}

	let ret = idiff$1(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode!==parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (!--diffLevel$1) {
		hydrating$1 = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts$1();
	}

	return ret;
}


/**
 * Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing.
 * @param {import('../dom').PreactElement} dom A DOM node to mutate into the shape of a `vnode`
 * @param {import('../vnode').VNode} vnode A VNode (with descendants forming a tree) representing the desired DOM structure
 * @param {object} context The current context
 * @param {boolean} mountAll Whether or not to immediately mount all components
 * @param {boolean} [componentRoot] ?
 * @private
 */
function idiff$1(dom, vnode, context, mountAll, componentRoot) {
	let out = dom,
		prevSvgMode = isSvgMode$1;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode==null || typeof vnode==='boolean') vnode = '';


	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode==='string' || typeof vnode==='number') {

		// update if it's already a Text node:
		if (dom && dom.splitText!==undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue!=vnode) {
				dom.nodeValue = vnode;
			}
		}
		else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree$1(dom, true);
			}
		}

		out[ATTR_KEY] = true;

		return out;
	}


	// If the VNode represents a Component, perform a component diff:
	let vnodeName = vnode.nodeName;
	if (typeof vnodeName==='function') {
		return buildComponentFromVNode$1(dom, vnode, context, mountAll);
	}


	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode$1 = vnodeName==='svg' ? true : vnodeName==='foreignObject' ? false : isSvgMode$1;


	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode$1(dom, vnodeName)) {
		out = createNode$1(vnodeName, isSvgMode$1);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) out.appendChild(dom.firstChild);

			// if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree$1(dom, true);
		}
	}


	let fc = out.firstChild,
		props = out[ATTR_KEY],
		vchildren = vnode.children;

	if (props==null) {
		props = out[ATTR_KEY] = {};
		for (let a=out.attributes, i=a.length; i--; ) props[a[i].name] = a[i].value;
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating$1 && vchildren && vchildren.length===1 && typeof vchildren[0]==='string' && fc!=null && fc.splitText!==undefined && fc.nextSibling==null) {
		if (fc.nodeValue!=vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc!=null) {
		innerDiffNode$1(out, vchildren, context, mountAll, hydrating$1 || props.dangerouslySetInnerHTML!=null);
	}


	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes$1(out, vnode.attributes, props);


	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode$1 = prevSvgMode;

	return out;
}


/**
 * Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 * @param {import('../dom').PreactElement} dom Element whose children should be compared & mutated
 * @param {Array<import('../vnode').VNode>} vchildren Array of VNodes to compare to `dom.childNodes`
 * @param {object} context Implicitly descendant context object (from most
 *  recent `getChildContext()`)
 * @param {boolean} mountAll Whether or not to immediately mount all components
 * @param {boolean} isHydrating if `true`, consumes externally created elements
 *  similar to hydration
 */
function innerDiffNode$1(dom, vchildren, context, mountAll, isHydrating) {
	let originalChildren = dom.childNodes,
		children = [],
		keyed = {},
		keyedLen = 0,
		min = 0,
		len = originalChildren.length,
		childrenLen = 0,
		vlen = vchildren ? vchildren.length : 0,
		j, c, f, vchild, child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len!==0) {
		for (let i=0; i<len; i++) {
			let child = originalChildren[i],
				props = child[ATTR_KEY],
				key = vlen && props ? child._component ? child._component.__key : props.key : null;
			if (key!=null) {
				keyedLen++;
				keyed[key] = child;
			}
			else if (props || (child.splitText!==undefined ? (isHydrating ? child.nodeValue.trim() : true) : isHydrating)) {
				children[childrenLen++] = child;
			}
		}
	}

	if (vlen!==0) {
		for (let i=0; i<vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			let key = vchild.key;
			if (key!=null) {
				if (keyedLen && keyed[key]!==undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (min<childrenLen) {
				for (j=min; j<childrenLen; j++) {
					if (children[j]!==undefined && isSameNodeType$1(c = children[j], vchild, isHydrating)) {
						child = c;
						children[j] = undefined;
						if (j===childrenLen-1) childrenLen--;
						if (j===min) min++;
						break;
					}
				}
			}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff$1(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child!==dom && child!==f) {
				if (f==null) {
					dom.appendChild(child);
				}
				else if (child===f.nextSibling) {
					removeNode$1(f);
				}
				else {
					dom.insertBefore(child, f);
				}
			}
		}
	}


	// remove unused keyed children:
	if (keyedLen) {
		for (let i in keyed) if (keyed[i]!==undefined) recollectNodeTree$1(keyed[i], false);
	}

	// remove orphaned unkeyed children:
	while (min<=childrenLen) {
		if ((child = children[childrenLen--])!==undefined) recollectNodeTree$1(child, false);
	}
}



/**
 * Recursively recycle (or just unmount) a node and its descendants.
 * @param {import('../dom').PreactElement} node DOM node to start
 *  unmount/removal from
 * @param {boolean} [unmountOnly=false] If `true`, only triggers unmount
 *  lifecycle, skips removal
 */
function recollectNodeTree$1(node, unmountOnly) {
	let component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent$1(component);
	}
	else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node[ATTR_KEY]!=null && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);

		if (unmountOnly===false || node[ATTR_KEY]==null) {
			removeNode$1(node);
		}

		removeChildren$1(node);
	}
}


/**
 * Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren$1(node) {
	node = node.lastChild;
	while (node) {
		let next = node.previousSibling;
		recollectNodeTree$1(node, true);
		node = next;
	}
}


/**
 * Apply differences in attributes from a VNode to the given DOM Element.
 * @param {import('../dom').PreactElement} dom Element with attributes to diff `attrs` against
 * @param {object} attrs The desired end-state key-value attribute pairs
 * @param {object} old Current/previous attributes (from previous VNode or
 *  element's prop cache)
 */
function diffAttributes$1(dom, attrs, old) {
	let name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name]!=null) && old[name]!=null) {
			setAccessor$1(dom, name, old[name], old[name] = undefined, isSvgMode$1);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name!=='children' && name!=='innerHTML' && (!(name in old) || attrs[name]!==(name==='value' || name==='checked' ? dom[name] : old[name]))) {
			setAccessor$1(dom, name, old[name], old[name] = attrs[name], isSvgMode$1);
		}
	}
}

/**
 * Retains a pool of Components for re-use.
 * @type {Component[]}
 * @private
 */
const recyclerComponents$1 = [];


/**
 * Create a component. Normalizes differences between PFC's and classful
 * Components.
 * @param {function} Ctor The constructor of the component to create
 * @param {object} props The initial props of the component
 * @param {object} context The initial context of the component
 * @returns {import('../component').Component}
 */
function createComponent$1(Ctor, props, context) {
	let inst, i = recyclerComponents$1.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component$1.call(inst, props, context);
	}
	else {
		inst = new Component$1(props, context);
		inst.constructor = Ctor;
		inst.render = doRender$1;
	}


	while (i--) {
		if (recyclerComponents$1[i].constructor===Ctor) {
			inst.nextBase = recyclerComponents$1[i].nextBase;
			recyclerComponents$1.splice(i, 1);
			return inst;
		}
	}

	return inst;
}


/** The `.render()` method for a PFC backing instance. */
function doRender$1(props, state, context) {
	return this.constructor(props, context);
}

/**
 * Set a component's `props` and possibly re-render the component
 * @param {import('../component').Component} component The Component to set props on
 * @param {object} props The new props
 * @param {number} renderMode Render options - specifies how to re-render the component
 * @param {object} context The new context
 * @param {boolean} mountAll Whether or not to immediately mount all components
 */
function setComponentProps$1(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		}
		else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context!==component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode!==NO_RENDER) {
		if (renderMode===SYNC_RENDER || options$1.syncComponentUpdates!==false || !component.base) {
			renderComponent$1(component, SYNC_RENDER, mountAll);
		}
		else {
			enqueueRender$1(component);
		}
	}

	if (component.__ref) component.__ref(component);
}



/**
 * Render a Component, triggering necessary lifecycle events and taking
 * High-Order Components into account.
 * @param {import('../component').Component} component The component to render
 * @param {number} [renderMode] render mode, see constants.js for available options.
 * @param {boolean} [mountAll] Whether or not to immediately mount all components
 * @param {boolean} [isChild] ?
 * @private
 */
function renderComponent$1(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	let props = component.props,
		state = component.state,
		context = component.context,
		previousProps = component.prevProps || props,
		previousState = component.prevState || state,
		previousContext = component.prevContext || context,
		isUpdate = component.base,
		nextBase = component.nextBase,
		initialBase = isUpdate || nextBase,
		initialChildComponent = component._component,
		skip = false,
		snapshot = previousContext,
		rendered, inst, cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend$1(extend$1({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode!==FORCE_RENDER
			&& component.shouldComponentUpdate
			&& component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		}
		else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend$1(extend$1({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		let childComponent = rendered && rendered.nodeName,
			toUnmount, base;

		if (typeof childComponent==='function') {
			// set up high order component link

			let childProps = getNodeProps$1(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor===childComponent && childProps.key==inst.__key) {
				setComponentProps$1(inst, childProps, SYNC_RENDER, context, false);
			}
			else {
				toUnmount = inst;

				component._component = inst = createComponent$1(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps$1(inst, childProps, NO_RENDER, context, false);
				renderComponent$1(inst, SYNC_RENDER, mountAll, true);
			}

			base = inst.base;
		}
		else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode===SYNC_RENDER) {
				if (cbase) cbase._component = null;
				base = diff$1(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base!==initialBase && inst!==initialChildComponent) {
			let baseParent = initialBase.parentNode;
			if (baseParent && base!==baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree$1(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent$1(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			let componentRef = component,
				t = component;
			while ((t=t._parentComponent)) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts$1.unshift(component);
	}
	else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
	}

	while (component._renderCallbacks.length) component._renderCallbacks.pop().call(component);

	if (!diffLevel$1 && !isChild) flushMounts$1();
}



/**
 * Apply the Component referenced by a VNode to the DOM.
 * @param {import('../dom').PreactElement} dom The DOM node to mutate
 * @param {import('../vnode').VNode} vnode A Component-referencing VNode
 * @param {object} context The current context
 * @param {boolean} mountAll Whether or not to immediately mount all components
 * @returns {import('../dom').PreactElement} The created/mutated element
 * @private
 */
function buildComponentFromVNode$1(dom, vnode, context, mountAll) {
	let c = dom && dom._component,
		originalComponent = c,
		oldDom = dom,
		isDirectOwner = c && dom._componentConstructor===vnode.nodeName,
		isOwner = isDirectOwner,
		props = getNodeProps$1(vnode);
	while (c && !isOwner && (c=c._parentComponent)) {
		isOwner = c.constructor===vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps$1(c, props, ASYNC_RENDER, context, mountAll);
		dom = c.base;
	}
	else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent$1(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent$1(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps$1(c, props, SYNC_RENDER, context, mountAll);
		dom = c.base;

		if (oldDom && dom!==oldDom) {
			oldDom._component = null;
			recollectNodeTree$1(oldDom, false);
		}
	}

	return dom;
}



/**
 * Remove a component from the DOM and recycle it.
 * @param {import('../component').Component} component The Component instance to unmount
 * @private
 */
function unmountComponent$1(component) {

	let base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	let inner = component._component;
	if (inner) {
		unmountComponent$1(inner);
	}
	else if (base) {
		if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);

		component.nextBase = base;

		removeNode$1(base);
		recyclerComponents$1.push(component);

		removeChildren$1(base);
	}

	if (component.__ref) component.__ref(null);
}

/**
 * Base Component class.
 * Provides `setState()` and `forceUpdate()`, which trigger rendering.
 * @typedef {object} Component
 * @param {object} props The initial component props
 * @param {object} context The initial context from parent components' getChildContext
 * @public
 *
 * @example
 * class MyFoo extends Component {
 *   render(props, state) {
 *     return <div />;
 *   }
 * }
 */
function Component$1(props, context) {
	this._dirty = true;

	/**
	 * @public
	 * @type {object}
	 */
	this.context = context;

	/**
	 * @public
	 * @type {object}
	 */
	this.props = props;

	/**
	 * @public
	 * @type {object}
	 */
	this.state = this.state || {};

	this._renderCallbacks = [];
}


extend$1(Component$1.prototype, {

	/**
	 * Update component state and schedule a re-render.
	 * @param {object} state A dict of state properties to be shallowly merged
	 * 	into the current state, or a function that will produce such a dict. The
	 * 	function is called with the current state and props.
	 * @param {() => void} callback A function to be called once component state is
	 * 	updated
	 */
	setState(state, callback) {
		if (!this.prevState) this.prevState = this.state;
		this.state = extend$1(
			extend$1({}, this.state),
			typeof state === 'function' ? state(this.state, this.props) : state
		);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender$1(this);
	},


	/**
	 * Immediately perform a synchronous re-render of the component.
	 * @param {() => void} callback A function to be called after component is
	 * 	re-rendered.
	 * @private
	 */
	forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent$1(this, FORCE_RENDER);
	},


	/**
	 * Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
	 * Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
	 * @param {object} props Props (eg: JSX attributes) received from parent
	 * 	element/component
	 * @param {object} state The component's current state
	 * @param {object} context Context object, as returned by the nearest
	 *  ancestor's `getChildContext()`
	 * @returns {import('./vnode').VNode | void}
	 */
	render() {}

});

/**
 * Render JSX into a `parent` Element.
 * @param {import('./vnode').VNode} vnode A (JSX) VNode to render
 * @param {import('./dom').PreactElement} parent DOM element to render into
 * @param {import('./dom').PreactElement} [merge] Attempt to re-use an existing DOM tree rooted at
 *  `merge`
 * @public
 *
 * @example
 * // render a div into <body>:
 * render(<div id="hello">hello!</div>, document.body);
 *
 * @example
 * // render a "Thing" component into #foo:
 * const Thing = ({ name }) => <span>{ name }</span>;
 * render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render$1(vnode, parent, merge) {
	return diff$1(merge, vnode, {}, false, parent, false);
}

var require$$0$1 = {
	h: h$2,
	createElement: h$2,
	cloneElement: cloneElement$1,
	Component: Component$1,
	render: render$1,
	rerender: rerender$1,
	options: options$1
};

var react = createCommonjsModule(function (module, exports) {
var t=require$$0$1;function r(t,r){for(var n in r)t[n]=r[n];return t}var n={store:function(){}};var o=function(r){function n(){r.apply(this,arguments);}return r&&(n.__proto__=r),(n.prototype=Object.create(r&&r.prototype)).constructor=n,n.prototype.getChildContext=function(){return {store:this.props.store}},n.prototype.render=function(){return t.Children.only(this.props.children)},n}(t.Component);o.childContextTypes=n,exports.connect=function(o,e){var i;return "function"!=typeof o&&("string"==typeof(i=o||[])&&(i=i.split(/\s*,\s*/)),o=function(t){for(var r={},n=0;n<i.length;n++)r[i[n]]=t[i[n]];return r}),function(i){function c(n,c){var p=this;t.Component.call(this,n,c);var u=c.store,s=o(u?u.getState():{},n),f=e?function(t,r){"function"==typeof t&&(t=t(r));var n={};for(var o in t)n[o]=r.action(t[o]);return n}(e,u):{store:u},a=function(){var t=o(u?u.getState():{},p.props);for(var r in t)if(t[r]!==s[r])return s=t,p.forceUpdate();for(var n in s)if(!(n in t))return s=t,p.forceUpdate()};this.componentDidMount=function(){u.subscribe(a);},this.componentWillUnmount=function(){u.unsubscribe(a);},this.render=function(){return t.createElement(i,r(r(r({},f),p.props),s))};}return c.contextTypes=n,(c.prototype=Object.create(t.Component.prototype)).constructor=c}},exports.Provider=o;

});
var react_1 = react.connect;
var react_2 = react.Provider;

var storeRef$2 = void 0; // Will get populated by `getStoreReference`

var getStoreReference = function getStoreReference(actions) {
  return function (store) {
    storeRef$2 = store;
    return actions;
  };
};

var actions$1 = getStoreReference({
  toggle: function toggle(_ref, uid) {
    var dropdown = _ref.dropdown;

    var isOpen = dropdown === uid;
    return { dropdown: isOpen ? null : uid };
  }
});

var mapper = function mapper(_ref2, _ref3) {
  var dropdown = _ref2.dropdown;
  var uid = _ref3.uid;

  if (!uid) {
    console.warn('<Dropdown> must include a uid prop.');
  }
  return { isOpen: dropdown === uid };
};

var Dropdown = react_1(mapper, actions$1)(function (_ref4) {
  var isOpen = _ref4.isOpen,
      toggle = _ref4.toggle,
      Trigger = _ref4.Trigger,
      uid = _ref4.uid,
      _ref4$buttonText = _ref4.buttonText,
      buttonText = _ref4$buttonText === undefined ? 'Select' : _ref4$buttonText,
      _ref4$noWrapper = _ref4.noWrapper,
      noWrapper = _ref4$noWrapper === undefined ? false : _ref4$noWrapper,
      children = _ref4.children;

  var cls = isOpen ? 'dropdown-menu open' : isOpen === false ? 'dropdown-menu close' : 'dropdown-menu'; // isOpen === null
  return preact.h(
    'div',
    null,
    Trigger === undefined ? preact.h(
      'button',
      { className: 'btn btn-dropdown black-ghost-btn', onClick: function onClick(ev) {
          return toggle(uid);
        } },
      preact.h(
        Level,
        { noPadding: true },
        buttonText
      )
    ) : preact.h(Trigger, { className: 'btn-dropdown', onClick: function onClick(ev) {
        return toggle(uid);
      } }),
    noWrapper ? isOpen && children : preact.h(
      'div',
      { className: cls },
      preact.h('div', { 'class': 'dropdown-arrow' }),
      children
    )
  );
});

// DOM event to close all Dropdown's on off-click
var isDropdown = function isDropdown(el) {
  return el.classList && el.classList.contains('dropdown-menu') || el.classList && el.classList.contains('btn-dropdown');
};

try {
  document.body.addEventListener('click', function (ev) {
    if (!storeRef$2) return;
    var activeDropdown = W.path('dropdown', storeRef$2.getState());
    if (!activeDropdown) {
      return;
    }
    var el = ev.target;
    if (isDropdown(el)) return;
    while (el.parentNode) {
      el = el.parentNode;
      if (isDropdown(el)) return;
    }
    storeRef$2.setState({ dropdown: null });
  });
} catch (_) {}

var isInViewport = function isInViewport(element) {
  if (typeof document === 'undefined') {
    return false;
  }
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return rect.bottom <= (window.innerHeight || html.clientHeight);
};

var imageComponents = [];

if (typeof document !== 'undefined') {
  document.addEventListener('scroll', function () {
    if (!imageComponents.length) return;
    imageComponents.forEach(function (i) {
      if (isInViewport(i.base)) {
        i.loadImage();
      }
    });
  }, true);
}

var Image = function (_React$Component) {
  inherits(Image, _React$Component);

  function Image(props) {
    classCallCheck(this, Image);

    var _this = possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.state = {
      loaded: false,
      error: false
    };
    return _this;
  }

  createClass(Image, [{
    key: 'loadImage',
    value: function loadImage() {
      var _this2 = this;

      if (typeof document !== 'undefined') {
        var img = document.createElement('img');
        img.onload = function () {
          _this2.setState({ loaded: true });
          _this2.removeSelf(img);
        };
        img.onerror = function () {
          _this2.setState({ error: true });
          _this2.removeSelf(img);
        };
        img.src = this.props.src;
      }
    }
  }, {
    key: 'removeSelf',
    value: function removeSelf(img) {
      var _this3 = this;

      if (img) {
        img.remove();
      }

      if (imageComponents.includes(this)) {
        imageComponents = W.reject(function (i) {
          return i === _this3;
        }, imageComponents);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      imageComponents.push(this);

      if (isInViewport(this.base)) {
        this.loadImage();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeSelf();
    }
  }, {
    key: 'render',
    value: function render$$1() {
      var _props = this.props,
          src = _props.src,
          _props$unloadedSrc = _props.unloadedSrc,
          unloadedSrc = _props$unloadedSrc === undefined ? '/images/blank-poster.gif' : _props$unloadedSrc,
          className = _props.className,
          props = objectWithoutProperties(_props, ['src', 'unloadedSrc', 'className']);
      var _state = this.state,
          error = _state.error,
          loaded = _state.loaded;


      if (error) {
        return preact.h('img', _extends({ src: unloadedSrc, className: className }, props));
      } else if (!loaded) {
        return preact.h('img', _extends({ src: unloadedSrc, className: className + ' image-loading' }, props));
      } else {
        return preact.h('img', _extends({ src: src, className: className + ' image-ready' }, props));
      }
    }
  }]);
  return Image;
}(preact.Component);

function LoadingIndicator(_ref) {
  var _ref$variant = _ref.variant,
      variant = _ref$variant === undefined ? 'flashing' : _ref$variant;

  return preact.h('div', { className: 'dot-' + variant });
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

  return preact.h(
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

var Home = (function () {
  return preact.h(
    'div',
    { style: { padding: '1em' } },
    preact.h(
      'h1',
      null,
      preact.h(
        Tooltip,
        { text: 'This is your tooltip' },
        'Home'
      )
    ),
    preact.h(LoadingIndicator, null),
    preact.h(
      Dropdown,
      { uid: 'home-example' },
      preact.h(
        'p',
        null,
        preact.h(
          'button',
          { onClick: function onClick(ev) {
              return store.setState({ modal: 'ExampleModal' });
            } },
          'Open Example Modal'
        )
      ),
      preact.h(
        'p',
        null,
        preact.h(
          'button',
          { onClick: function onClick(ev) {
              return showNotification({ message: 'PIRATES!' });
            } },
          'Pirates!'
        )
      ),
      preact.h(
        'p',
        null,
        'Classy Penguin'
      )
    ),
    preact.h(
      Carousel,
      { withDots: true },
      W.map(function (hex) {
        return preact.h(Image, {
          src: 'http://www.placehold.it/400x300/' + hex + '/f44?text=' + hex,
          unloadedSrc: 'http://www.placehold.it/400x300/eee/eee?text=Loading',
          style: 'width: 100%'
        });
      }, ['fff', 'a7c', '09d', '411', '111'])
    )
  );
});

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

var pageBuilder = function pageBuilder(page) {
  return updateQuery({ page: page });
};

var Pagination = function (_React$Component) {
  inherits(Pagination, _React$Component);

  function Pagination() {
    classCallCheck(this, Pagination);
    return possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).apply(this, arguments));
  }

  createClass(Pagination, [{
    key: 'render',
    value: function render$$1() {
      var _props = this.props,
          activePage = _props.activePage,
          pageSize = _props.pageSize,
          request = _props.request;
      var count = request.count,
          next = request.next,
          previous = request.previous;

      if (!count || count < pageSize) {
        return;
      }

      var numPages = Math.ceil(count / pageSize);
      var pages = paginationRange(activePage, numPages);

      return preact.h(
        'nav',
        { 'class': 'pagination' },
        previous ? preact.h(
          'a',
          { href: pageBuilder(activePage - 1) },
          preact.h('span', { className: 'arrow back' }),
          ' Back'
        ) : preact.h(
          'span',
          { className: 'disabled' },
          preact.h('span', { className: 'arrow back' }),
          ' Back'
        ),
        preact.h(
          'ul',
          null,
          W.map(function (page, index) {
            return page ? preact.h(
              'li',
              { key: 'page-' + page },
              preact.h(
                'a',
                { href: pageBuilder(page), className: activePage === page ? 'active' : '' },
                page
              )
            ) : preact.h(
              'li',
              { key: 'break-' + index },
              '\u2026'
            );
          }, pages)
        ),
        next ? preact.h(
          'a',
          { href: pageBuilder(activePage + 1) },
          'Next ',
          preact.h('span', { className: 'arrow next' })
        ) : preact.h(
          'span',
          { className: 'disabled' },
          'Next ',
          preact.h('span', { className: 'arrow next' })
        )
      );
    }
  }]);
  return Pagination;
}(preact.Component);

var storage = null;
var apiUrl = 'http://10.0.2.2:8000';

var safelyParse = function safelyParse(json, key) {
  try {
    var parsed = JSON.parse(json);
    // console.log('safelyParse', parsed)
    return key != null ? parsed[key] : parsed;
  } catch (_) {
    return json;
  }
};

var getAuthHeader = function getAuthHeader() {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var token = arguments[1];

  if (token) {
    headers.Authorization = 'Token ' + token;
  }
  return headers;
};

var makeErr = function makeErr(code, msg) {
  var e = new Error(msg);
  e.code = code;
  if (code === 401) {
    storage && storage.removeItem('token');
  }
  console.error('makeErr', { code: code, msg: msg });
  return e;
};

function makeRequest(_ref2) {
  var endpoint = _ref2.endpoint,
      url = _ref2.url,
      _ref2$method = _ref2.method,
      method = _ref2$method === undefined ? 'get' : _ref2$method,
      data = _ref2.data,
      headers = _ref2.headers,
      _ref2$noAuth = _ref2.noAuth,
      noAuth = _ref2$noAuth === undefined ? false : _ref2$noAuth;

  if (endpoint != null && endpoint.indexOf('http') === -1) {
    url = apiUrl + '/' + endpoint;
  }

  if (url == null) {
    url = endpoint;
  }

  var xhr = new window.XMLHttpRequest();
  var promise = new Promise(function (resolve, reject) {
    xhr.open(method.toUpperCase(), url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      xhr.status >= 400 ? reject(makeErr(xhr.status, safelyParse(xhr.response, 'detail'))) : resolve(safelyParse(xhr.response));
    };
    xhr.onerror = function () {
      return reject(xhr);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');

    headers = !noAuth ? getAuthHeader(headers) : {};
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

var cache = function cache(endpoint, result) {
  CACHE[endpoint] = { result: result, timestamp: Date.now() };
};

var validCache = function validCache(endpoint) {
  var ts = CACHE[endpoint] && CACHE[endpoint].timestamp;
  if (!ts) return false;
  var diff = Date.now() - ts;
  return diff < OK_TIME;
};

var WithRequest = function (_React$Component) {
  inherits(WithRequest, _React$Component);

  function WithRequest(props) {
    classCallCheck(this, WithRequest);

    var _this = possibleConstructorReturn(this, (WithRequest.__proto__ || Object.getPrototypeOf(WithRequest)).call(this, props));

    _this.state = _extends({}, _this.state || {}, { isLoading: true, result: null, error: null });
    _this._existing = null;
    return _this;
  }

  createClass(WithRequest, [{
    key: '_performRequest',
    value: function _performRequest(endpoint, parse) {
      var _this2 = this;

      var token = this.context.store.getState().token;
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
        if (_this2.props.mutateResult) {
          _this2.setState({ result: _this2.props.mutateResult(result, _this2.state.result), isLoading: false });
        } else {
          _this2.setState({ result: result, isLoading: false });
        }
      }).catch(function (error) {
        return console.log('_performRequest', { error: error }) || _this2.setState({ error: error, isLoading: false });
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
      } else {
        this._performRequest(endpoint, parse);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadResult(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var nextEnpoint = (nextProps.request || {}).endpoint;
      var currEnpoint = (this.props.request || {}).endpoint;
      if (currEnpoint !== nextEnpoint) {
        return true;
      }
      return !equal$1(nextState, this.state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (!this._existing) return;
      if ((this.props.request || {}).endpoint !== this._existing._endpoint) {
        this._loadResult(this.props);
      }
    }
  }, {
    key: 'render',
    value: function render$$1() {
      var child = this.children ? this.children[0] : this.props.children[0];
      if (!child || typeof child !== 'function') {
        console.log({ child: child });
        throw new Error('WithRequest requires a function as its only child');
      }
      return child(this.state);
    }
  }]);
  return WithRequest;
}(preact.Component);

var OK_TYPES = ['function', 'object'];

// We subscribe to `currentPath` to rerender on route change
var ListResource = react_1('currentPath', {})(function (_ref) {
  var endpoint = _ref.endpoint,
      limit = _ref.limit,
      _ref$list = _ref.list,
      list = _ref$list === undefined ? true : _ref$list,
      _ref$pagination = _ref.pagination,
      pagination = _ref$pagination === undefined ? false : _ref$pagination,
      children = _ref.children;

  var Child = children[0];
  var type = typeof Child === 'undefined' ? 'undefined' : _typeof(Child);
  if (!Child || !OK_TYPES.includes(type)) {
    throw new Error('ListResource requires a function or Component as its only child');
  }
  var func = type === 'function' ? Child : function (props) {
    return preact.h(Child, props);
  };

  // @TODO: Needs to access search params on SSR
  var search = typeof window !== 'undefined' ? window.location.search : '';
  var args = qs.parse(search);
  var activePage = args.page ? parseInt(args.page, 10) : 1;

  var request = {
    endpoint: limit != null ? endpoint + '?limit=' + limit + (activePage > 1 ? '&offset=' + limit * activePage : '') : endpoint
  };
  return preact.h(
    WithRequest,
    { request: request },
    function (_ref2) {
      var result = _ref2.result,
          isLoading = _ref2.isLoading;
      return isLoading ? preact.h(
        'p',
        null,
        'Loading...'
      ) : preact.h(
        'div',
        { key: request.endpoint },
        list ? W.map(func, W.pathOr(result, 'results', result)) : func(_extends({}, result)),
        pagination && limit != null ? preact.h(Pagination, { activePage: activePage, request: result, pageSize: limit }) : null
      );
    }
  );
});

var Resource = function Resource(_ref3) {
  var endpoint = _ref3.endpoint,
      props = objectWithoutProperties(_ref3, ['endpoint']);
  return preact.h(ListResource, _extends({ key: 'resource-' + endpoint, list: false, endpoint: endpoint }, props));
};

var endpoint = 'https://input-qee-prod.herokuapp.com/videos';

var Videos = (function () {
  return preact.h(
    ListResource,
    { endpoint: endpoint, limit: 5, pagination: true },
    function (_ref) {
      var title = _ref.title;
      return preact.h(
        'div',
        null,
        preact.h(
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
    component: Home
  },
  videos: {
    path: '/videos',
    component: Videos
  }
};

var Main = (function () {
  return preact.h(
    'div',
    null,
    preact.h(Router$1, { routes: routes }),
    preact.h(
      Modals,
      null,
      preact.h(ExampleModal, null)
    )
  );
});

var endpoint$1 = 'https://jsonplaceholder.typicode.com/users';

var Users = (function () {
  return preact.h(
    ListResource,
    { endpoint: endpoint$1 },
    function (_ref) {
      var id = _ref.id,
          name = _ref.name,
          email = _ref.email;
      return preact.h(
        'div',
        null,
        preact.h(
          'h2',
          null,
          preact.h(
            'a',
            { href: '/users/' + id },
            name
          )
        ),
        preact.h(
          'p',
          null,
          email
        )
      );
    }
  );
});

var DEBUG = typeof window !== 'undefined' ? window.location.hostname.indexOf('local') > -1 : "development";

var WEB_URL = function () {
  if (typeof window === 'undefined') {
    return 'https://cool-app.com';
  }
  return window.location.href.replace(window.location.pathname, '');
}();

var url = 'https://jsonplaceholder.typicode.com/users/';

var User = (function (_ref) {
  var id = _ref.id;
  return preact.h(
    'div',
    { key: 'user' },
    preact.h(
      Resource,
      { endpoint: '' + url + id },
      function (_ref2) {
        var name = _ref2.name,
            email = _ref2.email;
        return preact.h(
          'div',
          null,
          preact.h(Helmet, {
            title: name,
            meta: [{ name: 'description', content: 'Helmet description' }, { property: 'og:type', content: 'article' }, { property: 'og:title', content: name }, { property: 'og:description', content: 'Helmet description' }, { property: 'og:image', content: 'https://www.gooseinsurance.com/images/blog-image-1.jpg' }, { property: 'og:url', content: '' + WEB_URL + urlFor('user', { args: { id: id } }) }]
          }),
          preact.h(
            'h1',
            null,
            name
          ),
          preact.h(
            'p',
            null,
            email
          ),
          preact.h(
            'p',
            null,
            preact.h(
              'a',
              { href: '/users' },
              '\u2190 Back to all Users'
            )
          )
        );
      }
    ),
    preact.h(
      'a',
      { href: '/users/' + (parseInt(id, 10) + 1) },
      'Next'
    )
  );
});

var isReactNative = typeof window !== 'undefined' && window.navigator.product === 'ReactNative';

// children can be an array or object in React,
// but always array in Preact.
var compatMap = preact.Children ? preact.Children.map : function (ls, fn) {
  return Array.prototype.map.call(ls, fn);
};

// React method to skip textNodes, and Preact fallback.
var compatIsValid = preact.isValidElement ? preact.isValidElement : function (child) {
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
          child = preact.cloneElement(child, { formName: formName, onPress: function onPress() {
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
          child = preact.cloneElement(child, newProps);
          // Store a reference to our fields, so we can validate them on submit
          _this2._fields[childProps.name] = child;
        } else if (child.children || child.props.children) {
          // Recursively search children for more form fields
          child = preact.cloneElement(child, {
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
      return isReactNative ? children : preact.h(
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
}(preact.Component);

var TextInput = function TextInput(_ref) {
  var props = objectWithoutProperties(_ref, []);
  return preact.h('input', _extends({ type: 'text' }, props));
};

var Login = (function () {
  return preact.h(
    Form,
    { name: 'Login', onSubmit: function onSubmit(form) {
        return console.log('form', form);
      } },
    'cool',
    preact.h(TextInput, { required: true, name: 'email', placeholder: 'Your Email' }),
    preact.h(TextInput, { required: true, type: 'password', name: 'password', placeholder: 'Your Password' }),
    preact.h(
      'button',
      { type: 'submit' },
      'Login'
    )
  );
});

var routes$1 = {
  users: {
    path: '/users',
    component: Users
  },
  user: {
    path: '/users/:id',
    component: User
  },
  login: {
    path: '/login',
    component: Login
  }
};

var AccountHeader = function AccountHeader() {
  return preact.h(
    'header',
    { className: 'alt' },
    preact.h(
      'a',
      { href: urlFor('users') },
      'Users'
    ),
    '\xA0',
    preact.h(
      'a',
      { href: urlFor('login') },
      'Login'
    )
  );
};

var Account = (function () {
  return preact.h(
    'div',
    { id: 'account-layout' },
    preact.h(AccountHeader, null),
    preact.h(Router$1, { routes: routes$1 })
  );
});

// `<Router />`'s accept two object formats. The first, which we'll cover now, is for

// These app routes need to be defined here (outside of a Component's render function)
// so that our [urlFor](/util/urlFor.html) function works without mounting any React
// Components. These also get passed into a `<Router />` inside the [MainApp](/index.html)
// Component and only render if a path within their `routes` object is currently matched.
var routes$2 = {
  main: {
    routes: routes,
    component: Main
  },
  account: {
    routes: routes$1,
    component: Account
  }

  // The `routes` props for the `main` and `account` objects above, follow the second object
  // format that our `<Router />`'s understand. Which follows the follwing signature:

  // ```
  // export const mainRoutes = {
  //   routeName: {
  //     path: '/',
  //     component: Home
  //   }
  // }
  // ```

};

// Transform our `Component => Object` pairs to a single Object.
// The `urlFor` function below will reference it to return a URL string
// for a given name.

var getAllRoutes = function getAllRoutes(routes) {
  return Object.keys(routes || {}).reduce(function (acc, r) {
    return routes[r].hasOwnProperty('routes') ? _extends({}, acc, getAllRoutes(routes[r].routes)) : _extends({}, acc, defineProperty({}, r, routes[r]));
  }, {});
};

var allRoutes = getAllRoutes(routes$2);

// Get the path string for the route with name `name`
// Best understood with an example:

// ```
// const routes = {
//   myRoute: '/some/:fancy/:route'
// }
// urlFor('myRoute', {
//   args: {fancy: 12, route: 'r2d2'},
//   queries: {search: 'hi'}
// })
// > '/some/12/r2d2?search=hi'
// ```

var urlFor = function urlFor(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$args = _ref.args,
      args = _ref$args === undefined ? {} : _ref$args,
      _ref$queries = _ref.queries,
      queries = _ref$queries === undefined ? {} : _ref$queries;

  var rule = allRoutes[name];
  if (!rule) {
    console.warn('No route found for name: ' + name);
    return;
  }
  var replaced = Object.keys(args).reduce(function (acc, k) {
    return acc.replace(':' + k, args[k]);
  }, rule.path);
  var hasQueries = Object.keys(queries).length > 0;
  return '' + replaced + (!hasQueries ? '' : '?' + qs.stringify(queries));
};

var actions$2 = function actions(store) {
  return {
    increment: function increment(_ref) {
      var clicks = _ref.clicks;
      return { clicks: clicks + 1 };
    }
  };
};

var Header = preact_1('clicks', actions$2)(function (_ref2) {
  var clicks = _ref2.clicks,
      increment = _ref2.increment;
  return preact.h(
    'header',
    { 'class': 'layout-center' },
    preact.h(
      'h1',
      null,
      'PWA ',
      clicks
    ),
    preact.h(
      'button',
      { onClick: increment },
      '+'
    ),
    preact.h(
      'a',
      { href: urlFor('home') },
      'Main App'
    ),
    '\xA0',
    preact.h(
      'a',
      { href: urlFor('users') },
      'Account App'
    ),
    '\xA0'
  );
});

var Base = function Base() {
  return preact.h(
    'div',
    null,
    'Not Found :('
  );
};

var NotFound = preact_1('currentRoute', {})(function (_ref) {
  var currentRoute = _ref.currentRoute;
  return !currentRoute ? Base() : null;
});

var initialState = _extends({
  // In the browser, we initialize the currentPath prop, which is used
  // by our [Router](/hoc/Router.html)
  currentPath: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/',
  // `pendingRequests` is used by the [WithRequest](/hoc/WithRequest.html) HoC.
  pendingRequests: 0
}, typeof window !== 'undefined' ? JSON.parse(window.__initial_store__ || '') : {});

// Replacing our custom store with Redux-compatible `unistore`
var store = createStore(initialState);

// And, finally, our MainApp! This is the top-level Component to render
// into the DOM, and kick-start our app!
var MainApp = function MainApp() {
  return preact.h(
    preact_2,
    { store: store },
    preact.h(
      'div',
      { className: 'main-app-container' },
      preact.h(Helmet, {
        title: 'Welcome',
        titleTemplate: 'PWA Starter | %s',
        defaultTitle: 'Welcome'
      }),
      preact.h(Header, null),
      preact.h(Notification, null),
      preact.h(Router, { routes: routes$2 }),
      preact.h(NotFound, null)
    )
  );
};

// Only render if we are in the browser, server-side rendering will be
// handled by the `server` (which is not covered here).
if (typeof window !== 'undefined') {
  preact.render(preact.h(MainApp, null), document.body, document.body.children[0]);
}

// Contents
// --------

// **/**

// - [consts.js](/consts.html)
// - [routes.js](/routes.html)
// - [store.js](/store.html)

// **apps/**

// This is where we organize project specific code into logical groupings.
// Each app will need to export a Component and `{routes}` Object.

// **assets/**

// Put any static files you want copied over to the `public/` folder.

// **elements/**

// Elements are reusable Components that render some JSX. These are generic
// and are common to use throughout all apps.

// - [Carousel.js](/elements/Carousel)
// - [Dropdown.js](/elements/Dropdown)
// - [Image.js](/elements/Image)
// - [Level.js](/elements/Level)
// - [LoadingIndicator.js](/elements/LoadingIndicator)
// - [Modal.js](/elements/Modal)
// - [Notification.js](/elements/Notification)
// - [Pagination.js](/elements/Pagination)
// - [Tooltip.js](/elements/Tooltip)
// - [Form.js](/elements/Form)
// - [Header.js](/elements/Header)
// - [NotFound.js](/elements/NotFound)

// **hoc/**

// Higher order Components, which abstract away logic, and generally
// don't render any JSX of their own.

// - [Apps.js](/hoc/Apps)
// - [Helmet.js](/hoc/Helmet)
// - [ListResource.js](/hoc/ListResource)
// - [Resource.js](/hoc/Resource)
// - [Router.js](/hoc/Router)
// - [WithRequest.js](/hoc/WithRequest)
// - [WithState.js](/hoc/WithState)

// **modals/**

// Any global (cross-app) modals can go here. These should all use the
// [Modal](/elements/Modal) element in their `render` method.

// **styles/**

// Global LESS files can go here. They should be manually imported by
// `src/index.js`

// **util/**

// Simple helper functions used throughout your project. These should not
// be removed as they are all used by an included HoC or element.

var setState = store.setState,
    getState = store.getState;


var renderReact = function renderReact(url) {
  return new Promise(function (resolve, reject) {
    setState({ currentPath: url });
    c(preact.h(MainApp, null)); // Render, to register pendingRequests

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
        var html = c(preact.h(MainApp, null));
        var head = c(preact.h(Helmet, rewind())).slice(5, -6);
        resolve({ html: html, head: head, state: state });
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
  maxAge: 0, // 1Y
  immutable: false
});

var ssr = function ssr(req, res, next) {
  console.log('ssr', req.url);
  renderReact(req.url).then(function (_ref) {
    var html = _ref.html,
        head = _ref.head,
        state = _ref.state;

    res.end('<!doctype html>\n      <html lang="en">\n        <head>\n          <base href="/">\n          <meta charset="utf-8">\n          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">\n          <link rel="stylesheet" href="./bundle.css" />\n          ' + head + '\n        </head>\n        <body>\n          <div class=\'main-app-container\'>' + html + '</div>\n          <script>window.__initial_store__ = ' + JSON.stringify(state) + ';</script>\n          <script src="./bundle.js"></script>\n        </body>\n      </html>');
  });
};

polka().use(compress, assets, ssr).listen(port, function (err) {
  if (err) throw err;
  console.log('> Ready on http://localhost:' + port);
});
