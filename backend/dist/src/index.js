import express from 'express';
import { prisma } from '../packages/db/index.js';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.post('/add', async (req, res) => {
    const { name, age } = req.body;
    const newUser = await prisma.user.create({
        data: {
            name: name,
            age: age
        },
    });
    console.log(newUser);
    res.json({ message: "user added!" });
});
app.listen(8000);
//# sourceMappingURL=index.js.map