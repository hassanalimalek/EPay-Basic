const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 5; 
const router = require('express').Router();
const {userSignUpValidationSchema,userSignInValidationSchema,userUpdateValidationSchema} = require('../general/zodValidations');
const {User} = require('../db/index')
const {checkAccountExists, verifyLogin} = require('../general/helper');
const authMiddleware = require('../middleware');



module.exports = router;