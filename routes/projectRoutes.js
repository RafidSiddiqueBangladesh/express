const express=require("express");
const { postProjects, getAll, geta, updated, deleted } = require("../controllers/projectControllers");
const requireAuth=require("../middlewares/requireAuth");
const router=express.Router();
router.use(requireAuth);
//routes
router.get("/",getAll);
router.get("/:id",geta);
router.post("/",postProjects);

router.delete("/:id",deleted);
router.patch("/:id",updated);

module.exports=router;