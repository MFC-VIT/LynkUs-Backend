const mongoose = require('mongoose') 

const displayPaths = async(req,res) =>{
    const user =`User:  /user/details\ \n
                    /user/add\ \n
                    /usesr/details\ \n\n
            Member: /member/add\ \n
                    /member/display/:gid\ \n
                    /member/display\ \n\n
            Group:  /group/create\ \n
                    /group/display\ \n
                    /group/display/:id\ \n
                    /group/display/user/:id\ \n
                    /group/valid\ \n
                    /group/user/:gid\ \n\n
            Meeting:/meet/create\ \n
                    /meet/getall/:gid\ \n
                    /meet/get/:mid\ \n 
                    /meet/update/:mid\ \n
                    /meet/delete/:mid\ \n
                    `
    res.send(user)
}

module.exports = {displayPaths}