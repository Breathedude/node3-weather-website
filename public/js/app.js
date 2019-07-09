console.log("JS file")

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })

})

// fetch('http://localhost:3000/weather?address=Bangalore').then((response)=>{
//     response.json().then((data)=>{
//         if(DataTransfer.error){
//             console.log("Error")
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }

//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location+'').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
        }

    })
})
})