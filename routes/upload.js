var express = require('express');
var router = express.Router();
var Notification = require('./../middlewares/notification/prisma.notification');
var {_success} = new Notification();
var multer = require('./../middlewares/storage_config/multer.config');
//var Authentification = require('./../middlewares/auth/auth.basic');
//var {VerifyToken} = new Authentification();


router.post('/upload',multer,(req,res)=>{
    let file = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
    _success(res,201,{url:file});
});

module.exports = router;
