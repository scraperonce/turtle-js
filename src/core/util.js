/**
 * util.js
 */
depends("assert");

util = {
	version: "0.12"
};

util.ArrayIterator = function() {
	Array.apply(this, arguments);
	
	this.current = -1;
};
util.ArrayIterator.prototype = (function() {
	var proto = new Array;
	
	proto.first = function() {
		this.current = 0;
		return this[this.current];
	};
	
	proto.move = function(n) {
		assert.type(n, "number");
		assert.and(0<=n, n<this.length);
		
		this.current = n;
		return this[this.current];
	};
	
	proto.last = function() {
		this.current = this.length-1;
		return this[this.current];
	};
	
	proto.next = function() {
		try {
			return this.move(this.current+1);
		} catch (e) {
			return null;
		}
	}
	
	return proto;
})();
