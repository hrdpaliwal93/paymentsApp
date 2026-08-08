//mimmicking a bank server

import express from 'express'
import { prisma } from '../db/index.js'
import { success } from 'zod'
const app = express()


app.post('/payments/transfer', async (req, res) => {

    // 1. Find account(s)

    // 2. Validate

    // 3. Start DB transaction

    // 4. Update balances

    // 5. Save transaction

    // 6. Commit

    // 7. Return success
    const { transactionid, amount, type, fromAccount, toAccount } = req.body

    try {
        const sendaccount = await prisma.bankDetails.findFirst({ where: { accountNumber: fromAccount } })
        const receiveaccount = await prisma.bankDetails.findFirst({ where: { accountNumber: toAccount } })
        if (!sendaccount || !receiveaccount) {
            res.json({
                success: "failed",
                message: "sender account or receiver account does not exists",
                transactionid: transactionid, amount: amount, type: type

            })
            return;
        }
        if (!sendaccount.balance >= amount) {
            throw new Error("insufficient balance")
        }

        await prisma.$transaction([


            prisma.bankDetails.update({ where: { accountNumber: fromAccount }, data: { balance: { decrement: amount } } }),
            prisma.bankDetails.update({ where: { accountNumber: toAccount }, data: { balance: { increment: amount } } }),
            res.json({ success: "success", transactionid: transactionid, amount: amount, type: type })



        ])



    } catch (e) { console.error(e) }
})


app.listen(8001)