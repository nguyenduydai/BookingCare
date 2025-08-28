import doctorService from '../services/doctorService';


let getTopDoctorHome=async(req,res)=>{
    let limit=req.query.limit;
    if(!limit) limit=10;
    try{
        let doctors=await doctorService.getTopDoctor(+limit)
        return res.status(200).json(doctors);
        
    }catch(e){

        return res.status(200).json({
            errCode:-1,
            message:'error from server'
            
        })
    }
}
let getAllDoctor=async(req,res)=>{

    try{
        let doctors=await doctorService.getAllDoctor()
        return res.status(200).json(doctors)
    }catch(e){
        return res.status(200).json({
            errCode:-1,
            message:'error from server'
            
        })
    }
}
let postInforDoctor=async(req,res)=>{

    try{
        let doctors=await doctorService.saveInforDoctor()
        return res.status(200).json(doctors);
    }catch(e){
        return res.status(200).json({
            errCode:-1,
            message:'error from server'
            
        })
    }
}
let getDetailDoctorById=async(req,res)=>{

    try{
        let doctors=await doctorService.getDetailDoctorByIdService(req.query.id);
        return res.status(200).json(doctors);
    }catch(e){
        return res.status(200).json({
            errCode:-1,
            message:'error from server'
            
        })
    }
}
module.exports={
    getTopDoctorHome:getTopDoctorHome,
    getAllDoctor:getAllDoctor,
    postInforDoctor:postInforDoctor,
    getDetailDoctorById:getDetailDoctorById
}