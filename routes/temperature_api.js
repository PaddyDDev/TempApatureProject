/*
*
* NOT IN USE AS INVOLVED NESTED ROUTER MODULES FROM EXPRESS
*
*
* */


/*
const express = require('express');
const jwt = require('jsonwebtoken');
const router2 = express.Router();
//const User = require('../models/user');
const Temp = require('../models/temperature');

//CONNECT to the database
const mongoose = require('mongoose');

mongoose.Promise = Promise;
const db = "mongodb://test:test@ds011472.mlab.com:11472/temp_sense_db";
/!*
const db = 'mongodb://localhost:27017/temperaturedatabasetest';
*!/
mongoose.connect(db, err =>
{
    if(err)
    {
        console.error(err)
    }
    else
    {
        console.log('Connected to mongoDB TEMPDB '+db)
    }
});
//HANDLE POSTS TO TEMP ROUTE
router2.post('/temperature', function (req, res)
{
    let tempData = req.body;
    let temp = new Temp(tempData);
    temp.save(function (error, registeredTemperature)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            res.status(200).send(req.body);
            console.log("temp worked "+registeredTemperature);
        }
    });

});
//HANDLE GET TEMPERATURE ROUTE
router2.get('/temperature', function (req, res)
{
    console.log("Get request for all temperatures");
    //Temp.find({}).sort({dateTime: -1}).exec(function(err, temperatures)
    Temp.find({}).exec(function (err, temperatures)
    {
        if (err)
        {
            console.log("Error retrieving temperatures");
            return res.status(422).send("Not possible to get temperatures");
        }
        else
        {
            //res.send(temperatures);
            res.json(temperatures);

            //return the array as a response
            //res.json(newTemp);
            //JSON.parse(temper);
            /!*
                res.json(temper.room);
            *!/

            //res.json(temper.getElementById("temperature"));


            //res.json(temper);
        }

    });
});
module.exports = router2;*/
