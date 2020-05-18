const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');

const port = process.env.PORT || 80;
const index = require("./routes/index");
const Data = require('./models/data.js');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.text());
app.use(index);

const server = http.createServer(app);
/*********************************************************************************************** */
const io = socketIo(server); // < Interesting!

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

/******************************************************************************************** */

var datos

mongoose.connect(
  'mongodb://mongoo:27017/practica3',
  { useNewUrlParser: true }
);


app.get('/ping', function (req, res) {
    return res.send('pong');
   });

app.get('/tope', (req,res)=>{
    Data.find({}).sort({date:-1})
        .exec((err, data) => res.status(200).json(data.shift()));
  });

app.get('/data', (req, res) => {
    Data.find({}).sort('date')
        .exec((err, data) => res.status(200).json(data.reverse()));
  });

app.post("/datos", function(req,res){
    const dat=req.body;
    datos=dat;
});

app.post('/data', function (req, res) {
    const data = req.body;
    console.log(data);
  
    let tmp = data.split(',');
    
    const newData = new Data({
      arriba: tmp[0],
      abajo: tmp[1],
      derecha: tmp[2],
      izquierda: tmp[3],
      punteo: tmp[4],
      estado: tmp[5]
    })
  
    newData.save().then((err, data) => {
      if(err) return console.log(err);
      res.status(200).json(data);
    })
  
  });


server.listen(port, () => console.log(`Listening on port ${port}`));