const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/mail");
const register=async(req,res)=>{
    try{
        const{name,password,email,role}=req.body;
        if(!name || !email ||!password){
            return res.status(400).json({
                success:false,
                message: "Please fill in all required fields."
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "An account with this email already exists. Please log in instead."
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
        message:"Registration successful. Please log in.",
        user:newUser
       });
    }catch(error){
        console.error("Register error:", error.message);
        res.status(500).json({
            success:false,
            message:"Something went wrong. Please try again."
        });
    }
};
const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter your email and password."
            });
        }
      const existingUser=await User.findOne({email});
      if(!existingUser){
        return res.status(401).json({
            success:false,
            message:"Invalid email or password."
        });
      }
    const isMatch=await bcrypt.compare(password,existingUser.password);
    if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid email or password."
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
        message:"Login successful",
        token,
        user:{
            id:existingUser._id,
            name:existingUser.name,
            email:existingUser.email,
            role:existingUser.role
        }
    });
    }catch(error){
        console.error("Login error:", error.message);
        res.status(500).json({
            success:false,
            message:"Something went wrong. Please try again."
        });
    }
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
        console.error("Profile error:", error.message);
        res.status(500).json({
            success:false,
            message:"Something went wrong. Please try again."
        });
    }
};

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume."
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
        console.error("Resume upload error:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
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
        console.error("Profile update error:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
};

const changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter your current and new password."
            });
        }

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
                message: "Your current password is incorrect."
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters long."
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
        console.error("Change password error:", error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
};
const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please enter your email address."
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email address."
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
            message: "Password reset email sent. Please check your inbox."
        });

    } catch (error) {
        console.error("Forgot password error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to send reset email right now. Please try again later."
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
                message: "Please enter a new password."
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "This reset link is invalid or has expired."
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully. You can now log in."
        });

    } catch (error) {
        console.error("Reset password error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
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