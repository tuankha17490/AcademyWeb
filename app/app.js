import express from 'express';
const app = express();
import morgan from 'morgan';
import { urlencoded,json} from 'body-parser';
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "../Plugins/SwaggerPlugin/bundled.json"
import initRoute from "./Config/routes"

app.use('/documentations', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({message: 'Cors Success !!!'});
    }
    next();
})


initRoute(app)

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error,req,res) => {
    res.status(error.status || 500).json({
       error: {
        message: error.message,
       }
    })
})
export default app;