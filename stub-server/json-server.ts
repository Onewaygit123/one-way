// @ts-ignore

import * as http from 'http';
import * as express from 'express';
import { json } from 'body-parser';
import * as pause from 'connect-pause';
import { argv } from 'yargs';
import * as busboy from 'connect-busboy';
import { loginRoutes } from './path/login';

const cors = require('cors');
const sockjs = require('sockjs');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
// middleware
app.use(json());
app.use(busboy({ immediate: true }));

// setup artificial response delay
if (argv.delay) {
  app.use(pause(argv.delay));
}
app.use(cors());

let connection = {};
// const echo = sockjs.createServer();
// echo.installHandlers(server, { prefix: '/SupportAssist/api/v2/eventbus' });
// echo.on('connection', function (conn) {
//   connection[conn.id] = conn
//   conn.on('data', function (message) {
//     // console.log('app.get custom===', app.get('custom'));
//     if (app.get('custom') == 'adapter') {
//       let val = "{\"type\":\"rec\",\"address\":\"/topic/ui/out/console/status\",\"body\":{\"consoleId\":\"9836846\",\"status\":\"CONNECTED\"}}";
//       conn.write(val);
//       app.set("custom", "")
//     }
//   });
//   conn.on('close', function () {
//   });
// });

//login routes
app.locals['localVariable'] = false;// to create local variable available across json server
loginRoutes(app);


// Start stubs
server.listen(3001, () => console.log('Starting stub server on port 3001'));


