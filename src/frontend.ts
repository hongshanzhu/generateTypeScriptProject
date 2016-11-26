import * as express from 'express';
import * as bodyParser from 'body-parser';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

function errorHandler(req: Request, res: Response, next: NextFunction): void {
  res.status(500).send('can not find service');
}

function success(req: Request, res: express.Response, next: express.NextFunction): void {
  res.status(req.statusCode || 200).send('sucess!');
}
/**
 * Frontend implements Soap-Proxy HTTP API.
 *
 * There should be only one `Frontend` instance in the application.
 */
class Frontend {
  private app: express.Express;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    const router = express.Router();

    router.post('/:serviceName', success);
    this.app.use('/soapproxy', router);

    this.app.get('/health', (req, res) => {
      res.status(200).end();
    });
    this.app.use(errorHandler);
  }

  server(): express.Express {
    return this.app;
  }

}


export { Frontend };
