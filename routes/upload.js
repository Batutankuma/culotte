var express = require('express');
var router = express.Router();
var Controller = require('./../controllers/upload_ctr');
//var Authentification = require('./../middlewares/auth/auth.basic');
var multer = require('./../middlewares/storage_config/multer.config');
//var {VerifyToken} = new Authentification();


router.post('/upload',multer,Controller);

module.exports = router;
