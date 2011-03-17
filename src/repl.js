/**
 * repl.js
 */
depends("core/assert");
depends("core/helpers/string_helper");
depends("core/helpers/function_helper");
depends("core/events");
depends("core/util");

repl = {
	version: "0.54"
};

repl.TokenParser = function(code) {
	util.ArrayIterator.apply(this);
	
	assert.type(code, "string");
	
	var list = code.split(/\r?\n\r?/);
	while(list.length)  {
		var line = list.shift();
		if (line != "") this.push(line.trim());
	}
};
repl.TokenParser.prototype = (function() {
	var proto = util.ArrayIterator.clone();
	
	proto.nextToken = function() {
		var line = this.next();
		if (line === null) return null;
		return this._parseToken(line);
	};
	
	proto._parseToken = function(line) {
		assert.type(line, "string");
		
		var raw = line.split(" ");
		var token = [];
		
		while(raw.length) {
			var args = raw.shift();
			if (args != "") token.push(args.trim());
		}
		return token;
	};
	
	return proto;
})();

repl.Interpreter = function(parser) {
	events.EventEmitter.apply(this);
	
	this._parser = null;
	
	if (parser !== undefined) this.updateParser(parser);
};
repl.Interpreter.prototype = (function() {
	var proto = events.EventEmitter.clone();
	
	proto.run = function() {
		assert.or(this._parser !== null);
		
		this.emit("begin");
		
		this._interprete();
	};
	
	proto.updateParser = function(parser) {
		assert.instance(parser, "repl.TokenParser");
		
		this._parser = parser;
	};
	
	proto.addRule = function(rule, fn) {
		assert.type(rule, "string");
		assert.type(fn, "function");
		
		var that = this;
		this.on(rule, function() {
			return fn.call(that, arguments);
		});
	};
	
	proto.execute = function(token, async) {
		if (!this.listeners(token[0])) {
			throw repl.IllegalTokenError(token[0]);
		}
		if (async) this.emitSync.apply(this, token);
		else this.emit.apply(this, token);
	};
	
	proto._interprete = function() {
		var token = null, that = this, fx = arguments.callee;
	
		while (true) {
			token = that._parser.nextToken();
			if (token === null) return that.emit("end");
			
			assert.or(0 < token.length);
			
			that.execute(token);
			return setTimeout(function() {
				fx.call(that);
			}, 20);
		}
	};
	
	return	 proto;
})();

repl.Error = function(state) {
	return Error("REPL: "+state);
};
repl.IllegalTokenError = function(fnName) {
	return repl.Error("function not found '" + fnName + "'.");
};
repl.ArgumentsError = function(state) {
	return repl.Error("invaild arguments '" + state + "'.");
};	
