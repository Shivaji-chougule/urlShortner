const express =require("express");
const app = express();
const PORT = 7000;
const URL = require('./models/url')
const urlRoute = require("./routes/url")
const {connectMogoDb} = require('./connect')

//connectoin
connectMogoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("mogoDb is connected"))

//middleware
app.use(express.json());

//routes
app.use('/url',urlRoute)

app.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL)
})



app.listen(PORT, ()=>console.log(`server is started at ${PORT}`))
