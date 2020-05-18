const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Data = mongoose.model('Data', DataSchema);