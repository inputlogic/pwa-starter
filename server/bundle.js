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

function applyRef(ref, value) {
  if (ref != null) {
    if (typeof ref == 'function') ref(value);else ref.current = value;
  }
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
	var p;
	while (p = items.pop()) {
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
		applyRef(old, null);
		applyRef(value, node);
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
	while (c = mounts.shift()) {
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
		if (node['__preactattr_'] != null) applyRef(node['__preactattr_'].ref, null);

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

	applyRef(component.__ref, component);
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
		mounts.push(component);
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
		if (base['__preactattr_'] != null) applyRef(base['__preactattr_'].ref, null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	applyRef(component.__ref, null);
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

function createRef() {
	return {};
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	createRef: createRef,
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
            createRef: createRef,
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

var storeRef = void 0; // Will get populated if WithRequest receives `store` via context

var OK_TIME = 30000;

// cache result of request by endpoint, either in store or local cache object
var cache = function cache(endpoint, result) {
  storeRef.setState({
    requests: _extends({}, storeRef.getState().requests || {}, defineProperty({}, endpoint, { result: result, timestamp: Date.now() }))
  });
};

// get timestamp of an endpoint from store or local cache object
var getTimestamp = function getTimestamp(endpoint) {
  var reqs = storeRef.getState().requests || {};
  return reqs[endpoint] && reqs[endpoint].timestamp;
};

// check if last saved timestamp for endpoint is not expired
var validCache = function validCache(endpoint) {
  var ts = getTimestamp(endpoint);
  if (!ts) return false;
  var diff = Date.now() - ts;
  return diff < OK_TIME;
};

var WithRequest = function (_React$Component) {
  inherits(WithRequest, _React$Component);

  function WithRequest(props, _ref) {
    var store = _ref.store;
    classCallCheck(this, WithRequest);

    var _this = possibleConstructorReturn(this, (WithRequest.__proto__ || Object.getPrototypeOf(WithRequest)).call(this, props));

    storeRef = store;
    _this._existing = null;
    _this.state = _extends({}, _this.state || {}, { isLoading: true, result: null, error: null });
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
        this.setState({
          result: storeRef.getState().requests[endpoint].result,
          isLoading: false
        });
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
      return !equal(nextState, this.state);
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

function cosntToCamel (str) {
  let ret = '';
  let prevUnderscore = false;
  for (let s of str) {
    const isUnderscore = s === '_';
    if (isUnderscore) {
      prevUnderscore = true;
      continue
    }
    if (!isUnderscore && prevUnderscore) {
      ret += s;
      prevUnderscore = false;
    } else {
      ret += s.toLowerCase();
    }
  }
  return ret
}

function camelToConst (str) {
  let ret = '';
  let prevLowercase = false;
  for (let s of str) {
    const isUppercase = s.toUpperCase() === s;
    if (isUppercase && prevLowercase) {
      ret += '_';
    }
    ret += s;
    prevLowercase = !isUppercase;
  }
  return ret.replace(/_+/g, '_').toUpperCase()
}

var CALLED = {};

var buildActionsAndReducer = function buildActionsAndReducer(withActions, store, componentName) {
  var actionTypes = Object.keys(withActions).map(camelToConst);
  function reducer(action, state) {
    if (actionTypes.includes(action.type)) {
      var args = action.payload.args || [];
      var fnRef = cosntToCamel(action.type);
      return _extends({}, state, withActions[fnRef].apply(null, [state].concat(toConsumableArray(args || []))));
    }
    return state;
  }
  var actions = {};
  Object.keys(withActions).forEach(function (type) {
    actions[type] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return store.dispatch({
        type: camelToConst(type),
        payload: { args: args },
        meta: { componentName: componentName }
      });
    };
  });
  return {
    reducer: reducer,
    actions: actions
  };
};

var connect = function connect(_ref) {
  var name = _ref.name,
      withActions = _ref.withActions,
      withState = _ref.withState,
      withRequest = _ref.withRequest,
      getStoreRef = _ref.getStoreRef,
      rest = objectWithoutProperties(_ref, ['name', 'withActions', 'withState', 'withRequest', 'getStoreRef']);
  return function (PassedComponent) {
    var Base = withState != null ? WithState : preact.Component;

    var Connect = function (_Base) {
      inherits(Connect, _Base);

      function Connect(props, context) {
        classCallCheck(this, Connect);

        var _this = possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, props, context));

        if (context.store) {
          if (withActions) {
            if (!CALLED[name]) {
              var _buildActionsAndReduc = buildActionsAndReducer(withActions, context.store, name),
                  reducer = _buildActionsAndReduc.reducer,
                  actions = _buildActionsAndReduc.actions;

              context.store.addReducer(reducer);
              _this._actions = actions;
              CALLED[name] = actions;
            } else {
              _this._actions = CALLED[name];
            }
          }
          if (getStoreRef) {
            getStoreRef(context.store);
          }
        }
        _this.state = _extends({}, _this.state);
        return _this;
      }

      createClass(Connect, [{
        key: 'render',
        value: function render$$1() {
          var _this2 = this;

          var mappedState = withState != null ? this.state._mappedState : {};
          var allState = _extends({}, mappedState, this.state);
          return withRequest != null ? preact.h(
            WithRequest,
            {
              request: withRequest(allState, this.props),
              connectState: mappedState
            },
            function (_ref2) {
              var isLoading = _ref2.isLoading,
                  response = objectWithoutProperties(_ref2, ['isLoading']);
              return isLoading ? null : preact.h(PassedComponent, _extends({}, allState, response, _this2.props, rest, _this2._actions));
            }
          ) : preact.h(PassedComponent, _extends({}, allState, this.props, rest, this._actions));
        }
      }]);
      return Connect;
    }(Base);

    if (withState) {
      Connect.defaultProps = { mapper: withState };
    }

    var passedComponentName = PassedComponent.displayName || PassedComponent.name || name || 'PassedComponent';
    Connect.displayName = 'connect(' + passedComponentName + ')';

    return Connect;
  };
};

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

var storeRef$1 = void 0;

var segmentize = function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
};

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

var Router = connect({
  name: 'Router',
  withState: function withState(_ref) {
    var currentPath = _ref.currentPath;
    return { currentPath: currentPath };
  },
  getStoreRef: function getStoreRef(store) {
    storeRef$1 = store;
  }
})(function (_ref2) {
  var currentPath = _ref2.currentPath,
      routes = _ref2.routes;

  for (var route in routes) {
    if (routes[route].hasOwnProperty('routes')) {
      var shouldRender = Object.values(routes[route].routes).some(function (_ref3) {
        var path = _ref3.path;
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
        if (!equal(newRoute, storeRef$1.getState().currentRoute)) {
          storeRef$1.setState({ currentRoute: newRoute });
        }
        var Component$$1 = routes[route].component;
        return preact.h(Component$$1, routeArgs);
      }
    }
  }
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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

var require$$0 = getCjsExportFromNamespace(preact$1);

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

var actions = {
  onContainerClick: function onContainerClick(state, event) {
    if (isOverlay(event.target)) {
      return { modal: null };
    }
  },
  closeModal: function closeModal(state) {
    return { modal: null };
  }
};

var Modal = connect({
  name: 'Modal',
  withActions: actions
})(function (_ref) {
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

var Modals = connect({
  name: 'Modals',
  withActions: actions,
  withState: function withState(_ref2) {
    var currentRoute = _ref2.currentRoute,
        modal = _ref2.modal;
    return { currentRoute: currentRoute, modal: modal };
  }
})(function (_ref3) {
  var currentRoute = _ref3.currentRoute,
      modal = _ref3.modal,
      closeModal = _ref3.closeModal,
      children = _ref3.children;

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

var storeRef$2 = void 0; // Will get populated by `getStoreReference`

var actions$1 = {
  toggle: function toggle(_ref, uid) {
    var dropdown = _ref.dropdown;

    var isOpen = dropdown === uid;
    return { dropdown: isOpen ? null : uid };
  }
};

var mapper = function mapper(_ref2, _ref3) {
  var dropdown = _ref2.dropdown;
  var uid = _ref3.uid;

  if (!uid) {
    console.warn('<Dropdown> must include a uid prop.');
  }
  return { isOpen: dropdown === uid };
};

var Dropdown = connect({
  name: 'Dropdown',
  withActions: actions$1,
  withState: mapper,
  getStoreRef: function getStoreRef(store) {
    storeRef$2 = store;
  }
})(function (_ref4) {
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

var Image = function (_React$Component) {
  inherits(Image, _React$Component);

  function Image(props) {
    classCallCheck(this, Image);

    var _this = possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, props));

    _this.state = {
      loaded: -1 // index of loaded src
    };
    _this._imgs = [];
    _this._loadImage = _this._loadImage.bind(_this);
    return _this;
  }

  createClass(Image, [{
    key: '_loadImage',
    value: function _loadImage(idx, src) {
      var _this2 = this;

      if (typeof document !== 'undefined') {
        var img = document.createElement('img');
        this._imgs.push(img);
        img.onload = function () {
          if (_this2.state.loaded < idx) {
            _this2.setState({ loaded: idx });
          }
          _this2._removeImage(img);
        };
        img.onerror = function () {
          console.warn('Failed to load srcs[' + idx + '] => ' + src);
          _this2._removeImage(img);
        };
        img.src = src;
      }
    }
  }, {
    key: '_removeImage',
    value: function _removeImage(img) {
      if (img) {
        img.remove();
      }

      if ((this._imgs || []).includes(img)) {
        this._imgs = this._imgs.filter(function (i) {
          return i !== img;
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.props.srcs.forEach(function (src, idx) {
        return _this3._loadImage(idx, src);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this4 = this;

      if (this._imgs && this._imgs.length) {
        this._imgs.forEeach(function (img) {
          return _this4._removeImage(img);
        });
      }
    }
  }, {
    key: 'render',
    value: function render$$1() {
      var _props = this.props,
          srcs = _props.srcs,
          _props$unloadedSrc = _props.unloadedSrc,
          unloadedSrc = _props$unloadedSrc === undefined ? '/images/blank-poster.gif' : _props$unloadedSrc,
          className = _props.className,
          props = objectWithoutProperties(_props, ['srcs', 'unloadedSrc', 'className']);
      var loaded = this.state.loaded;

      return loaded === -1 ? preact.h('img', _extends({
        src: unloadedSrc,
        className: className + ' image-loading'
      }, props)) : preact.h('img', _extends({
        src: srcs[loaded],
        className: className + ' image-ready'
      }, props));
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

var atom = createCommonjsModule(function (module, exports) {
/* globals define */
(function (root, factory) {
  {
    module.exports = factory();
  }
}(commonjsGlobal, function () {

  return function (reducers, initialState) {
    if (typeof reducers === 'function') {
      reducers = [reducers];
    }
    var listeners = [];
    var state = initialState;

    reducers.push(function setStateReducer (action, state) {
      return action && action.type === '__ATOM_SET_STATE__'
        ? Object.assign(state, action.payload)
        : state
    });

    return {
      addReducer: addReducer,
      removeReducer: removeReducer,
      dispatch: dispatch,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      getState: getState,
      setState: setState
    }

    function addReducer (reducer) {
      if (typeof reducer !== 'function') {
        throw new E('reducer must be a function')
      }
      reducers.push(reducer);
    }

    function removeReducer (reducer) {
      if (!reducer) return
      const idx = reducers.findIndex(l => l === reducer);
      idx > -1 && reducers.splice(idx, 1);
    }

    function dispatch (/* action[, action1, action2, ...] */) {
      var len = arguments.length;
      var newState = getState();
      for (var x = 0; x < len; x++) {
        newState = callReducers(reducers, arguments[x], newState);
      }
      if (validState(newState)) {
        cb(newState);
      }
    }

    function subscribe (listener) {
      if (typeof listener !== 'function') {
        throw new E('listener must be a function')
      }
      listeners.push(listener);
      return function () { unsubscribe(listener); }
    }

    function unsubscribe (listener) {
      if (!listener) return
      const idx = listeners.findIndex(l => l === listener);
      idx > -1 && listeners.splice(idx, 1);
    }

    function getState () {
      return typeof state === 'object'
        ? Object.assign({}, state)
        : state
    }

    function setState (newState) {
      dispatch({type: '__ATOM_SET_STATE__', payload: newState});
    }

    // Private

    function callReducers (fns, action, state) {
      var newState = state;
      var len = reducers.length;
      var ret;
      for (var x = 0; x < len; x++) {
        ret = fns[x](action, newState);
        if (validState(ret)) {
          newState = ret;
        }
      }
      return newState
    }

    function cb (newState) {
      state = newState;
      for (var x = 0; x < listeners.length; x++) {
        listeners[x]();
      }
    }

    function validState (newState) {
      if (newState === undefined) {
        throw new E('Reducer must return a value.')
      } else if (typeof newState.then === 'function') {
        throw new E('Reducer cannot return a Promise.')
      } else if (typeof newState === 'function') {
        newState(dispatch);
      } else {
        return true
      }
    }

    function E (message) {
      this.message = message;
      this.name = 'AtomException';
      this.toString = function () {
        return this.name + ': ' + this.message
      };
    }
  }
}));
});

var devtools = function atomDevTools (store) {
  var extension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.top.__REDUX_DEVTOOLS_EXTENSION__;
  var ignoreState = false;

  if (!extension) {
    console.warn('Please install/enable Redux devtools extension');
    store.devtools = null;
    return store
  }

  if (!store.devtools) {
    store.devtools = extension.connect();

    store.devtools.subscribe(function (message) {
      if (message.type === 'DISPATCH' && message.state) {
        ignoreState = (message.payload.type === 'JUMP_TO_ACTION' || message.payload.type === 'JUMP_TO_STATE');
        store.setState(JSON.parse(message.state));
      }
    });

    store.devtools.init(store.getState());

    store.addReducer(function devtoolsReducer (action, state) {
      if (!ignoreState) {
        store.devtools.send(action, state);
      } else {
        ignoreState = false;
      }
      return state
    });
  }

  return store
};

function partial (fn, args) {
  args = [fn].concat(Array.prototype.slice.call(args));
  return fn.bind.apply(fn, args)
}

function path (paths, obj) {
  if (arguments.length < 2) return partial(path, arguments)
  r$1(arguments, [['array', 'string'], ['array', 'object', 'window', 'global']]);
  if (r$1.prototype.toType(paths) === 'string') paths = paths.split('.');
  let val = obj;
  for (let x = 0; x < paths.length; x++) {
    if (val == null) {
      return
    }
    val = val[paths[x]];
  }
  return val
}

function deepClone (obj) {
  r$1(arguments, [['object', 'array']]);
  return JSON.parse(JSON.stringify(obj))
}

const toType = r$1.prototype.toType;

/**
 * Merge all given objects into a new object.
 * @return {Object}
 */
function merge (/* objects */) {
  const len = arguments.length;
  const out = {};
  for (let x = 0; x < len; x++) {
    if (toType(arguments[x]) !== 'object') {
      throw new TypeError('All arguments must be objects!')
    }
    let obj = arguments[x];
    let keys = Object.keys(obj);
    let keysLen = keys.length;
    for (let z = 0; z < keysLen; z++) {
      let key = keys[z];
      let type = toType(obj[key]);
      if (type === 'object') {
        out[key] = merge(obj[key]);
      } else if (type === 'array') {
        out[key] = obj[key].slice(0);
      } else {
        out[key] = obj[key];
      }
    }
  }
  return out
}

function partial$1 (fn, args) {
  args = [fn].concat(Array.prototype.slice.call(args));
  return fn.bind.apply(fn, args)
}

function reduce (fn, initVal, ls) {
  if (arguments.length < 3) return partial(reduce, arguments)
  r$1(arguments, ['function', '-any', 'array']);
  return Array.prototype.reduce.call(ls, fn, initVal)
}

function pathSet (paths, valToSet, object) {
  if (arguments.length < 3) return partial$1(pathSet, arguments)
  r$1(arguments, [['array', 'string'], '-any', ['object', 'array']]);
  if (r$1.prototype.toType(paths) === 'string') paths = paths.split('.');
  const copy = r$1.prototype.toType(paths) === 'object' ? merge({}, object) : deepClone(object);
  reduce(
    (obj, prop, idx) => {
      obj[prop] = obj[prop] || {};
      if (paths.length === (idx + 1)) {
        obj[prop] = valToSet;
      }
      return obj[prop]
    },
    copy,
    paths
  );
  return copy
}

const toType$1 = r$1.prototype.toType;

/**
 * Functional, curryable wrapper around native Array.filter implementation
 * @param  {Function} fn
 * @param  {Array}    ls
 * @return {Array}
 */
function filter (fn, ls) {
  if (arguments.length < 2) return partial(filter, arguments)
  r$1(arguments, ['function', ['array', 'object']]);
  return toType$1(ls) === 'array'
    ? Array.prototype.filter.call(ls, fn)
    : objFilter(fn, ls)
}

function objFilter (fn, obj) {
  const keys = Object.keys(obj);
  const len = keys.length;
  const result = {};
  for (let x = 0; x < len; x++) {
    if (fn(obj[keys[x]], keys[x])) {
      result[keys[x]] = obj[keys[x]];
    }
  }
  return result
}

/**
 * Return a new object with only the specified keys included.
 * @param  {Array} keys
 * @param  {Object} obj
 * @return {Object}
 */
function pick (keys, obj) {
  if (arguments.length < 2) return partial(pick, arguments)
  r$1(arguments, ['array', 'object']);
  const result = {};
  for (let x = 0; x < keys.length; x++) {
    let k = keys[x];
    result[k] = obj[k];
  }
  return result
}

const toType$2 = r$1.prototype.toType;

/**
 * Return a new object without any of the specified keys included.
 * @param  {Array} keys
 * @param  {Object} obj
 * @return {Object}
 */
function without (keys, obj) {
  if (arguments.length < 2) return partial(without, arguments)
  r$1(arguments, [['string', 'array'], 'object']);
  if (toType$2(keys) === 'string') {
    keys = [keys];
  }
  const keep = filter((k) => keys.indexOf(k) === -1, Object.keys(obj));
  return pick(keep, obj)
}

function last (ls) {
  r$1([arguments[0]], ['array']);
  const n = ls.length ? ls.length - 1 : 0;
  return ls[n]
}

const toType$3 = r$1.prototype.toType;

function pathUpdate (path$$1, payload, state) {
  let {value} = payload;
  const currentValue = path(path$$1, state);
  const newType = toType$3(value);

  if (newType === toType$3(currentValue)) {
    if (newType === 'array') {
      return pathSet(path$$1, currentValue.concat(value), state)
    } else if (newType === 'object') {
      return pathSet(path$$1, merge(currentValue, value), state)
    }
  }
  return pathSet(path$$1, value, state)
}

function pathRemove (path$$1, payload, state) {
  const parent = path(path$$1.slice(0, -1), state);
  const parentType = toType$3(parent);
  if (parentType === 'object') {
    return path$$1.length > 1
      ? pathSet(
        path$$1.slice(0, -1),
        without(path$$1.slice(-1), parent),
        state
      )
      : without(path$$1, state)
  } else if (parentType === 'array') {
    const idx = last(path$$1);
    if (toType$3(idx) === 'number') {
      parent.splice(idx, 1);
      return pathSet(path$$1.slice(0, -1), parent, state)
    }
  }
  return pathSet(path$$1, null, state)
}

function batch (payload, state) {
  const {actions} = payload;
  if (!actions || !actions.length) {
    return state
  }
  const len = actions.length;
  let newState = state;
  for (let x = 0; x < len; x++) {
    newState = pathReducer(newState, actions[x]);
  }
  return newState
}

function pathReducer (action, state) {
  const {type, payload} = action;
  const path$$1 = path('path', payload || {});
  switch (type) {
    case 'PATH_SET':
      return pathSet(path$$1, payload.value, state)

    case 'PATH_UPDATE':
      return pathUpdate(path$$1, payload, state)

    case 'PATH_REMOVE':
      return pathRemove(path$$1, payload, state)

    case 'PATH_BATCH':
      return batch(payload, state)

    default:
      return state
  }
}

var DEBUG = typeof window !== 'undefined' ? window.location.hostname.indexOf('local') > -1 : "development";

var WEB_URL = function () {
  if (typeof window === 'undefined') {
    return 'https://cool-app.com';
  }
  return window.location.href.replace(window.location.pathname, '');
}();

var initialState = _extends({
  clicks: 0,
  // In the browser, we initialize the currentPath prop, which is set
  // by [Router](https://github.com/inputlogic/elements/tree/master/components/router)
  currentPath: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/',
  // `pendingRequests` is used by the [WithRequest](https://github.com/inputlogic/elements/tree/master/components/with-request) HoC.
  pendingRequests: 0
}, typeof window !== 'undefined' ? JSON.parse(window.__initial_store__ || '') : {});

// You can either define your reducers here, or add them later with:
// `store.addReducer(reducer)`
var reducers = [pathReducer];

var store = typeof window !== 'undefined' && DEBUG ? devtools(atom(reducers, initialState)) : atom(reducers, initialState);

var getState = store.getState;
var setState = store.setState;

function Provider(props) {
  this.getChildContext = function () {
    return { store: props.store };
  };
}
Provider.prototype.render = function (props) {
  return props.children[0];
};

var Home = function Home() {
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
              return setState({ modal: 'ExampleModal' });
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
          srcs: ['http://www.placehold.it/400x300/eee/eee?text=Loading', 'http://www.placehold.it/400x300/' + hex + '/f44?text=' + hex],
          style: 'width: 100%'
        });
      }, ['fff', 'a7c', '09d', '411', '111'])
    )
  );
};

var routes = {
  home: {
    path: '/',
    component: Home
  }
};

var MainApp = function MainApp() {
  return preact.h(
    'div',
    null,
    preact.h(Router, { routes: routes }),
    preact.h(
      Modals,
      null,
      preact.h(ExampleModal, null)
    )
  );
};

var has$1 = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
var decode$1 = function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
};

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function parse$1(query) {
  var parser = /([^=?&]+)=?([^&]*)/g;
  var result = {};
  var part = void 0;

  while ((part = parser.exec(query)) != null) {
    var key = decode$1(part[1]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = decode$1(part[2]);
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
function stringify$1(obj) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if (typeof prefix !== 'string') prefix = '?';

  for (var key in obj) {
    if (has$1.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

var qs$1 = {
  stringify: stringify$1,
  parse: parse$1
};

var storeRef$3 = void 0;

var segmentize$1 = function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
};

function updateQuery$1(queries) {
  var existingParams = qs$1.parse(window.location.search);
  return window.location.pathname + ('?' + qs$1.stringify(_extends({}, existingParams, queries)));
}

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

var Router$1 = connect({
  name: 'Router',
  withState: function withState(_ref) {
    var currentPath = _ref.currentPath;
    return { currentPath: currentPath };
  },
  getStoreRef: function getStoreRef(store) {
    storeRef$3 = store;
  }
})(function (_ref2) {
  var currentPath = _ref2.currentPath,
      routes = _ref2.routes;

  for (var route in routes) {
    if (routes[route].hasOwnProperty('routes')) {
      var shouldRender = Object.values(routes[route].routes).some(function (_ref3) {
        var path = _ref3.path;
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
        if (!equal(newRoute, storeRef$3.getState().currentRoute)) {
          storeRef$3.setState({ currentRoute: newRoute });
        }
        var Component$$1 = routes[route].component;
        return preact.h(Component$$1, routeArgs);
      }
    }
  }
});

if (typeof window !== 'undefined') {
  document.addEventListener('click', function (ev) {
    if (ev.target.nodeName === 'A' && storeRef$3) {
      if (ev.metaKey) return;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      window.scrollTo(0, 0);
      var url = ev.target.getAttribute('href');
      var currentPath = storeRef$3.getState().currentPath;
      if (currentPath !== url) {
        window.history['pushState'](null, null, url);
        storeRef$3.setState({ currentPath: url });
      }
    }
  });
}

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
  return updateQuery$1({ page: page });
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

var OK_TYPES = ['function', 'object'];

// We subscribe to `currentPath` to rerender on route change
var ListResource = connect({
  name: 'ListResource',
  withState: function withState(_ref) {
    var currentPath = _ref.currentPath;
    return { currentPath: currentPath };
  }
})(function (_ref2) {
  var endpoint = _ref2.endpoint,
      limit = _ref2.limit,
      _ref2$list = _ref2.list,
      list = _ref2$list === undefined ? true : _ref2$list,
      _ref2$pagination = _ref2.pagination,
      pagination = _ref2$pagination === undefined ? false : _ref2$pagination,
      children = _ref2.children;

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
  var args = qs$1.parse(search);
  var activePage = args.page ? parseInt(args.page, 10) : 1;

  var request = {
    endpoint: limit != null ? endpoint + '?limit=' + limit + (activePage > 1 ? '&offset=' + limit * activePage : '') : endpoint
  };
  return preact.h(
    WithRequest,
    { request: request },
    function (_ref3) {
      var result = _ref3.result,
          isLoading = _ref3.isLoading;
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

var Resource = function Resource(_ref4) {
  var endpoint = _ref4.endpoint,
      props = objectWithoutProperties(_ref4, ['endpoint']);
  return preact.h(ListResource, _extends({ key: 'resource-' + endpoint, list: false, endpoint: endpoint }, props));
};

var endpoint = 'https://jsonplaceholder.typicode.com/users';

var Users = function Users() {
  return preact.h(
    ListResource,
    { endpoint: endpoint },
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
};

var url = 'https://jsonplaceholder.typicode.com/users/';

var User = function User(_ref) {
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
};

var storeRef$4 = void 0; // Will get populated if we receive `store` via context

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
'InputIcon', 'InputText', 'InputLocation', 'Checkbox', 'Question', 'WhatTimesQuestion', 'WhenDoneQuestion', 'Slider', 'CategoryPillFilter'];

// `displayName` is lost in Release builds. It must be explicitly set
// on each of the above `formFieldNames` Component classes.
// See: https://github.com/facebook/react-native/issues/19106
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
  var name = getNodeName(child);
  if (!formFieldNames.includes(name)) {
    return false;
  } else if (getProps(child).name) {
    return true;
  } else {
    console.warn('Found Component \'' + name + '\' missing \'name\' prop!');
    return false;
  }
};

// Our actual Form component

var Form = function (_React$Component) {
  inherits(Form, _React$Component);

  function Form(props, _ref) {
    var store = _ref.store;
    classCallCheck(this, Form);

    var _this = possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    storeRef$4 = store;
    if (!_this.props.name) throw new Error('<Form /> Components needs a `name` prop.');
    _this.state = {
      values: _this.props.initialData || {},
      errors: {},
      submitting: false
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
            value: _this2.state.values[child.props.name],
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

      if (this.state.submitting) {
        return;
      }

      this.setState({ submitting: true });

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
          data: this.state.values,
          state: this.state,
          clearValues: function clearValues() {
            return _this3.setState({
              values: _this3.props.initialData || {},
              errors: {}
            });
          }
        });
      } else {
        if (!hasError) {
          var _makeRequest = makeRequest({
            endpoint: this.props.action,
            method: this.props.method,
            data: this.state.values,
            noAuth: this.props.noAuth || false,
            invalidate: this.props.invalidate
          }),
              xhr = _makeRequest.xhr,
              promise = _makeRequest.promise;

          promise.then(function (r) {
            _this3.setState({ submitting: false });
            _this3.props.onSuccess && _this3.props.onSuccess(r);
          }).catch(function (_) {
            _this3.setState({ submitting: false });
            _this3.props.onFailure && _this3.props.onFailure(xhr);
          });
        } else {
          this.setState({ submitting: false });
          storeRef$4.setState({ notification: { status: 'failure', message: 'Please complete all form fields!' } });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!equal(this.state, storeRef$4.getState()[this.props.name])) {
        storeRef$4.setState(defineProperty({}, this.props.name, this.state));
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

var Login = function Login() {
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
};

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

var AccountApp = function AccountApp() {
  return preact.h(
    'div',
    { id: 'account-layout' },
    preact.h(AccountHeader, null),
    preact.h(Router, { routes: routes$1 })
  );
};

// `<Router />`'s accept two object formats. The first, which we'll cover now, is for

// These app routes need to be defined here (outside of a Component's render function)
// so that our [urlFor](/util/urlFor.html) function works without mounting any React
// Components. These also get passed into a `<Router />` inside the [MainApp](/index.html)
// Component and only render if a path within their `routes` object is currently matched.
var routes$2 = {
  main: {
    routes: routes,
    component: MainApp
  },
  account: {
    routes: routes$1,
    component: AccountApp
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

var GlobalHeader = connect({
  name: 'GlobalHeader',
  withActions: {
    increment: function increment(_ref) {
      var clicks = _ref.clicks;
      return { clicks: (clicks || 0) + 1 };
    }
  },
  withState: function withState(_ref2) {
    var clicks = _ref2.clicks;
    return { clicks: clicks };
  }
})(function (_ref3) {
  var clicks = _ref3.clicks,
      increment = _ref3.increment;
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

var NotFound = connect({
  name: 'NotFound',
  withState: function withState(_ref) {
    var currentRoute = _ref.currentRoute;
    return { currentRoute: currentRoute };
  }
})(function (_ref2) {
  var currentRoute = _ref2.currentRoute;
  return !currentRoute ? Base() : null;
});

// And, finally, our RootApp! This is the top-level Component to render
// into the DOM and kick-start our entire app!

// First, our entire app is wrapped in the _atom_ `Provider` component.
// This adds the store to the React context, meaning any child can access our
// store reference.
// Then we include those Component's that we want to be rendered on *all* routes.
var RootApp = function RootApp() {
  return preact.h(
    Provider,
    { store: store },
    preact.h(
      'div',
      { className: 'main-app-container' },
      preact.h(Helmet, {
        title: 'Welcome',
        titleTemplate: 'PWA Starter | %s',
        defaultTitle: 'Welcome'
      }),
      preact.h(GlobalHeader, null),
      preact.h(Notification, null),
      preact.h(Router, { routes: routes$2 }),
      preact.h(NotFound, null)
    )
  );
};

// Only render if we are in the browser, server-side rendering will be
// handled by the `server` (which is not covered here).
if (typeof window !== 'undefined') {
  preact.render(preact.h(RootApp, null), document.body, document.body.children[0]);
}

// Contents
// --------

// **/**

// - [consts.js](/consts.html)
// - [routes.js](/routes.html)
// - [initialState.js](/initialState.html)

// **apps/**

// This is where we organize project specific code into logical groupings.
// Each app will need to export a Component and `{routes}` Object.

// **assets/**

// Put any static files you want copied over to the `public/` folder.

// **elements/**

// Elements are reusable Components that render some JSX. These are generic
// and are common to use throughout all apps.

// - [global-header.js](/elements/global-header)
// - [not-found.js](/elements/not-found)

// **modals/**

// Any global (cross-app) modals can go here. These should all use the
// [Modal](https://github.com/inputlogic/elements/tree/master/packages/Modal) element in their `render` method.

// - [example-modal.js](/modals/example-modal)

// **styles/**

// Global LESS files can go here. They should be manually imported by
// `src/index.js`

// **util/**

// Simple helper functions used throughout your project.

var getState$1 = store.getState,
    setState$1 = store.setState;


var renderReact = function renderReact(url) {
  return new Promise(function (resolve, reject) {
    setState$1({ currentPath: url });
    c(preact.h(RootApp, null)); // Render, to register pendingRequests

    var maxTime = 6000;
    var delay = 1;
    var count = 0;
    var id = setInterval(function () {
      var pending = getState$1().pendingRequests;
      if (!pending || count * delay >= maxTime) {
        clearInterval(id);
        var state = JSON.stringify(getState$1());
        // Rerender html again, now that pendingRequests are done
        var html = c(preact.h(RootApp, null));
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
