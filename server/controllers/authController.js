const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/mail");
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
    token,
    user:{
        id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email,
        role:existingUser.role
    }
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
};

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.resume = req.file.path;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: user.resume
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProfile=async(req,res)=>{
    try{
        const user =await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        user.name=req.body.name || user.name;
        user.phone=req.body.phone || user.phone;
        user.bio = req.body.bio || user.bio;
        user.skills = req.body.skills || user.skills;
        user.location = req.body.location || user.location;
        user.email=req.body.email || user.email;
       
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link below to reset your password:\n\n${resetUrl}\n\nThis link expires in 15 minutes.`
        });

        return res.status(200).json({
            success: true,
            message: "Password reset email sent"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password is required"
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports={
    register,
    login,
    getProfile,
    uploadResume,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
};