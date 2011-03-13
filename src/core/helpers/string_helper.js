/**
 * string_helper.js
 */
var string_helper = {
	version: "0.1"
};

/**
 * String trim method (for IE)
 */
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}
