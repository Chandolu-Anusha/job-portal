const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const register=async(req,res)=>{
    console.log(req.body);
    const{name,password,email,role}=req.body;
    if(!name || !email ||!password){
        return res.status(400).json({
            message: "Please fill all required fields"
        });
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message: "User already exists"
        });
    }
    const  hashedPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({
        name,
        email,
        password:hashedPassword,
        role
    });
   res.status(201).json({
    success:true,
    message:"User Registered Succussfully",
    user:newUser
   });
};
const login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"Email and password are required"
        });
    }
  const existingUser=await User.findOne({email});
  if(!existingUser){
    return res.status(400).json({
        message:"User not found"
    });
  }
const isMatch=await bcrypt.compare(password,existingUser.password);
if(!isMatch){
    return res.status(401).json({
        message:"Invalid Password"
    });
}
const token=jwt.sign(
    {
        id:existingUser._id,
        role:existingUser.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d"
    }
);
res.status(200).json({
    success:true,
    message:"Login Successful",
    token
});
};
const getProfile=async(req,res)=>
{
    try{
        const user=await User.findById(req.user.id).select("-password");
        res.status(200).json({
            success:true,
            user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
}
module.exports={
    register,login,getProfile
};