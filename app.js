//setup routes to start w/ the `#` symbol
m.route.mode = 'hash';

//define a route
m.route(document.body, '/', {
    '/': homeModule(),
    '/weather': weatherModule()
});
function homeController() {
	this.message = "Home page";
}
function homeModule() {
	var module = {};
	module.controller = homeController;
	module.view = homeView;

	return module;
}
function homeView(ctrl2) {
	console.log(ctrl2);
	return m("div", "ctrl.message");
}

function weatherController(){
	this.torontoInfo = "Weatherssssss";

}
function weatherModule() {
	var module = {};
	module.controller = weatherController;
	module.view = weatherView;

	return module;
}
function getWeather(){
	var torontoTemp = m.request({method: "GET", url: "http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca"});

	return torontoTemp;
}
function weatherView(ctrl){
	return m('div.weather', ctrl.torontoInfo);
}