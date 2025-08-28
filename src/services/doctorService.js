import { where } from "sequelize";
import db from "../models/index";
import { raw } from "body-parser";

let getTopDoctor=(limit)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users=await db.User.findAll({
                limit:limit,
                where:{roleId:'R2'},
                order:[['createdAt','DESC']],
                attributes:{
                    exclude:['password']
                },
                include:[
                    {model:db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
                    {model:db.Allcode,as:'genderData',attributes:['valueEn','valueVi']},

                ],
                raw:true,
                nest:true,
            })
            resolve({
                errCode:0,
                data:users
            })
        }catch(e){
            reject(e);
        }
    })
}
let getAllDoctor=()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users=await db.User.findAll({
                where:{roleId:'R2'},
                attributes:{
                    exclude:['password','image']
                },
            })
            resolve({
                errCode:0,
                data:users
            })
        }catch(e){
            reject(e);
        }
    })
}

let saveInforDoctor=(inputData)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!inputData.doctorId|| !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action){
                resolve({
                    errCode:-1,
                    message:'missing parameter'
                })   
            }else{
                if(inputData.action==='CREATE'){
                    await db.Markdown.create({
                        contentHTML:inputData.contentHTML,
                        contentMarkdown:inputData.contentMarkdown,
                        description:inputData.description,
                        doctorId:inputData.doctorId
                    })
                }else if(inputData.action ==='EDIT'){
                    let doctorMarkdown=await db.Markdown.findOne({
                        where :{doctorId :inputData.doctorId},
                        raw:false
                    })
                    if(doctorMarkdown){
                        doctorMarkdown.contentHTML=inputData.contentHTML;
                        doctorMarkdown.contentMarkdown=inputData.contentMarkdown;
                        doctorMarkdown.description=inputData.description;
                        doctorMarkdown.doctorId=inputData.doctorId;
                        doctorMarkdown.updateAt=new Date();    
                        await doctorMarkdown.save();
                    }
                }
                resolve({
                    errCode:0,
                    message:'save success'
                })
            }
            
        }catch(e){
            reject(e);
        }
    })
}

let getDetailDoctorByIdService=(inputData)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!inputData){
                resolve({
                    errCode:-1,
                    message:'missing parameter'
                })   
            }
            console.log(inputData)
            let data= await db.User.findOne({
                where:{
                    id:inputData
                },
                attributes:{
                    exclude:['password']
                },
                include:[
                    {
                        model:db.Markdown,
                        attributes:['description','contentHTML','contentMarkdown']
                    },
                    {model:db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
                ],
                raw:false,
                nest:true
            })
            // if(data &&data.image){
            //     data.image=new Buffer(data.image,'base64').toString('binary');
            // }
            if(!data) data={};
            resolve({
                errCode:0,
                data:data
            })
        }catch(e){
            reject(e);
        }
    })
}
module.exports={
    getTopDoctor:getTopDoctor,
    getAllDoctor:getAllDoctor,
    saveInforDoctor:saveInforDoctor,
    getDetailDoctorByIdService:getDetailDoctorByIdService
}