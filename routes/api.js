const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Temp = require('../models/temperature');
const Room = require('../models/room');

//CONNECT to the database
const mongoose = require('mongoose');

mongoose.Promise = Promise;
const db = "mongodb://test:test@ds011472.mlab.com:11472/temp_sense_db";
/*
const db = 'mongodb://localhost:27017/temperaturedatabasetest';
*/
mongoose.connect(db, err =>
{
    if(err)
    {
        console.error(err)
    }
    else
    {
        console.log('Connected to mongoDB USERDB '+db)
    }
});
// MIDDLEWARE
// Verify the web token (assigned in angular) on the backend.
// By creating a function to handle it
function verifyToken(req, res, next){
    if(!req.headers.authorized) {
        console.log('Bad request');
        return res.status(401).send('Unauthorised request!');
    }
    let token = req.headers.authorized.split(' ')[1];
    if(token === 'null'){
        console.log('Bad request');
        return res.status(401).send('Unauthorised request!');
    }
    let payload = jwt.verify(token, 'secret');
    if(!payload){
        console.log('Bad request');
        return res.status(401).send('Unauthorised request!');
    }
    req.username = payload.subject;
    next();
}


//handel GET request, initially used for testing route
router.get('/', function (req, res)
{
    res.send('API route');
});
//HANDLE REGISTRATION
router.post('/register', function (req, res)
{
    let userData = (req.body);
    //(req.body.name || req.body.email || req.body.username || req.body.password);

    let user = new User(userData);
    if(req.body.isAdmin === 'admin'){user.isAdmin = true}
    user.save(function (error, registeredUser)
    {
        if(error)
        {

            console.log(error);
        }
        else
        {
            let payload = {subject: registeredUser._id};
            // jwt.sign creates a new token in the back end.
            //this is then sent to the front end with the payload and the secret jey
            // This token is sent back and forward between the client and server to validate request

            let token = jwt.sign(payload, 'secret');
            res.status(200).send({token});

            //res.send(registeredUser);
            console.log('NEW USER REGISTERED ON THE BACKEND ' + req.body.username);
            console.log(user);
        }
    });
});

//ADMIN REQUEST FOR ALL USERS
router.get('/users', function (req, res)
{
    console.log('Admin request. Find all users');

    User.find({}).exec(function (err, users)
    {
         if(err)
         {
             console.log('Error. Could not find all users: Error:');
         }else
             {
                 console.log('All users requested and returned');
                 //res.json.toString(users);
                 res.json(users);
             }

    })
});

//ADMIN REQUEST FOR SPECIFIC USER
router.get('/users/:id', function (req, res)
{
    console.log("Admin request for a user by ID.");
    User.findById(req.params.id).exec(function (err, user)
    {
        if(err)
        {
            console.log("Error retrieving User: ERROR:" +err);
        }
        else
        {
            res.json(user);
        }
    });
});

// GET ROOMS FOR LOGGED IN USER
router.get('/rooms', function (req, res)
{
    console.log('Request to find rooms subscribed');

    Room.find({}).exec(function (err, users)
    {
        if(err)
        {
            console.log('Error. Could not find Rooms: Error:');
        }else
        {
            console.log('All Rooms requested and returned');
            //res.json.toString(users);
            res.json(users);
        }

    })
});
router.post('/roomsRegister', function (req, res)
{
    console.log('Registering room');

    /*
    let registeredUser = User();
    registeredUser.usename= req.body.username;
    POSSIBLE TO PASS IN CREATED USER AS AN ARGUMENT???
    */

    //let room = new Room();
    let roomData = req.body;
    let room = new Room(roomData);
    /*roomData.name = req.body.roomName;
    roomData.temperature = req.body.currentTemperature;*/
    room.save(function (err, createRoom)
    {
        if (err)
        {
            console.log('Could not do IT')
        }
        else
        {
            console.log('Following room registered: ' + createRoom);
            res.json(createRoom);
        }
    });
});
/*router.post('/registerRoom', function (req, res)
{
    console.log('Registering room');

    /!*
    let registeredUser = User();
    registeredUser.usename= req.body.username;
    POSSIBLE TO PASS IN CREATED USER AS AN ARGUMENT???
    *!/

    let roomData = new Temp();
    roomData.sensor = req.body.sensor;
    roomData.temperature = req.body.temperature;
    roomData.save(function (err, createRoom)
    {
        if(err)
        {
            console.log('Could not do IT')
        }
        else
            {
                console.log('Following room registered: '+createRoom);
               res.json(createRoom);
            }
    });

    /!*let room = new Temp(roomData);
    user.save(function (error, registeredUser)
    {
        if(error)
        {

            console.log(error);
        }
        else
        {
            let payload = {subject: registeredUser._id};
            let token = jwt.sign(payload, 'secret');
            res.status(200).send({token});
            console.log('NEW USER REGISTERED ON THE BACKEND ' + req.body.username);
            console.log(user.createdAt);
        }
    });*!/
});*/

/*router.post('/temperature', function (req, res)
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

});*/

//HANDLE LOGIN
router.post('/login', function (req, res)
{
    let userData = req.body;

    User.findOne({username: userData.username}, function (error, user)
    {
        if(error)
        {
            res.status(401).send('User not found');
            console.log(error);
        }
        else
        {
            if(!user)
            {
                res.status(401).send('username not a valid one');
            }
            else
            if(user.password !== userData.password)
            {
                res.status(401).send('Password not valid!');
            }
            else
            {
                console.log('USER LOGGED IN ' + req.body.username);

                let payload ={subject: user._id};
                let token = jwt.sign(payload, 'secret');
                res.status(200).send({token});
            }
        }
    });

});

//HANDLE POSTS TO TEMP ROUTE
router.post('/temperature', function (req, res)
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

router.get('/dashboard', verifyToken, (req, res) =>{
   let temperatures = [
       {"id":1,"room":"Begoniaceae","temp":16,"status":true,"date":{"$date":"2018-04-11T13:22:24.000Z"},"ip_address":"242.110.129.225"},
       {"id":2,"room":"Asteraceae","temp":32,"status":false,"date":{"$date":"2018-04-07T02:29:07.000Z"},"ip_address":"70.207.18.231"},
       {"id":3,"room":"Brassicaceae","temp":27,"status":true,"date":{"$date":"2018-04-06T03:48:45.000Z"},"ip_address":"31.132.95.42"},
       {"id":4,"room":"Fabaceae","temp":28,"status":false,"date":{"$date":"2018-04-07T07:40:11.000Z"},"ip_address":"228.26.64.29"},
       {"id":5,"room":"Cyperaceae","temp":34,"status":false,"date":{"$date":"2018-04-06T06:00:59.000Z"},"ip_address":"241.63.115.46"},
       {"id":6,"room":"Chenopodiaceae","temp":36,"status":false,"date":{"$date":"2018-04-06T03:21:27.000Z"},"ip_address":"147.92.205.140"},
       {"id":7,"room":"Hippocastanaceae","temp":16,"status":false,"date":{"$date":"2018-04-04T05:47:42.000Z"},"ip_address":"107.255.31.188"},
       {"id":8,"room":"Asteraceae","temp":23,"status":true,"date":{"$date":"2018-04-10T13:26:05.000Z"},"ip_address":"186.20.151.57"},
       {"id":9,"room":"Liliaceae","temp":15,"status":true,"date":{"$date":"2018-04-09T16:01:06.000Z"},"ip_address":"133.196.208.191"},
       {"id":10,"room":"Poaceae","temp":38,"status":false,"date":{"$date":"2018-04-12T19:52:35.000Z"},"ip_address":"3.148.77.226"},
       {"id":11,"room":"Heliconiaceae","temp":16,"status":true,"date":{"$date":"2018-04-10T00:35:19.000Z"},"ip_address":"250.117.119.91"},
       {"id":12,"room":"Scrophulariaceae","temp":38,"status":false,"date":{"$date":"2018-04-08T05:29:21.000Z"},"ip_address":"99.91.150.217"},
       {"id":13,"room":"Brassicaceae","temp":17,"status":false,"date":{"$date":"2018-04-10T05:49:26.000Z"},"ip_address":"70.170.244.114"},
       {"id":14,"room":"Asteraceae","temp":37,"status":false,"date":{"$date":"2018-04-04T02:19:08.000Z"},"ip_address":"56.7.76.37"},
       {"id":15,"room":"Parmeliaceae","temp":23,"status":false,"date":{"$date":"2018-04-07T14:48:25.000Z"},"ip_address":"32.46.10.34"},
       {"id":16,"room":"Salicaceae","temp":36,"status":true,"date":{"$date":"2018-04-11T15:43:41.000Z"},"ip_address":"117.27.98.253"},
       {"id":17,"room":"Uncertain Ascomycota Family","temp":17,"status":false,"date":{"$date":"2018-04-11T22:05:39.000Z"},"ip_address":"125.205.215.142"},
       {"id":18,"room":"Amblystegiaceae","temp":17,"status":true,"date":{"$date":"2018-04-09T10:07:54.000Z"},"ip_address":"130.48.66.121"},
       {"id":19,"room":"Apiaceae","temp":20,"status":true,"date":{"$date":"2018-04-04T17:32:20.000Z"},"ip_address":"64.88.120.129"},
       {"id":20,"room":"Myrtaceae","temp":36,"status":false,"date":{"$date":"2018-04-11T01:52:03.000Z"},"ip_address":"4.71.59.49"},
       {"id":21,"room":"Fabaceae","temp":21,"status":false,"date":{"$date":"2018-04-07T16:46:16.000Z"},"ip_address":"34.235.130.63"},
       {"id":22,"room":"Apiaceae","temp":40,"status":true,"date":{"$date":"2018-04-06T05:52:29.000Z"},"ip_address":"106.51.70.195"},
       {"id":23,"room":"Linaceae","temp":22,"status":false,"date":{"$date":"2018-04-05T20:22:13.000Z"},"ip_address":"212.53.145.201"},
       {"id":24,"room":"Betulaceae","temp":15,"status":true,"date":{"$date":"2018-04-06T20:26:52.000Z"},"ip_address":"179.242.32.239"},
       {"id":25,"room":"Lamiaceae","temp":33,"status":true,"date":{"$date":"2018-04-11T02:14:50.000Z"},"ip_address":"147.32.124.122"},
       {"id":26,"room":"Cyperaceae","temp":15,"status":false,"date":{"$date":"2018-04-11T07:39:48.000Z"},"ip_address":"208.86.184.20"},
       {"id":27,"room":"Chenopodiaceae","temp":37,"status":false,"date":{"$date":"2018-04-10T18:46:26.000Z"},"ip_address":"195.188.127.152"},
       {"id":28,"room":"Asteraceae","temp":18,"status":true,"date":{"$date":"2018-04-05T17:27:14.000Z"},"ip_address":"1.9.27.61"},
       {"id":29,"room":"Loasaceae","temp":20,"status":false,"date":{"$date":"2018-04-11T22:09:37.000Z"},"ip_address":"236.128.48.215"},
       {"id":30,"room":"Bignoniaceae","temp":28,"status":true,"date":{"$date":"2018-04-09T17:30:30.000Z"},"ip_address":"194.67.99.57"},
       {"id":31,"room":"Peltulaceae","temp":16,"status":true,"date":{"$date":"2018-04-04T11:03:27.000Z"},"ip_address":"119.12.253.52"},
       {"id":32,"room":"Entodontaceae","temp":37,"status":false,"date":{"$date":"2018-04-12T04:27:06.000Z"},"ip_address":"71.225.212.182"},
       {"id":33,"room":"Loasaceae","temp":15,"status":false,"date":{"$date":"2018-04-04T00:47:45.000Z"},"ip_address":"8.60.106.83"},
       {"id":34,"room":"Campanulaceae","temp":32,"status":false,"date":{"$date":"2018-04-04T14:52:10.000Z"},"ip_address":"199.255.176.79"},
       {"id":35,"room":"Fabaceae","temp":22,"status":true,"date":{"$date":"2018-04-12T06:41:26.000Z"},"ip_address":"55.23.139.179"},
       {"id":36,"room":"Euphorbiaceae","temp":23,"status":true,"date":{"$date":"2018-04-05T19:07:00.000Z"},"ip_address":"176.185.204.37"},
       {"id":37,"room":"Verrucariaceae","temp":33,"status":false,"date":{"$date":"2018-04-10T02:15:09.000Z"},"ip_address":"216.53.65.113"},
       {"id":38,"room":"Fabaceae","temp":25,"status":true,"date":{"$date":"2018-04-12T18:03:23.000Z"},"ip_address":"9.145.69.254"},
       {"id":39,"room":"Poaceae","temp":16,"status":true,"date":{"$date":"2018-04-09T13:55:04.000Z"},"ip_address":"205.190.15.3"},
       {"id":40,"room":"Myrtaceae","temp":35,"status":false,"date":{"$date":"2018-04-08T01:11:24.000Z"},"ip_address":"1.5.216.20"},
       {"id":41,"room":"Rubiaceae","temp":36,"status":true,"date":{"$date":"2018-04-10T12:39:44.000Z"},"ip_address":"81.15.215.197"},
       {"id":42,"room":"Brassicaceae","temp":20,"status":false,"date":{"$date":"2018-04-12T05:01:02.000Z"},"ip_address":"212.196.129.41"},
       {"id":43,"room":"Scrophulariaceae","temp":35,"status":false,"date":{"$date":"2018-04-07T18:13:27.000Z"},"ip_address":"135.253.5.88"},
       {"id":44,"room":"Dryopteridaceae","temp":40,"status":false,"date":{"$date":"2018-04-08T03:29:52.000Z"},"ip_address":"50.182.199.87"},
       {"id":45,"room":"Juncaceae","temp":37,"status":true,"date":{"$date":"2018-04-12T18:32:19.000Z"},"ip_address":"125.175.163.37"},
       {"id":46,"room":"Malvaceae","temp":26,"status":false,"date":{"$date":"2018-04-04T08:17:58.000Z"},"ip_address":"229.73.238.170"},
       {"id":47,"room":"Asteraceae","temp":19,"status":true,"date":{"$date":"2018-04-11T15:53:50.000Z"},"ip_address":"113.78.233.150"},
       {"id":48,"room":"Polygalaceae","temp":34,"status":true,"date":{"$date":"2018-04-10T14:23:05.000Z"},"ip_address":"75.184.248.108"},
       {"id":49,"room":"Thelotremataceae","temp":37,"status":true,"date":{"$date":"2018-04-09T21:07:32.000Z"},"ip_address":"55.63.18.223"},
       {"id":50,"room":"Sapotaceae","temp":40,"status":true,"date":{"$date":"2018-04-11T13:33:38.000Z"},"ip_address":"32.173.220.62"},
       {"id":51,"room":"Loasaceae","temp":21,"status":false,"date":{"$date":"2018-04-05T13:01:17.000Z"},"ip_address":"254.133.220.42"},
       {"id":52,"room":"Rosaceae","temp":16,"status":true,"date":{"$date":"2018-04-09T16:22:30.000Z"},"ip_address":"9.121.217.161"},
       {"id":53,"room":"Lecideaceae","temp":34,"status":true,"date":{"$date":"2018-04-04T11:20:57.000Z"},"ip_address":"103.151.57.145"},
       {"id":54,"room":"Onagraceae","temp":31,"status":true,"date":{"$date":"2018-04-07T01:37:33.000Z"},"ip_address":"51.244.156.250"},
       {"id":55,"room":"Cactaceae","temp":19,"status":false,"date":{"$date":"2018-04-09T22:48:44.000Z"},"ip_address":"77.96.243.167"},
       {"id":56,"room":"Clavariaceae","temp":36,"status":false,"date":{"$date":"2018-04-12T13:14:59.000Z"},"ip_address":"213.0.45.148"},
       {"id":57,"room":"Fabaceae","temp":21,"status":true,"date":{"$date":"2018-04-12T09:13:33.000Z"},"ip_address":"140.63.51.135"},
       {"id":58,"room":"Araliaceae","temp":28,"status":false,"date":{"$date":"2018-04-07T01:08:17.000Z"},"ip_address":"90.87.56.238"},
       {"id":59,"room":"Cucurbitaceae","temp":19,"status":true,"date":{"$date":"2018-04-08T05:16:02.000Z"},"ip_address":"91.170.99.118"},
       {"id":60,"room":"Caryophyllaceae","temp":17,"status":true,"date":{"$date":"2018-04-09T03:11:09.000Z"},"ip_address":"198.54.187.102"},
       {"id":61,"room":"Asteraceae","temp":35,"status":false,"date":{"$date":"2018-04-11T23:56:37.000Z"},"ip_address":"103.7.252.190"},
       {"id":62,"room":"Lycopodiaceae","temp":37,"status":false,"date":{"$date":"2018-04-04T00:10:57.000Z"},"ip_address":"105.173.88.223"},
       {"id":63,"room":"Asteraceae","temp":17,"status":true,"date":{"$date":"2018-04-12T19:43:23.000Z"},"ip_address":"40.115.234.40"},
       {"id":64,"room":"Liliaceae","temp":37,"status":false,"date":{"$date":"2018-04-08T21:00:59.000Z"},"ip_address":"236.110.54.51"}

   ];
   res.json(temperatures)
});
//HANDLE GET TEMPERATURE ROUTE
router.get('/temperature', function (req, res)
{
    console.log("Get request for all temperatures");
    Temp.find({}).exec(function (err, temperatures)
    {
        if (err)
        {
            console.log("Error retrieving temperatures");
        }
        else
        {
            console.log("Temperatures Returned");
            //res.send(temperatures);
            res.json(temperatures);

            //return the array as a response
            //res.json(newTemp);
            //JSON.parse(temper);
            /*
                res.json(temper.room);
            */

            //res.json(temper.getElementById("temperature"));


            //res.json(temper);
        }
    });
});

/*router.get('/temper/:id', function (req, res)
{
    console.log("Get request for a single room");
    Temp.findById(req.params.id).exec(function (err, temperature)
    {
        if(err)
        {
            console.log("Error retrieving temperature");
        }
        else
        {
            res.json(temperature);
        }
    });
});*/

module.exports = router;