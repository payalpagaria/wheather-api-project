const express=require('express');
const https=require('https');
const app=express();
app.get("/",(req,res)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={api key}";
    https.get(url,(Response)=>{
        Response.on('data',(d)=>{
            const wheatherdata=JSON.parse(d);
            const temp=wheatherdata.weather[0].description;
            const icon=wheatherdata.weather[0].icon;
            const image="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.setHeader("Content-Type", "text/html")
            res.write(temp);

            res.write("<img src=https://openweathermap.org/img/wn/"+icon+"@2x.png>");
            res.send();

            
        })
    })
})

app.listen(3000,()=>{
    console.log("Server has started on port 3000");
})