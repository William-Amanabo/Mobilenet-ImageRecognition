let express = require('express')

let app =  express();

app.use(function(req,res,next){
    console.log(`${new Date()} - ${req.method} - ${req.url}`)
    next();
})

app.use(express.static('../dist'));

app.listen(81, function(){
    console.log("Serving static on 81")
})