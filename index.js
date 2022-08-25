const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
app.use(express.json()); // so json data will work
app.use(cors()); // whitelist your computer
const db = require('./models');

//Routers
const postRouter = require('./routes/Post');
app.use("/posts",postRouter);
const commentsRouter = require('./routes/Comments');
app.use('/comments',commentsRouter);
const userRouters = require('./routes/Users');
app.use("/auth",userRouters);

db.sequelize.sync().then(()=>{
  app.listen(PORT, ()=> {
    console.log("Server running port "+PORT);
  });
})


