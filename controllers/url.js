
// const hyperid = require('hyperid')
const URL = require('../models/url')

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
}
async function handleGenerateShortUrl(req,res){
    const body = req.body;
    if(!body.url){return res.status(400).json({error:"url is required"})}
    const shortID = generateRandomId(6);
await URL.create({
    shortId:shortID,
    redirectURL:body.url,
    visitHistory:[],
})
return res.json({id:shortID})
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports = {
    handleGenerateShortUrl,handleGetAnalytics
}