const express = require('express');
const router = express.Router();
const {Post} = require('../models'); // database model'
const app = express();


router.get('/',async(req,res,next)=>{
//res.send("hello world");
//res.json to send json format data
const listOfPosts = await Post.findAll(); //==> getting all the data using find all
res.json(listOfPosts);
});

router.get('/:id',async (req,res,next)=>{
const id = req.params.id;
const post = await Post.findByPk(id);
res.json(post);
});

// need to be always async to be able to process one step at a time
router.post("/",async (req,res,next)=>{
  const post = req.body;
  await Post.create(post);
  res.json(post);
});


module.exports = router;
