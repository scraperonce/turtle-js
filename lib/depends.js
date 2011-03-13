/**
 * depends.js
 */

window.depends = (function() {
	
	var path = "./";
	
	var XMLHttp = XMLHttpRequest;
	
	var createRequest = function(src) {
		var xmlhttp = new XMLHttp();
		xmlhttp.open("get", src, false);
		xmlhttp.send(null);
		if (xmlhttp.status == 200) {
			return xmlhttp;
		} else {
			throw Error("connection failure: '".src);
		}
	};
	
	var reformUrl = function(src) {
		return path + src + ".js";
	}
	
	var available = function(ns) {
		var result = null;
		try { result = eval(ns); } catch(e) {};
		
		if (result === null || typeof result !== "function" && typeof result !== "object") {
			return false;
		} else return true;
	};
	
	var exports = function(src, ns) {
		var paths = src.split("/");
		if (!ns) ns = paths.pop();
		if (!src) throw Error("require fail: missing source path.");
		if (available(ns)) return;
		
		var origin = path;
		if (paths.length) path = path + paths.join("/") + "/";
		var http = createRequest(reformUrl(ns));
		var module = eval.call(null, http.responseText);
		path = origin;
		return module;
	};
	
	exports.path = function(libdir) {
		path = libdir + (/\/$/.test(libdir) ? "" : "/");
	};
	
	return exports;
})();
