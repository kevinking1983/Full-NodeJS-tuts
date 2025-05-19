const express = require('express');

const authcontroller = require('../Controllers/authcontroller');


const router = express.Router();

router.route('/signup')
                      .post(authcontroller.signuphandler);

router.route('/login')
                     .post(authcontroller.login);

                      

module.exports = router;                      