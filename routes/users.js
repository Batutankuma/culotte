var express = require('express');
var router = express.Router();
var Controller = require('./../controllers/user_ctr');
var controller = new Controller();

/* GET users listing. */
router.post('/users/signup',controller.singUp);
router.post('/users/login',controller.loginIn);
router.get('/users/:id',controller.findId);
router.get('/users',controller.findAll);
router.put('/users/:id',controller.updateId);
router.delete('/users/:id',controller.deleteId);

module.exports = router;
