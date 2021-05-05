import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '../service/UpdateAvatarService';

export class UserController {
  public async updateAvatar(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.body;

    const updateUserService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserService.execute({
      userId,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}
