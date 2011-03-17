/**
 * function_helper.js
 */
depends("../assert");

function_helper = {
	version: "0.2"
}

Function.prototype.clone = function() {
	var proto = this.prototype;
	var lambda = function() {};
	lambda.prototype = proto;
	return new lambda();
}; 

Function.prototype.decent = function(fn) {
	var fx = this;
	return function() {
		var args = Array.prototype.slice.apply(arguments);
		args.unshift(fx);
		return fn.apply(this, fn);
	};
};
