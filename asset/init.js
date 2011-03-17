/**
 * init.js
 */
depends("src/turtle");

window.onload = function() {
	var code = [
		"HELP 10",
		"CODE 102"
	].join("\n");
	window.intp = turtle.run(code);
};

