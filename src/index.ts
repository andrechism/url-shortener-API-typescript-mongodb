import express, { Request, Response } from 'express';
import { URLController } from './controller/URLController';
import { MongoConnection } from './database/MongoConnection';

const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new URLController();
api.post("/shorten", urlController.shorten);
api.get("/:hash", urlController.redirect);

/*
api.use('/test', (req: Request, res: Response) => {
  res.json({ success: true })
})
*/

api.listen(5000, () => console.log('Express listening'));
