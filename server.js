require('dotenv').config();

const express=require("express");
const mongoose=require("mongoose");

const projectRoutes=require("./routes/projectRoutes");
const app=express();
const port=process.env.PORT||4000;

//middlewares
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
});

//routes
app.use("/api/projects",projectRoutes);
//connect to mongodb
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
}).catch((err)=>{console.log(err);});
