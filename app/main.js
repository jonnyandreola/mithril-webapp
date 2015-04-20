//setup routes to start w/ the `#` symbol
m.route.mode = 'hash';

//define a route
m.route(document.body, '/', {
    '/': homeModule(),
    '/weather': weatherModule()
});