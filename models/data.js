const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ts = Date.now();

let date_ob = new Date(ts);
let day=date_ob.getDay();

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
    date: {
        type: Date,
        default: day
    }

});

module.exports = Data = mongoose.model('Data', DataSchema);