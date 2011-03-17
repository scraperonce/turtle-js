/**
 * assert.js
 */

assert = {
	version: "0.47"
};

(function() {
	var error = function(state, msg) {
		return Error("[assert: "+ state +"] "+msg);
	};
		
	assert.type = function(obj, typeOfName) {
		if (typeof(typeOfName) !== "string")
			throw error("invaild argument", "typename must be string.");
		
		var typeList = typeOfName.toLowerCase().split("|");
		var result = typeof(obj);
		for (var i=0, len=typeList.length, assertList = []; i<len; i++)
			assertList.push(result == typeList[i]);
		
		try {
			assert.or.apply(null, assertList);
		} catch (e) {
			throw error("value type mismatch", "expecting '"+typeOfName.replace("|", "' or '")+"' value, appearing '"+result+"'");
		}
	};
	
	assert.instance = function(obj, classObjName) {
		assert.type(obj, "object");
		
		var classList = classObjName.split("|");
		for (var i=0, len=classList.length, assertList = [], fn; i<len; i++) {
			fn = eval(classList[i]);
			assertList.push(obj instanceof fn);
		}
			
		try {
			assert.or.apply(null, assertList);
		} catch (e) {
			var cons = obj.constructor || "Native object";
			throw error("object class mismatch", "expecting '"+classObjName.replace("|", "' or '")+"' object, appearing '"+cons+"'");
		}
	};
	
	assert.eq = function(a, b) {
		if (a !== b) throw error("not equal", a+" === "+b+" is false.");
	};
	
	assert.or = function() {
		var args = Array.prototype.slice.call(arguments);
		var bool = false;
		for (var i=0, len=args.length; i<len; i++) {
			bool = bool || args[i];
			if (bool) return;
		}
		throw error("OR assert failed");
	};
	
	assert.and = function() {
		var args = Array.prototype.slice.call(arguments);
		for (var i=0, len=args.length; i<len; i++) {
			if (!args[i]) throw error("AND assert failed");
		}
	};
})();

