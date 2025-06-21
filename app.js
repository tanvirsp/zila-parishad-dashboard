const express = require('express');
const app = express();

const router = require("./src/routes/api")

const cookieParser = require('cookie-parser');
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const { rateLimit } = require('express-rate-limit')
const helmet = require('helmet');
const hpp = require('hpp');




const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 400, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})




//Security Middleware
app.use(limiter)
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())
app.use(express.static('uploads'));
app.use(express.static('pdf'));
const path = require('path');




app.use(express.static(path.join(__dirname, 'public') ));



app.set('views', path.join(__dirname, "src/views"))
app.set('view engine', 'ejs')

app.use("/api/v1", router);



app.use(express.static('client/dist'));
// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})




// //Root Rought
// app.get("/", (req, res) =>{
//     res.json("Zila  Parishad Server is Running")
// })


// //Undefined Route
// app.use("*", (req, res) =>{
// 	res.status(404).json({status: "fail", data: "Page Not Found"})
// });




module.exports = app;
