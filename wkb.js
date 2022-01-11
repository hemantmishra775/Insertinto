const express = require('express');
const app = express()
const {Runondb} = require('../validations/Queries')

var bodyParser = require('body-parser');

const { REPL_MODE_SLOPPY } = require('repl');
// const { Client } = require('pg-promise/typescript/pg-subset');
const router = express.Router();
const {Runonotherdb} = require('../validations/Queries');
const { LOADIPHLPAPI } = require('dns');
const { request } = require('express');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// app.use(require('connect').bodyParser());

const createtable = (params) => {
    return `create table IGiS_RestAPI_practice(ID int not null primary key,email text not null unique,password text,database text not null,token text,ipaddress text not null)`
}

const insertdata = (body) =>{
    var {ID,email,password,database,token,ipaddress} = body;
    return `insert into IGiS_RestAPI_practice values (${ID},'${email}','${password}','${database}','${token}','${ipaddress}')`
} 

const wkb = (params) =>
{
    console.log(`
    Select st_transform(st_MakeEnvelope(arr[1]::double precision,arr[2]::double precision,arr[3]::double precision,arr[4]::
        double precision,4326),${params.srid}) from ((select string_to_array('${params.X1},
        ${params.Y1},${params.X2},${params.Y1}',',') As arr)) as foo;`);
    return `
    Select st_transform(st_MakeEnvelope(arr[1]::double precision,arr[2]::double precision,arr[3]::double precision,arr[4]::
        double precision,4326),${params.srid}) from ((select string_to_array('${params.X1},
        ${params.Y1},${params.X2},${params.Y1}',',') As arr)) as foo;`}



router.get('/getwkb/:X1/:Y1/:X2/:Y2/:srid',async(request,res,next)=>
{
    await Runondb(wkb(request.params))
    .then(async(result)=>{
        console.log();
        if(result.rows)
        {

            console.log(result);
            res.send(result.rows)
        
            // console.log(result.rows);
        }
        else
        {
            console.log(`no data found`);
        }
    })
    .catch(err=>{ 
        console.log(err);
    })   
})

router.post('/Insertdata',async (request,res,next)=>{
    const{host,port,username,password,dbname} = request.body;
    await Runonotherdb(insertdata(request.body),dbname,host,port,username,password)
        .then(async(result)=>{
            console.log();
            if(result.rows)
            {

                console.log(result);
                res.send(result.rows)
            
                // console.log(result.rows);
            }
            else
            {
                console.log(`no data found`);
            }
        })
        .catch(err=>{ 
            console.log(err);
        })
})

router.post('/createclient',async function(request,res,next){
    console.log(request.body.host);
    const{host,port,username,password,dbname} = request.body;
    const query = `select * from "road_centerlines" where ogc_fid=7`;
    await Runonotherdb(query,dbname,host,port,username,password)
        .then(async(result)=>{
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch(err=>{
            console.log(err);
        })
})
 
module.exports=router;
