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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
  'mongodb://mongoo:27017/practica31',
  { useNewUrlParser: true }
);


app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/tope', (req, res) => {
  Data.find({ estado: 0 }).sort({ $natural: -1 })
    .exec((err, data) => res.status(200).json(data.shift()));
});


app.post('/jugadatope', (req, res) => {
  const jug = req.body;
  var d = Data.findOne({ jugada: jug.juga }).sort({ $natural: -1 })
    .exec((err, data) => res.status(200).json(data));
});

app.post('/jugada', (req, res) => {
  const jug = req.body;
  var d = Data.find({ jugada: jug.juga })
    .exec((err, data) => res.status(200).json(data));
});


app.post('/fecha', (req, res) => {
  const da = req.body;
  var d = Data.find(
    {
      $and:
        [
          { date: da.dia },
          { estado: 1 }
        ]
    })
    .exec((err, data) => res.status(200).json(data));
});

app.get('/data', (req, res) => {
  Data.find({}).sort({ $natural: -1 })
    .exec((err, data) => res.status(200).json(data));
});

app.post("/datos", function (req, res) {
  const dat = req.body;
  datos = dat;
});

app.post("/dataj", function (req, res) {
  const data = req.body;

  const newData = new Data({
    arriba: data.arriba,
    abajo: data.abajo,
    derecha: data.derecha,
    izquierda: data.izquierda,
    punteo: data.punteo,
    estado: data.estado,
    jugada: data.jugada,
    enemigos: data.enemigos,
    tiempo: data.tiempo
  })

  newData.save().then((err, data) => {
    if (err)
      return console.log(err);
    else
      return res.send("exito");
  })
  return res.send("exito");
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
    estado: tmp[5],
    jugada: tmp[6],
    enemigos: tmp[7],
    tiempo: tmp[8]
  })

  newData.save().then((err, data) => {
    if (err) return console.log(err);
    else
      return res.send("exito");
  })
  return res.send("exito");
});


server.listen(port, () => console.log(`Listening on port ${port}`));