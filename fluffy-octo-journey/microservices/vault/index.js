import  express from 'express'
import { router } from './routes/lol-summoner.js'

const app = express();
const port = "3000"
app.use('/vault', router);

app.listen(port, () => console.log(`Server started on port ${port}`));
