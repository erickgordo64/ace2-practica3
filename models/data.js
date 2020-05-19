const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ts = Date.now();

let date_ob = new Date(ts);
let day=date_ob.getDate();

const DataSchema = new Schema({
    arriba:{
        type:Number
    },
    abajo: {
        type: Number
    },
    derecha: {
        type: Number
    },
    izquierda: {
        type: Number
    },
    punteo:{
        type: Number
    },
    estado:{
        type: Number
    },
    jugada:{
        type: Number
    },
    enemigos:{
        type: Number
    },
    timepo:{
        type: Number
    },
    date: {
        type: String,
        default: day
    }

});

module.exports = Data = mongoose.model('Data', DataSchema);