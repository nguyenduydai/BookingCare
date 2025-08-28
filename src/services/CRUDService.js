import bcrypt from "bcryptjs";
import db from '../models/index';
import { where } from "sequelize";
const salt =bcrypt.genSaltSync(10);
let createNewUser = async(data)=>{
    return new Promise(async(resolve,reject)=>{
       
    })

}
let hashPasswordUser=(password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            var hash = await bcrypt.hashSync(password,salt);
            resolve(hash);
        }catch(e){
            reject(e);
        }
    })
}
let getAllUser = async()=>{
    return new Promise((resolve,reject)=>{
        try{
            let listUser=db.User.findAll({raw:true})
            resolve(listUser);
        }catch(e){
            reject(e);
        }
    })
}
let getUserByID = async(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
           let user=db.User.findOne({
            where:{id:userId},
            raw:true
           })
           if(user){
                resolve(user);

           }
        }catch(e){
            reject(e);
        }
    })

}
let updateUser = async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
           let user=db.User.findOne({
            where:{id:data.id},
           })
           if(user){
                user.firstName=data.firstName;
                user.lastName=data.lastName;
                user.address=data.address;
                await user.save();
                let allUser=await db.user.findAll();
                resolve(allUser);
           }else{
                resolve();
           }
        }catch(e){
            reject(e);
        }
    })

}
let deleteUserById = async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user=db.User.findOne({
            where:{id:data.id},
           })
            if(user){
                await user.destroy();
           }else{
                resolve();
           }
        }catch(e){
            reject(e);
        }
    })

}
module.exports={
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserByID:getUserByID,
    updateUser:updateUser,
    deleteUserById:deleteUserById,
}