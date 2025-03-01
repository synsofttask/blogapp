const express = require("express");
const app = express();
app.use(express.json());
const port = 5300;
const cors =require('cors');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());
app.use(cors(
    {
        origin:['http://localhost:3000'],
        methods:["POST","GET","DELETE","PATCH"],
        credentials: true
    }
))

const userRouter = require('./Routes/UserRoutes/userRoutes');
const blogRouter = require('./Routes/BlogRoutes/blogroutes');
 app.use('/',userRouter)
 app.use('/',blogRouter)

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})