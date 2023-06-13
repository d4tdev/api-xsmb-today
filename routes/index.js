const routeV1 = require('./v1/index');

const routes = app => {
   app.use('/api/v1', routeV1);
};

module.exports = routes;
