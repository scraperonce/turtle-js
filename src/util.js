/**
 * util.js
 */

util = {
	version: "0.1"
};

util.ArrayIterator = function() {
	Array.apply(this, arguments);
	
	this.current = -1;
};
util.ArrayIterator.prototype = (function() {
	var proto = new Array;
	
	proto.first = function() {
		this.current = -1;
	};
	
	proto.last = function() {
		this.current = this.length-1;
	};
	
	proto.next = function() {
		if (this.length <= 0) return null;
		if (this.current >= this.length-1) {
			this.current = this.length-1;
			return null;
		}
		return this[++(this.current)];
	}
	
	return proto;
})();
