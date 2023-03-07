import  express from 'express'
import { router } from './routes/api-key.js'

const app = express();
const port = "3000"
app.use('/', router);

app.listen(port, () => console.log(`Server started on port ${port}`));
