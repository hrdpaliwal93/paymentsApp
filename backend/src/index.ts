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
  //validating user inputs
  const inputUser = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(3).max(8)
  })
  const { success, data, error } = inputUser.safeParse(req.body)
  if (!success) { res.json({ message: "invalid input format", error: error.message }); return; }


  const { username, email, password } = req.body
  try {
        //checking if the username already exixts or not!
        const user = await prisma.user.findFirst({where:{username:username}})

        if(user) {res.json({message:"username already exists"});return ;}

        //getting user password and hashing it before saving to db !
        const hashedpassword = b.hash(password, 10)
        await prisma.user.create({
          data: {
            username,
            email,
            password: hashedpassword
          }
        })

        res.json({
          message: "signup successful",
          success: true
        })

  } catch (e) {
    console.error(e)

  }
})


app.post('/login', (req, res) => {

})
app.listen(8000)