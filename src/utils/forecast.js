
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitiude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/4e7fe5255a2a4286cfd1b6377c360936/'+latitiude+','+longitude+'/'
    request({url, json:true},(error,{body})=>{
            if(error){
                callback('not connected',undefined)
            }else if(body.error){
                callback('not found')
            }
            else{
            callback(undefined,{
                temperature:  body.currently.temperature,
                precepprob:body.currently.precipProbability
            })
            }
        }
        ) 
}


module.exports = forecast