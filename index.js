var app = require('express')();
var http = require('http').Server(app);
// var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var cors = require('cors');
app.use(cors())
require('dotenv').config();
const connectDB = require('./db');
connectDB()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const entityRoutes = require('./routes/user.controller')
const timeSheetRoutes = require('./routes/timesheet.controller')

app.use('/api', entityRoutes);
app.use('/api', timeSheetRoutes);

const port = process.env.PORT || 6000
http.listen(port, function () {
  console.log('listening on localhost:5000',port);
});

