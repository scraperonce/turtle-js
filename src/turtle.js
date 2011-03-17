/**
 * turtle.js
 */
depends("core/helpers/function_helper")
depends("repl");

turtle = {
	version: "0.2"
};

turtle.run = function(code) {
	var parser = new repl.TokenParser(code);
	var interpreter = new turtle.Interpreter(parser);
	interpreter.run();
	return interpreter;
};

turtle.Interpreter = function() {
	repl.Interpreter.apply(this, arguments);
	
	this.on("begin", function() {
		console.log(arguments);
	});
	
	this.addRule("help", function(n) {
		console.log(n)
	});
	this.addRule("code", function(n) {
	});
};
turtle.Interpreter.prototype = (function() {
	var proto = repl.Interpreter.clone();
	
	var PREFIX = "logo_";
	
	proto.addRule = (function(_super) {
		return function(keyword, fn) {
			return _super.call(this, PREFIX+keyword, fn);
		};
	})(proto.addRule);
	
	proto.execute = (function(_super) {
		return function(token, async) {
			token[0] = PREFIX + token[0];
			return _super.call(this, token, async);
		};
	})(proto.execute);
	
	return proto;
})();

turtle.Turtle = (function() {
	
})();
