import 'dotenv/config'
import express from 'express'
import { prisma } from '../packages/db/index.js'
import cors from 'cors'
import z, { maxLength, string } from 'zod'
import b from 'bcrypt'
const app = express()
app.use(cors())
app.use(express.json())


app.post('/signup', async (req, res) => {
  const inputUser = z.object({
    username :z.string,
    email :  z.email,
    password : z.mi
  })
  const { email, username, password } = req.body
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    })

    res.json({
      message:"signup successful",
      success:true
    })

  } catch (e) {
    console.error(e)
   
  }
})


app.post('/login', (req,res)=>{

})
app.listen(8000)