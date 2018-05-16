const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
/*
CORS allows for cross origin resource sharing
thus the 3000 port and 4200 port will correspond
*/
const cors = require('cors');

//specify use of api route
const api = require('./routes/api');
const temp_api = require('./routes/temperature_api');

//create const for PORT number
const PORT = 3000;

//create instance of express
const app = express();
//CORS middleware
app.use(cors());

app.use(express.static(path.join(__dirname, '../dist')));

//specify urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//specify the body parser to handle the json data
app.use(bodyParser.json());

/*
* ATTEMPTED TO NEST TEMPERATURE ROUTE WITHIN API ROUTE
* CAN BE DONE BUT IS DIFFICULT
* */
//app.use('/temperature', temp_api);

//make sure api route comes before the get request
app.use('/api', api);
app.get('/', function (req, res)
{
    res.send('Server is running');
});

app.get('*', function (req, res)
{
    //res.send('Server is running');
    res.sendFile(path.join(__dirname,'../ngApp/src/app/home/home.component.html'));
    console.log('redirect to angular');
});

//port to listen to
app.listen(PORT, function ()
{
    console.log('Server running on ' + PORT);
});
