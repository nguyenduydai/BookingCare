import userService from '../services/userService';
import bcrypt from "bcryptjs";
let handleLogin= async(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    if(!email|| !password){
        return res.status(200).json({
            errCode:1,
            message:'missing input',
        })
    }
    let userData=await userService.handleLoginUser(email,password)
     console.log( userData);
    return res.status(200).json({
            errCode:userData.errCode,
            message:userData.message,
            user:userData.user?userData.user:{}
        })
}
let getAllCode=async(req,res)=>{
    try{
        let data =await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    }catch(e){
        return res.status(200).json({
            errCode:-1,
            message:'Error from server'
        })

    }
}
let handleCreateNewUser=async(req,res)=>{
   let message=await userService.handleCreateNewUserService(req.body);
   return res.status(200).json(message);
}
let handleGetAllUser= async(req,res)=>{
    let id=req.query.id;
    if(!id){
        return res.status(200).json({
            errCode:1,
            message:'missing input',
        })
    }
    let userData=await userService.getAllUsers(id);
    return res.status(200).json({
            errCode:userData.errCode,
            message:userData.message,
            users:userData.users?userData.users:{}
        })
}
module.exports={
    handleLogin:handleLogin,
    getAllCode:getAllCode,
    handleCreateNewUser:handleCreateNewUser,
    handleGetAllUser:handleGetAllUser
} 