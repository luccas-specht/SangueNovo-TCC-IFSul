import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/createUsersService';
import { UpdateUserAvatarService } from '@modules/users/services/updateUserAvatarServer';
import { UpdateProfileService } from '@modules/users/services/UpdateProfileService';
import { ShowProfileService } from '@modules/users/services/ShowProfileService';

class UserController {
    public async createUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({ 
            name, 
            email, 
            password
        });

        return response.json(user);
    }

    public async updateAvatar(request: Request, response: Response): Promise<Response> {
        const updateUserService = container.resolve(UpdateUserAvatarService);

        const user = await updateUserService.execute({
            user_id: request.user.id, 
            avatarFileName: request.file.filename
        });
    
        return response.json(user);
    }

    public async updateProfile(request: Request, response: Response): Promise<Response> {
        const { name, password, actualPassword } = request.body;

        const updateProfileService = container.resolve(UpdateProfileService);
        const user = await updateProfileService.execute({
            userId: request.user.id, 
            name: name,
            actualPassword: actualPassword,
            password: password
        });
    
        return response.json(user);
    }

    public async showProfile(request: Request, response: Response): Promise<Response> {
        const showProfileService = container.resolve(ShowProfileService);
        
        const user = await showProfileService.execute({
            userId: request.user.id, 
        });
       
        return response.json(user); 
    }
};

export { UserController };