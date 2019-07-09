const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()


//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewdir = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engines and views location
app.set('view engine','hbs')
app.set('views',viewdir)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title :'weather app', 
        name:'rachi'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>Hello express</h1>')... contents displayed from index.html

// })
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        task :'helping...',
        time:20
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'rachi',
        age:20
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("Enter something")
    }
    

    geocode(req.query.address,(error,{latitiude,longitude,location}={})=>{
        console.log(error)
        if(error){
            return res.send({error})
        }
            forecast(latitiude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address:req.query.address
                })
            })

        })
    })
                

   

    

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send("Enter something")
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
    })

app.get('/help/*',(req,res)=>{
    res.render('404-error',{
        errorMessage:'Help not found'
        
    })
})

app.get('*',(req,res)=>{
    res.render('404-error',{
        errorMessage:'Page not found'
        
    })
})

app.listen(3000,console.log("Server is up"))

