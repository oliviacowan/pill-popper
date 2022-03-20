const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;

const { Pool, Query } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const childrenRoutes = require('./routes/children');
const medRoutes = require('./routes/medications')
const { application } = require('express');



// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// data base routes
app.use('users/:id/children', childrenRoutes(db));
app.use('users/children/:id/medication', medRoutes(db));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});