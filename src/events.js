/**
 * events.js
 */

events = {
	version: "0.1"
};

events.EventEmitter = function() {
	// prepare
	var that = this;
	
	// private properties
	var map = {};
	
	// public methods
	that.on = function(type, listener) {
		var events = map[type] || [];
		events.push(listener);
		map[type] = events;
	};

	that.removeListener = function(type, listener) {
		var events = map[type] || [];
		var index = events.indexOf(listener);
		if (index != -1) events.splice(index, 1);
		map[type] = events;
	};

	that.removeAllListeners = function(type) {
		if (map[type]) map[type] = [];
	};

	that.emit = function(type/*, arg1,..., argn*/) {
		var args = Array.prototype.slice.apply(arguments);
		args.shift();

		var events = map[type] || [];
		for (var i=0, len=events.length; i<len; i++) (function(fx) {
			setTimeout(function() { fx.apply(null, args) }, 0);
		})(events[i]);
	};
	
	that.emitSync = function(type/*, arg1,..., argn*/) {
		var args = Array.prototype.slice.apply(arguments);
		args.shift();

		var events = map[type] || [];
		for (var i=0, len=events.length; i<len; i++) {
			events[i].apply(null, args);
		}
	};

	that.listener = function(type) {
		var events = map[type];
		return events ? events.concat() : null;
	};
};
