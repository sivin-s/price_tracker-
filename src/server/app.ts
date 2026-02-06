import express,{type Request,type  Response, type NextFunction} from 'express';
import { route } from './routes/routes.js';
import path from 'path'

const app = express();

app.use(express.static(path.join(process.cwd(),'public')))
// console.log(process.cwd())
// console.log(path.join(import.meta.dirname,'public'))
// console.log(import.meta.dirname)
// console.log(import.meta.filename)

// logger middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    console.log(req.method,req.url)
    next();
})

app.use('/',route)

// 404 catcher middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(404).send("wrong Area")
})

export{
    app
}