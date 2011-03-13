/**
 * repl.js
 */

depends("helpers/string_helper");
depends("events");
depends("util");

repl = {
	version: "0.1"
};

repl.Parser = function(code) {
	util.ArrayIterator.apply(this);	
	
	var list = code.split(/\r?\n\r?/);
	
	while (list.length) {
		var line = list.shift();
		if (line != "") {
			this.push(line);
		}
	}
};
repl.Parser.prototype = (function() {
	var proto = new util.ArrayIterator;
	
	
	
	return proto;
})();

repl.Interpreter = function() {
};
