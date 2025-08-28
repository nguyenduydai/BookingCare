import { reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt =bcrypt.genSaltSync(10);
let handleLoginUser=(email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userData={}
            let userExist=await checkUserEmail(email);

            if(userExist){ 
                let user=await db.User.findOne({
                    attributes:['email','roleId','password','firstName','lastName'],
                    where:{email:email},
                    raw:true
                })
                let check = await bcrypt.compare(password,user.password);
                            console.log( password);
                                        console.log( user.password);
                                        console.log(check);
                if(check){
                    userData.errCode=0;
                    userData.message='ok';
                    delete user.password;
                    userData.user=user;
                }else{
                    userData.errCode=3;
                    userData.message='wrong password'
                }
            }else{
                userData.errCode=1;
                userData.message=`email isn't exist`;
            }
            resolve(userData)
            
        }catch(e){
            reject(e);
        }
    })
}

let checkUserEmail=(userEmail)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user=await db.User.findOne({
                where:{email:userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e);
        }
    })
}
let getAllCodeService=(type)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!type){
                resolve({errCode:1,message:'missing type'})
            }else{
                let res={};
                let data=await db.Allcode.findAll({
                    where:{type:type}
                });
                res.errCode=0;
                res.data=data;
                resolve(res);
            }

        resolve(res)
        }catch(e){
            reject(e);
        }
    })
}
let handleCreateNewUserService=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
                let check=await checkUserEmail(data.email);
                if(check===true){
                    resolve({
                        errCode:1,
                        message:'your email is exists'
                    })
                }else{
                    let hashPassword=await hashPasswordUser(data.password);
                    await db.User.create({
                            email:data.email,
                            password:hashPassword,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            address:data.address,
                            phoneNumber:data.phoneNumber,
                            gender:data.gender,
                            roleId:data.roleId,
                            positionId:data.positionId,
                            image:data.avatar
                    })
                    resolve({
                        errCode:0,
                        message:'OK'
                    });
                }
                
            }catch(e){
                   reject(e);
            }
    })
    
}
let handleUpdateUserService=(data)=>{
     return new Promise(async(resolve,reject)=>{
            try{
               let user=db.User.findOne({
                where:{id:data.id},
                raw:false
               })
               if(user){
                    user.firstName=data.firstName;
                    user.lastName=data.lastName;
                    user.address=data.address;
                    user.phoneNumber=data.phoneNumber;
                    user.gender=data.gender;
                    user.positionId=data.positionId;
                    user.roleId=data.roleId;
                    if(data.avatar){
                        user.image=data.avatar;
                    }
                    await user.save();
                    resolve({
                        errCode:0,
                        message:'update success'
                    });
               }else{
                    resolve({
                          errCode:1,
                        message:'update fail'
                    });
               }
            }catch(e){
                reject(e);
            }
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
let getAllUsers=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users='';
            if(userId==='ALL'){
                users=await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            if(userId && userId!=='ALL'){
                users=await db.User.findOne({
                    where:{id:userId},
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            resolve({
                        errCode:0,
                        message:'OK',
                        users:users
                    });
        }catch(e){
            reject(e);
        }
    })
}
module.exports={
    handleLoginUser:handleLoginUser,
    checkUserEmail:checkUserEmail,
    getAllCodeService:getAllCodeService,
    handleCreateNewUserService:handleCreateNewUserService,
    handleUpdateUserService:handleUpdateUserService,
    getAllUsers:getAllUsers
}