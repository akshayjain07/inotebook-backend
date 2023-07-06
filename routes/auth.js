const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'harryisagoodb$oy';

// Route 1 : Create a user using: POST "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name','Name is required').notEmpty(),
    body('email','Invalid email address').isEmail(),
    body('password','Password must be at least 6 characters').isLength({ min: 6 })
  ], async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            //check whether the user with this email exists already
            const existingUser = await User.findOne({email: req.body.email});
            if(existingUser){
                return res.status(400).json({error:"This a user with this email already exist"})
            }

            const salt = await bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hash(req.body.password,salt);

            const user = await User.create({
                name:req.body.name,
                email:req.body.email,
                password:secPass
            })
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            res.json({token})
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
})

    // Route 2 : Authenticating a user using: POST "/api/auth/login". No login required
    // Fistly I will try to the entered email and password is valid or not
    router.post('/login',[
        body('email','Invalid email address').isEmail(),
        body('password','Password cannot be empty').exists()
      ], async (req,res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            // then here we try to find out whether the user exists in database or not 
            const {email, password} = req.body;
            try{
                let user = await User.findOne({email});
                if(!user){
                    return res.status(400).json({error:"Please try to login with correct credentials"});
                }


            //now compare the credentials 
                const passwordCompare = bcrypt.compare(password, user.password);
                if(!passwordCompare){
                    return res.status(400).json({error:"Please try to login with correct credentials"});
                }

            //now send the token
                const data = {
                    user:{
                        id:user.id
                    }
                }
                const token = jwt.sign(data, JWT_SECRET);
                res.json({token})


            // catch the server error
            }catch(error){
                console.error(error.message);
                res.status(500).send("Internal server error");
            }
        }    
    )

    // Route 3 : Get logged in user details using: POST "/api/auth/login". Login required
    router.post('/getuser', fetchuser, async (req,res)=>{
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })


module.exports = router