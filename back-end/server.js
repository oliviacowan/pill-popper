require('dotenv').config();
//comment

const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const sassMiddleware = require("./lib/sass-middlewear");
const PORT = process.env.PORT || 8080;

const { Pool, Query } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

const childrenRoutes = require('./routes/children');
const medRoutes = require('./routes/medications');
const userRoutes = require('./routes/users');
const { application } = require('express');


app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

//app.use(express.static("public"));


// Express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(Express.static('public'));

// data base routes
app.use('/users/', childrenRoutes(db));
app.use('/medications/', medRoutes(db));
app.use('/users/', userRoutes(db));

app.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});