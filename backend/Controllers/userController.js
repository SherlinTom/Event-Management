const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../Models/UserModel");

exports.userRegister = async(req,res,next) =>{
    const {name,email,password,contact_no,role} = req.body;
    if(!name || !email || !password || !contact_no){
        return res.status(401).json({
            success: false,
            message: "Please fill all required fields"
        });
    }
    try {
        const user = req.body;
        const newUser = await User.create(user);
        console.log(newUser);
    
        res.status(201).json({
            success: true,
            message: "Registration completed successfully..!",
            newUser
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    }

    exports.userLogin = async(req,res) =>{
    
        try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: "Please fill all required fields"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        
          const isValidPassword = await bcrypt.compare(password,user.password);
          if(!isValidPassword){
           return res.status(401).json({
            success: false,
            message: "Invalid email or password"
           }) 
          }
          const options = {
            id: user._id,
            role: user.role
          }
          const token = jwt.sign(options,process.env.JWT_SECRET_KEY,{expiresIn:'7d'});
          const userWithoutPassword = {
            name: user.name,
            email: user.email,
            role: user.role,
            token,
            isAuthenticated: true,
            user_id: user._id
          }
          res.status(200).cookie("token",token).json({
            success:true,
            message: `Welcome, ${user.name} ! `,
            user: userWithoutPassword,
            isAuthenticated: true,
            token
            
        });
            
        } catch (error) {
            res.status(500).json({
                success:false,
                message: error.message
            })
        }
    }

    exports.getUserProfile = async(req,res)=>{
  
        const user = await User.findById(req.id);
        console.log("user",user);
        try {
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            const user_details ={
                name: user.name,
                email: user.email,
                contact_no: user.contact_no,
                role: user.role,
            }
    
            res.status(200).json({
                success: true,
                message:"User Profile",
                user_details
            });
        } catch (error) {
             res.status(500).json({
                success:false,
                message: error.message
            });
        }
     }

     exports.updateProfile = async(req,res) =>{
        
        const id = req.id;
        const updatedData = req.body;
        try {
            const user = await User.findById(id);

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            Object.keys(updatedData).forEach((key)=>{
                user[key] = updatedData[key];
            });
            await user.save();
    
            res.status(200).json({
                success: true,
                message:" Profile Updated Successfully! ",
                user
            });
        } catch (error) {
             res.status(500).json({
                success:false,
                message: error.message
            });
        }
     
}

exports.userLogout = (req,res) =>{
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message:"Loggedout successfully..!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
   
}