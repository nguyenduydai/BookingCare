import db from '../models/index'; 
import CRUDService from '../services/CRUDService';
let getHomePage=async (req,res)=>{
    try{
        let data=await db.user.findAll();
        return res.render('homepage.ejs',{
            data:data
        });
    }catch(e){
        console.log(e)
    }
}
let getCRUD=async (req,res)=>{
    return res.render('crud.ejs');
}
let postCRUD=async (req,res)=>{
    let message =await CRUDService.createNewUser(req.body);
    console.log(message);
    return  res.send('post crud')
}

let displayGetCRUD=async (req,res)=>{
    let listUser =await CRUDService.getAllUser();
    console.log(listUser);
    return  res.render('display.ejs',{
            data:listUser
        });
}
let getEdit=async(req,res)=>{
    let userId=req.body.id;
    if(userId){
        let userData=await CRUDService.getUserById(userId);
        console.log(user);
    }else{
        return res.send('user not found');
    }

}
let putEdit=async(req,res)=>{
    let user=req.body;
    let allUser=await CRUDService.updateUser(user);
    return res.render('display.ejs',{
            data:allUser
        });

}
let deleteCRUD=async(req,res)=>{
    let id=req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('delete success');
    }else{
        return res.send('user not found');
    }   
}
module.exports={
    getHomePage:getHomePage,getCRUD,postCRUD,displayGetCRUD,
    getEdit,putEdit,deleteCRUD,
}