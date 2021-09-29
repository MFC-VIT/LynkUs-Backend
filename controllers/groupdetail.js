const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose') 
const fs = require('fs');
const path = require('path');
require('dotenv/config');
const multer = require('multer');
const Group = require('../models/group')

const createGroup = async (req, res) => {
    const {title, dp, admin} = req.body
    const date = new Date()
    const Detail = new Group({title, dp, date, admin})
    // validate the admin if exists or not
    const check = Group.find({admin})
    if(check.countDocuments > 0)
    {
        res.send()
    }
    await Detail.save()
    return res.status(201).send(Detail)
}

const adminExist = async(req,res) =>{
    const {title, dp, admin} = req.body
    const date = new Date()
    const Detail = new Group({title, dp, date, admin})
    // validate the admin if exists or not
    const check = Group.find({admin})
    if(check.countDocuments > 0)
    {
        res.status(200).send(check)
    }
    else
    {
        res.status(404).send('Not an admin')
    }
}

const getGroup = async(req,res) =>{
    const gid = req.body.gid
    const check = await Group.find({gid})
    if(check.length > 0)
    {
        res.status(200).send(check) 
    }
    else
    {
        res.status(404).send('Not found !');
    }
}


const getUserGroup = async(req,res) =>{
    const uid = req.body.uid
    const check = await Group.find({uid})
    if(check.length > 0)
    {
        res.status(200).send(check) 
    }
    else
    {
        res.status(404).send('Not found !');
    }
}

const displayGroup = async(req,res) =>{
    try
    {
        const data = await Group.find({})
        res.status(200).send(data)
    }
    catch(e)
    {
        res.status(404).send(e)
    }
}

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// const upload = multer({ storage: storage });

module.exports = {createGroup,displayGroup,getGroup,getUserGroup,adminExist}

