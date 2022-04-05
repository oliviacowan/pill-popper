require('dotenv').config();
const Pusher = require("pusher");
const cron = require('node-cron');
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
const { Server } = require('socket.io');

const { Pool, Query } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

const childrenRoutes = require('./routes/children');
const medRoutes = require('./routes/medications');
const userRoutes = require('./routes/users');
const fdaRoutes = require('./routes/fda');
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
app.use('/fda/', fdaRoutes(db));

// TWILIO 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.PHONE_NUMBER;
const fromPhoneNumber = process.env.FROM_PHONE_NUMBER;

// To enable TWILIO - uncomment the next line out
// const client = require('twilio')(accountSid, authToken);


//Pusher
const pusherAppId = process.env.APP_ID;
const pusherKey = process.env.KEY;
const pusherSectet = process.env.SECRET;


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  }
});

// io.on('connection', (socket) => {
//   console.log('user has connected');
//   socket.on('data', (arg) => {
//     const resObj = {};
//     axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${arg}"&limit=2`)
//       .then((res) => {
//         if (res.data.results) {
//           res.data.results.forEach(result => {
//             console.log('Generic');
//             resObj[result.id] = result.openfda.generic_name
//           })
//           socket.emit('search-data', resObj);
//         } else {
//           axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${arg}"&limit=2`)
//             .then((res) => {
//               if (res.data.results) {
//                 res.data.results.forEach(result => {
//                   console.log('Brand');
//                   resObj[result.id] = result.openfda.brand_name
//                 })
//                 socket.emit('search-data', resObj);
//               }
//             })
//         }
//         console.log(resObj)

//         //axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${arg}"&limit=5`)
//       })
//       //.then((res) => console.log('Axios response 2: ') )
//       .catch(() => { console.log("ERRROOOOORRR!") });
//   });
// })

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`)
})


const pusher = new Pusher({
  appId: pusherAppId,
  key: pusherKey,
  secret: pusherSectet,
  cluster: "us3",
  useTLS: true
});

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i
  }
  return i;
}

cron.schedule('* * * * *', () => {
  const times = db.query(
    `SELECT children.name AS child_name, children.id AS child_id,
      childrens_medications.*,
      times.time AS time 
      FROM childrens_medications
      JOIN Children
      ON children.id = child_id
      JOIN users
      ON users.id = user_id
      JOIN times
      ON childrens_medications.id = childrens_medications_id
      ORDER BY time;`
  )

  times.then((response) => {

    const children = response.rows
    const day = new Date()
    const startTime = (addZero(day.getHours())) + ":" + (addZero(day.getMinutes()));
    let i = 0

    for (let child of children) {
      if (child.time == startTime && i == 0) {
        i++
        pusher.trigger("my-channel", "my-event", {
          message: `${child.child_name}, please take ${child.name} - ${child.dose} mg. ${child.with_food ? "With food." : ""}`
        });

       
          
        if (child.text_message) {
          client.messages
          .create({
            body: `${child.child_name}, please take ${child.name} - ${child.dose} mg. ${child.with_food ? "With food." : ""}`,
            from: fromPhoneNumber,
            to: phoneNumber,
          })
        }
        
      }
    }
  })
    .catch(err => console.log('There has been an ERROR: ', err));
})


