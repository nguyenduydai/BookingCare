import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router=express.Router(); 

let initWebRoutes=(app)=>{
    // router.get('/',homeController.getHomePage);
    // router.get('/crud',homeController.getCRUD);
     router.post('/post-crud',homeController.postCRUD);
    // router.get('/get-crud',homeController.displayGetCRUD);
    // router.get('/get-edit',homeController.getEdit);
    // router.post('/put-edit',homeController.putEdit);
    // router.get('/delete',homeController.deleteCRUD);

    router.post('/api/login',userController.handleLogin);

    router.get('/api/allcode',userController.getAllCode);
    
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.get('/api/get-all-users',userController.handleGetAllUser);


    router.get('/api/top-doctor-home',doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctor',doctorController.getAllDoctor)
    router.post('/api/save-infor-doctor',doctorController.postInforDoctor)

    router.get('/api/get-detail-doctor-by-id',doctorController.getDetailDoctorById)

    return app.use('/',router);
}

module.exports=initWebRoutes;