const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 5; 
const router = require('express').Router();
const {userSignUpValidationSchema,userSignInValidationSchema,userUpdateValidationSchema} = require('../general/zodValidations');
const {User,Account} = require('../db/index')
const {checkAccountExists, verifyLogin} = require('../general/helper');
const authMiddleware = require('../middleware');


// POST /signup
router.post('/signup',async (req, res) => {
    let response = userSignUpValidationSchema.safeParse(req.body)
    if(response.success){
        // Check if user does not already exist
       let result = await checkAccountExists(User,req.body.userName)
       if(result === false){
        // Creating new user, hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
         const newUser = new User({
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        // Save the user
        const token = jwt.sign({
            userName:req.body.userName,
            id:newUser._id
        }, process.env.JWT_SECRET);
        // Creating new account for user, providing random balance between 1 to 1000 (for now)
        const newAccount = new Account({
            userId:newUser._id,
            balance:Math.random() * (1000 - 1) + 1
        })
        await newAccount.save()
        newUser.save()
            .then(() => res.json({message:'User created successfully',jwt:token}))
            .catch(err => res.status(400).json('Error: ' + err));
       }else{
            res.status(400).json({message:'User already exists'})
       }
    }else{
        res.status(400).json({message:'Invalid Data',error:response.error?.errors})
    }
  
});

// POST /signin
router.post('/signin',async (req, res) => {
    let response = userSignInValidationSchema.safeParse(req.body)
   
    if(response.success){
        // Check if user does not exist
       let result = await verifyLogin(User,req.body.userName,req.body.password)
       if(result){
            const token = jwt.sign({
                id:result._id,
                userName:req.body.userName,
                firstName:result.firstName,
                lastName:result.lastName
            }, process.env.JWT_SECRET);
            // Add token in response header
            res.setHeader('Authorization', `Bearer ${token}`);
            return res.json({message:'User logged in successfully',jwt:token})    
       }else{
            return res.status(400).json({message: result.error || 'Invalid Credentials'})
       }    
    }else{

        return res.status(400).json({message:response.error})
    }
});

// POST /updateInfo
router.post('/updateInfo',authMiddleware, async (req, res) => {
    try{
        const response = userUpdateValidationSchema.safeParse(req.body)
        if(!response.success){
            return res.status(400).json({message:response.error})
        }
        let foundUser = await User.findOne({userName:req.userName})
        foundUser.firstName = req.body.firstName;
        foundUser.lastName = req.body.lastName;
        foundUser.save()
        res.status(200).json({message:'User updated successfully'})
    }catch(e){
        return res.status(400).json({message:response.error})
    }
});

// Get /bulk
router.get('/bulk',authMiddleware, async (req, res) => {
    // Get request filters

    let filter = req.query?.filter
   
    // Search on User on the basis of firstName or lastName converting
    let result = await User.find({
        $or: [
            { firstName: { $regex: new RegExp(filter, "i") } },
            { lastName: { $regex: new RegExp(filter, "i") } }
        ]
    });
    res.json({
        user: result.map(user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;