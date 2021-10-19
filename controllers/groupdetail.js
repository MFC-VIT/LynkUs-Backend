const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose') 
const fs = require('fs');
const path = require('path');
require('dotenv/config');
const multer = require('multer');
const Group = require('../models/group')
const Member = require('../models/member')

const createGroup = async (req, res) => {
    const {title, dp, admin} = req.body
    const date = new Date()
    const Detail = new Group({title, dp, date, admin})
    await Detail.save()
    return res.status(201).send(Detail)
}

const adminExist = async(req,res) =>{
    const gid = req.query.group
    const uid = req.query.user
    console.log(gid)
    console.log(uid)
    try
    {  
        const findAdmin = await Member.find({gid, uid})
        // console.log(findAdmin[0].isadmin)
        if(findAdmin[0].isadmin)
        {
            res.send('User is Admin')
        }
        else
        {
            res.send('Not Admin') //not admin
        }
    }
    catch(e)
    {
        res.send(e).status(404)
    }

}

const getGroup = async(req,res) =>{
    // console.log(req.params._id)
    try
    {
        const findGroup = await Group.findById({_id : req.params._id})
        res.status(200).send(findGroup) 
    }
    catch(e)
    {
        res.status(404).send('Not found !');
    }
}

const getUsers = async(req,res) =>{
    const gid = req.params.gid
    // console.log(gid)
    try
    {
        const findUsers = await Member.find({ gid })
        // console.log(findUsers)
        res.send(findUsers)
    }
    catch(e)
    {
        res.send('Not found').status(404)
    }
}

const getUserGroup = async(req,res) =>{
    const uid = req.params._id
    // console.log(uid)
    const check = await Member.findById({_id : uid})        
    try
    {
        // console.log(check.gid)
        const UserGroup = await Group.findById({_id : check.gid})
        // console.log(UserGroup)
        res.send(UserGroup)
    }
    catch(e)
    {
        res.send('NA')
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

module.exports = {createGroup,displayGroup,getGroup,getUserGroup,adminExist,getUsers}

