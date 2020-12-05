import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/createUsersService';
import { UpdateUserAvatarService } from '@modules/users/services/updateUserAvatarServer';

class UserController {
    public async createUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);
        const user = await createUser.execute(
            { name, 
              email, 
              password
             });

        return response.json(user);
    }

    public async updateAvatar(request: Request, response: Response): Promise<Response> {
        const updateUserServer = container.resolve(UpdateUserAvatarService);

        const user = await updateUserServer.execute(
            { user_id: request.user.id, 
              avatarFileName: request.file.filename
            });
    
        return response.json(user);
    }
};

export { UserController };