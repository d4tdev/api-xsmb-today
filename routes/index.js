const routeV1 = require('./v1/index');

const routes = app => {
   app.use('/v1', routeV1);
};

module.exports = routes;
