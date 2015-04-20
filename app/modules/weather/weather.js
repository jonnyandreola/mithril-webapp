function weatherModule() {
	var module = {};
	module.controller = weatherController;
	module.view = weatherView;

	return module;
}