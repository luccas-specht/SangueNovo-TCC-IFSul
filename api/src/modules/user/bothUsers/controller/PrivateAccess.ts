import { Request, Response } from 'express';

export class PrivateAccess {
  public async createAcess(
    request: Request,
    response: Response
  ): Promise<Response> {
    return response.json().status(201);
  }
}
