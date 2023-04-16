const express = require("express")
const {connection} = require('./config/db');
require("dotenv").config()
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { registerRouter } = require("./routes/register.routes");
const { loginRouter } = require("./routes/login.routes");
const { userProfile } = require("./routes/userprofile.routes");
const { googleOathRouter } = require("./routes/google-outh.routes");


const app = express();
const PORT=process.env.PORT || 8000

app.use(cors()) 

// enable CORS for specific origins, methods, and headers
// app.use(
//     cors({
//       origin: 'http://localhost:3000',
//       methods: ['GET', 'POST'],
//       allowedHeaders: ['Content-Type', 'Authorization'],
//     })
//   );

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });


app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("welcome to api")
})

app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.use("/profile",userProfile)
app.use("/auth",googleOathRouter)






app.listen(PORT, async () => {
    try{
        await connection
        console.log("Connection to DB successfully")
    }
    catch(err){
        console.log(err)
        console.log("Error connecting to DB")
    }
    console.log(`Listening on PORT ${PORT}`)
})