const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const roomSchema = new Schema
({
    roomName: String,
    currentTemperature: Number,
    /*averageTemperature: number;
  sensorStatus: boolean;
  sensorIP: number;
  */

});
roomSchema.plugin(timestamp);
//create model from the schema and export
module.exports = mongoose.model('room', roomSchema);