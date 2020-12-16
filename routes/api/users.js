const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys_dev');
const _ = require('lodash')

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserDetail = require('../../validation/userData')
// Load User model
const User = require('../../models/User');

const auth = require('../../middleware/auth')

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async(req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  let userEmail= await User.findOne({ email: req.body.email })

  if(userEmail){
    errors.email = 'Email already exists';
      return res.status(400).json(errors);
  }


  let data = _.pick(req.body, [
    "first_name",
    "last_name",
    "email",
    "usertype"
  
  ])

  let password;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(req.body.password, salt);


  let userData={
    ...data,
    password
  }
 

      const newUser = new User(userData);

      let user =  await newUser.save()


      const payload = {usertype:user.usertype, id: user._id, first_name: user.first_name,}; // Create JWT Payload

      let token = await jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },)


        res.json({
          success: true,
          token: 'Bearer ' + token
        });


     

});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {usertype:user.usertype, id: user._id, first_name: user.first_name }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});


// @route   POST api/usesr/add
// @desc    Add user data
// @access  Public
router.post('/add', async (req, res) => {
  const { errors, isValid } = validateUserDetail(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
 
  let {first_name,last_name,address,ssn,telephone_number} = req.body

  


  const salt = await bcrypt.genSalt(10);
   ssn = await bcrypt.hash(ssn, salt);



  let result = await User.findByIdAndUpdate({_id:req.body.userId},{$set:{
    first_name,
    last_name,
    address,
    telephone_number,
    ssn
  }})
 

    await  result.save()

    res.send({result,message:"Detail added successfully"})
 
});





// @route   GET api/users/list
// @desc    Get users List
// @access  Private
router.get('/userlist',auth,async (req, res) => {

  let data = await User.find({ssn:{$ne:null}})
 
  if(data.length ==0){

    return res.status(400).send({info:"NO time added"})

  }

  res.send(data)
});



// @route   GET api/users/profile/:id
// @desc    Get User detail
// @access  Public
router.get('/profile/:userId',async (req, res) => {

  let data = await User.findById({_id:req.params.userId})
 
  if(data.length ==0){

    return res.status(400).send({info:"NO User Found"})

  }

  res.send(data)
});







module.exports = router;
