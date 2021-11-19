const mongoose = require('mongoose') 

const displayPaths = async(req,res) =>{
    const user =`User:  /user/details\ <br>
                    /user/add\ <br>
                    /usesr/details\ <br><br> `
    const member= `Member: /member/add\ <br>
                    /member/display/:gid\ <br>
                    /member/display\ <br><br>`
    const group = `Group:  /group/create\ <br>
                    /group/display\ <br>
                    /group/display/:id\ <br>
                    /group/display/user/:id\ <br>
                    /group/valid\ <br>
                    /group/user/:gid\ <br><br>`
    const meeting=`Meeting:/meet/create\ <br>
                    /meet/getall/:gid\ <br>
                    /meet/get/:mid\ <br> 
                    /meet/update/:mid\ <br>
                    /meet/delete/:mid\ <br>
                    `
    res.send(user+member+group+meeting)
}

module.exports = {displayPaths}