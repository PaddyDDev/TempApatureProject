const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

/*
*
* ATTEMPTED TO NEST SCHEMAS WITHIN SCHEMAS
*
* */
/*const roomTempSchema = new Schema
({
    timestamp: {type: Date, default: Date.now()},
    reading: Number

});*/
const tempSchema = new Schema
({
    //sensor: String

    sensor: String,
    //reading: [tempSchema],
    //dateTime: Date,
    //room: Date.UTC
    //room: [roomTempSchema]
        //{
            //temperature:[{temp: Number, date: Date}]

            //temperature: Array
            temperature: [{timestamp: Date, reading: Number, default: 0}]
           /* temperature: [{

                timer1: Number,
                timer2: Number,
                timer3: Number,
                timer4: Number,
                timer5: Number,
                timer6: Number,
                timer7: Number,
                timer8: Number,
                timer9: Number,
                timer10: Number,
                timer11: Number,
                timer12: Number

            }]*/

      //  }


    /*
        temperature: [{reading: Number, date: Date}],
    */
    //updated: {type: Date, default: Date.now},
    //time: String
});
tempSchema.plugin(timestamp);
/*
module.exports = mongoose.model('temperature', tempSchema, 'temperatures');*/

module.exports = mongoose.model('temperature', tempSchema);