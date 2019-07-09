const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYnJlYXRoZWR1ZGUiLCJhIjoiY2p4cmRiamthMDdxZDNtcHBkZDF6emNoNyJ9.iX4TSW-iXzR8xkK8Fz5Q4g'
    request({url:url, json:true},(error,{body})=>{
            if(error){
                callback('not connected',undefined)
            }else if(body.features.length===0){
                callback('not found')
            }
            else{
            callback(undefined,{
                latitiude :body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
            }
        }
        ) 
}

module.exports = geocode