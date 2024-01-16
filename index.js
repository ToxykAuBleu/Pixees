var liveServer = require("live-server");

var params = {
	port: 8181,
	host: "0.0.0.0",
	open: true,
	wait: 1000,
	logLevel: 2,
};
liveServer.start(params);