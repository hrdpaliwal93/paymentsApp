import 'dotenv/config'
import jwt from 'jsonwebtoken'
import express from 'express'
import  {prisma} from '../packages/db/index.js'
import cors from 'cors'
import z, { maxLength, string } from 'zod'
import b from 'bcrypt'
import Auth from '../middlewares/auth.js'
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

  const { username, email, password } = data
  try {
    //checking if the username already exixts or not!
    const user = await prisma.user.findFirst({ where: { username: username } })

    if (user) { res.json({ message: "username already exists" }); return; }

    //getting user password and hashing it before saving to db !
    const hashedpassword = await b.hash(password, 10)
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
app.post('/login', async (req, res) => {
  const userinput = z.object({
    username: z.string(),
    password: z.string().min(3).max(8)
  })
  const { success, data, error } = userinput.safeParse(req.body)
  if (!success) { res.json({ message: "invalid input format", error: error.message }); return; }

  const { username, password } = data
  try {
    const user = await prisma.user.findFirst({ where: { username } })
    if (!user) { res.json({ message: "user does not exists, try signup first" }); return; }

    const valid = await b.compare(password, user.password)
    if (valid) {
      //generate jwt
      const token = jwt.sign(user.id, "hardikisacooldude.",{ expiresIn: '5m' })
      res.json({ message: "logged in", token: token })


    } else { res.json({ message: "incorrect password" }); return; }

  } catch (e) { console.error(e) }

})

app.post('/add', Auth, async (req, res) => {
  const id = req.id;

  //use the bank api to add money into wallet
  const {amount} =  req.body
  try {
      const result = await prisma.user.update({ where: { id: `${id}` }, data: { balance: { increment: amount } } })

      if (result) { res.json({ message: "balance updated successfully" }) }

  } catch (e) {
    console.error(e)
  }
})

app.get('/balance', Auth, async  (req,res)=>{
  const id = req.id
 try{
  const user = await prisma.user.findFirst({where:{id:`${id}`}})
  res.json({balance:user?.balance})
 }catch(e) {console.error(e)}

})


app.listen(8000)
