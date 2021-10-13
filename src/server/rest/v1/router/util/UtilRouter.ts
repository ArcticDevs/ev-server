/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';

import { ServerRoute } from '../../../../../types/Server';
import { StatusCodes } from 'http-status-codes';

export default class UtilRouter {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRoutePing();
    return this.router;
  }

  protected buildRoutePing(): void {
    this.router.get(`/${ServerRoute.REST_PING}`, async (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(StatusCodes.OK);
    });
  }
}
