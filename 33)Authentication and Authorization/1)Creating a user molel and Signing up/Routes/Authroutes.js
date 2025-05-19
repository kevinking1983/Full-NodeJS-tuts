const express = require('express');

const authcontroller = require('../Controllers/authcontroller')


const router = express.Router();

router.route('/signup')
                      .post(authcontroller.signuphandler)

                      

module.exports = router;                      