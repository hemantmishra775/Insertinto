const path = require('path');
const {Client} = require('pg');
// const { Client } = require('pg-promise/typescript/pg-subset');

const express = require('express');
const e = require('express');


function Runonotherdb(querstring,dbname,host,port,username,password){
    return new Promise(
        async function(resolve,reject){
            const client = new Client({
                user: username,
                password: password,
                host: host,
                database: dbname,
                port: port,
            });
            client.connect(err=>{
                if(err){
                    console.log("error in database connection");
                }
                else
                {
                    console.log("connected to the database.");
                }
            })
        client.query(querstring,function onresult(err,result){
            client.end();
            if(err)
            {
                return reject(err);
            }  
            else{
                if(result)
                {
                    return resolve(result);
                }
                else
                {
                    return resolve(result);
                }
            }          
        })
    })
} 

// const connection = function(user,password,host,port,database){

//     console.log("inside quesries");
//     console.log(user,password,host,port,database);
//     const client = new Client({
//         user: user,
//         password: password,
//         host: host,
//         database: database,
//         port: port,
//     })
//     client.connect(function(err) {
//         const res=client.query('select * from road_centerlines');
//         console.log(res);
//         if (err) throw err;
//         console.log("Connected!");
//     });
// }
  

module.exports =
{
    // connection : connection,
    Runonotherdb :Runonotherdb
}

