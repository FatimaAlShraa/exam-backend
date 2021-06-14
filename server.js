'use strict'
const express=require('express');
const cors = require('cors');
const axios = require('axios')
require('dotenv').config();
const server= express();
const mongoose = require("mongoose");
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/digimon',{ useNewUrlParser: true, useUnifiedTopology: true });
const digimonSchema =new mongoose.Schema({
    name:String,
    img:String,
    level:String



})
const myDigimon=mongoose.modal ('digimon',digimonSchema )

server.listen (PORT,()=>{
    console.log(`listning on PORT ${PORT}`);
})
server.get('/', test);
server.get('/digimon', digimonsHandler)
server.post('/adddigimon', addDigiHandler)

function test(req, res){
    res.send('it is work')

}

function digimonsHandler(req, res){
    console.log(req.query);
    const url=`https://digimon-api.vercel.app/api/digimon`
  
    axios.get(url).then(result=>{
        console.log(result.data);
     const  digimonArr=result.data.map((digimon)=>{
            return new Digimon(digimon)
        })
        console.log(digimonArr);
        res.send(digimonArr)
    })
}

function addDigiHandler (req,res){
const {name,img,level}=req.body;

const newDigimon = new myDigimon({
    name:String,
    img:String,
    level:String
})
newDigimon.save()
}

class Digimon {
    constructor(data){
        this.name=data.name,
        this.img=data.img,
        this.level=data.level

    }
}

// https://digimon-api.vercel.app/api/digimon.

