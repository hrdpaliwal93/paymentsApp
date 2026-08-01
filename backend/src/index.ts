import express from 'express'
const app = express()

app.get('/', (req,res)=>{
    res.send("serve rworking ")
})

app.listen(8000)