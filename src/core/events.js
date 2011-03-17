/**
 * events.js
 */

depends("assert");

events = {
	version: "0.13"
};

events.EventEmitter = function() {
	// prepare
	var that = this;
	
	// private properties
	this._eventMap = {};
}
events.EventEmitter.prototype = (function() {
	var proto = {};
	
	proto.on = function(type, listener) {
		assert.type(type, "string");
		assert.type(listener, "function");
		
		type = type.toLowerCase();
		
		var events = this._eventMap[type] || [];
		events.push(listener);
		this._eventMap[type] = events;
	};

	proto.removeListener = function(type, listener) {
		assert.type(type, "string");
		assert.type(listener, "function");
		
		type = type.toLowerCase();
		
		var events = this._eventMap[type] || [];
		var index = events.indexOf(listener);
		if (index != -1) events.splice(index, 1);
		this._eventMap[type] = events;
	};

	proto.removeAllListeners = function(type) {
		assert.type(type, "string");
		
		type = type.toLowerCase();
		
		if (this._eventMap[type]) this._eventMap[type] = [];
	};

	proto.emit = function(type/*, arg1,..., argn*/) {
		assert.type(type, "string");
		
		var args = Array.prototype.slice.apply(arguments);
		type = args.shift().toLowerCase();

		var events = this._eventMap[type] || [];
		for (var i=0, len=events.length; i<len; i++) (function(fx) {
			setTimeout(function() { fx.apply(null, args) }, 0);
		})(events[i]);
	};
	
	proto.emitSync = function(type/*, arg1,..., argn*/) {
		assert.type(type, "string");
		
		var args = Array.prototype.slice.apply(arguments);
		type = args.shift().toLowerCase();
		
		var events = this._eventMap[type] || [];
		for (var i=0, len=events.length; i<len; i++) {
			events[i].apply(null, args);
		}
	};

	proto.listeners = function(type) {
		assert.type(type, "string");
		
		type = type.toLowerCase();
		
		var events = this._eventMap[type];
		return events ? events.concat() : null;
	};
	
	return proto;
})();
