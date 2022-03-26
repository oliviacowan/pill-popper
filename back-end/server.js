require('dotenv').config();
//comment

const Express = require('express');
const cors = require('cors');
const app = Express();
const axios = require('axios');

const BodyParser = require('body-parser');
const sassMiddleware = require("./lib/sass-middlewear");
const PORT = process.env.PORT || 8081;

const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');

const { Pool, Query } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

const childrenRoutes = require('./routes/children');
const medRoutes = require('./routes/medications');
const userRoutes = require('./routes/users');
//const { application } = require('express');

const socketServer = require("./socketServer/socketServer");
app.use(cors())

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


const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
      }
    });

io.on('connection', (socket) => {
  console.log('user has connected');
  socket.on('data', (arg) => { 
    const resObj = {};
    axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${arg}"&limit=2`)
    .then((res) => {
      if (res.data.results){
        res.data.results.forEach(result => {
          console.log('Generic');
          resObj[result.id] = result.openfda.generic_name 
        })
      } else {
        axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${arg}"&limit=2`)
        .then((res) => {
          if (res.data.results){
            res.data.results.forEach(result => {
              console.log('Brand');
              resObj[result.id] = result.openfda.brand_name 
            })
          }
        })
      }
      console.log(resObj)

      //axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${arg}"&limit=5`)
    })
    //.then((res) => console.log('Axios response 2: ') )
    .catch(() => { console.log("ERRROOOOORRR!") });
   });
})

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`)
})

// const httpServer = app.listen(PORT, "0.0.0.0", () => {
//   // eslint-disable-next-line no-console
//   console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
// });

// // const { Server } = require("socket.io");
// // const io = new Server((8082, {
// //     cors: {
// //       origin: "http://localhost:3000",
// //       methods: ['GET']
// //     }
// //   }));
// // io.on('connection', (socket) => {
// //   socket.emit("Hello")
// //   socket.on('howdy', (arg) => {
// //     console.log(arg)
// //   });
// // } );
// socketServer.listen(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ['GET']
//   }
// });