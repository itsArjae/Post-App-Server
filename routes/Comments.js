const express = require('express');
const router = express.Router();
const {Comments} = require('../models');

router.get('/:postId',async (req,res,next)=>{ // getting comments for a specific post
const postId = req.params.postId;
const comments = await Comments.findAll({
  where:{
    PostId: postId
  }
})
res.json(comments);
});

router.post('/', async (req, res, next)=>{
const comments = req.body; 
await Comments.create(comments);
res.json(comments);
})



module.exports = router;
 