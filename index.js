const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const apiRoutes = require('./api-routes');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/restnode');
const db = mongoose.connection;


const port = process.env.PORT || 8080;

app.get('/', (req,res) => res.send('Hello World!'))
app.use('/api', apiRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    let errmessage
    if (err.status == 400) {
        errmessage = "Requête incorrecte";
    }else{
        errmessage = err.message;
    }
    res.json({
      error: {
        message: errmessage
      }
    });
  });

app.listen(port, function(){
    console.log("Running restnode on port" + port);
});
