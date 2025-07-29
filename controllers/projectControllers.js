const Project=require("../models/projectModels");
const mongoose = require("mongoose");


//get all projects
const getAll=async(req,res)=>{
    const projects=await Project.find({}).sort({createdAt:-1});
    res.status(200).json(projects);
}
//get a single project 

const geta= async(req,res)=>{
    const{ id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid data"});
    }
    const project= await Project.findById(id);

       if(!project){ 
        return res.status(404).json({error:"No such project"})};
    
        res.status(200).json(project);

};


//post a project 
const postProjects=async(req,res)=>{
     const data=req.body;

     try{
      const project= await Project.create({
            ...data,
        })
        res.status(200).json(project);
     }catch(err){
 res.status(400).json({error:err.message});
     }
    };
//delete a project 
const deleted= async(req,res)=>{
    const{ id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid data"});
    }
    const project= await Project.findOneAndDelete({ _id:id});

       if(!project){ 
        return res.status(404).json({error:"No such project"})};
    
        res.status(200).json(project);

};
//update a project
const updated= async(req,res)=>{
    const{ id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Invalid data"});
    }
    const project= await Project.findOneAndUpdate({_id:id},{...req.body});

       if(!project){ 
        return res.status(404).json({error:"No such project"})};
    
        res.status(200).json(project);

};
module.exports={
    postProjects,getAll,geta,deleted, updated,
};