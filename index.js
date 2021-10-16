require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const userRoute = require('./routes/userRoute')
const attendanceRoute = require('./routes/attendanceRoute')
const groupRoute = require('./routes/groupRouter')
const memberRoute = require('./routes/memberRouter')

app.use('/attendance',attendanceRoute)
app.use('/user',userRoute)

app.use('/group', groupRoute)
app.use('/member', memberRoute)

const PORT = process.env.PORT || 3030

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(app.listen(PORT, () => console.log(`Listening to port ${PORT}`)))
.catch(err => console.log(err));
