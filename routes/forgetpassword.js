const express = require('express');
const router = express.Router();
const passwordcontroller=require('../controller/password');

router.post('/password/forgotpassword',passwordcontroller.forgotpassword);

router.get('/password/resetpassword/:id',passwordcontroller.resetpassword);

router.get('/password/updatepassword/:id',passwordcontroller.updatepassword);

module.exports=router;