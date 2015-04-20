function getWeather(){
	var torontoTemp = m.request({method: "GET", url: "http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca"});

	return torontoTemp;
}