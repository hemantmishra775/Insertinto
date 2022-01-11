const path = require('path');
const {Client } = require('pg');


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const create_client = require('./routes_admin/create_client')


app.use(create_client);

app.use('/',(req,res,next)=>{
    res.send("hello world");
})

const server = app.listen(3000,'127.0.0.1',function(){
    // console.log(server.address());
    var host = server.address().address;
    var port = server.address().port;
    console.log(`server is listening on http://${host}:${port}`);
})
