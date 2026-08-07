//mimmicking a bank server

import express from 'express'
import {prisma} from '../db/index.js'
const app = express()


app.post('/payments/transfer', (req,res)=>{

    // 1. Find account(s)

    // 2. Validate

    // 3. Start DB transaction

    // 4. Update balances

    // 5. Save transaction

    // 6. Commit

    // 7. Return success
    const {transactionid, amount, type, fromAccount, toAccount} = req.body

 

    
})


app.listen(8001)