const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    
    const query=req.body.cityName;
    const apikey="e52489603f83ed2d4fefc50c7661f0a7";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;
    https.get(url,(Response)=>{
        Response.on('data',(d)=>{
            const wheatherdata=JSON.parse(d);
            const temp=wheatherdata.weather[0].description;
            const icon=wheatherdata.weather[0].icon;
            const image="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.setHeader("Content-Type", "text/html")
            res.write("<h1>"+temp+"</h1>");
            res.write("<img src=https://openweathermap.org/img/wn/"+icon+"@2x.png>");
            res.send();

            
        })
    })

})
app.listen(3000,()=>{
    console.log("Server has started on port 3000");
})