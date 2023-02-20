import * as express from 'express';
import { Request, Response } from 'express';

class PingController {
  public path = '/api';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/ping', this.ping);
  }

  ping = (req: Request, res: Response) => {
    res.send('Success');
  };
}

export default PingController;