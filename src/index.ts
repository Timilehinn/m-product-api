const express = require('express');
const app = express();
const cors = require('cors')
import { Request, Response, NextFunction } from 'express';
import initDb from './config/Db';
import { productRoute } from './routes';
import logger from './utils/logger';

const PORT = 5454 || process.env.PORT 

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) 
  };
  
  app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
  );
  app.use(express.json({ limit: "50mb" }));
  

app.use(cors(corsOptions));

app.use('/api/products', productRoute());

app.get('/', (req: Request, res: Response)=>{
    res.json({ info: 'Server is up' })
})

app.listen(PORT, async () => {
  try {
    // initialize db
    await initDb();
    logger.info(`Server started listening on port ${PORT}`);
  } catch (e) {
    logger.error(`Error starting server ${e}`);
  }
});
