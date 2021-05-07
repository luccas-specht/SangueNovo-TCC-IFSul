import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '../service/UpdateAvatarService';

export class UpdateController {
  public async updateAvatar(
    request: Request,
    response: Response
  ): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserAvatarService);

    const avatar = await updateUserService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json({ avatar: avatar });
  }
}
