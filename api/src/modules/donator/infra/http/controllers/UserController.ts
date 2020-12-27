import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDonatorService } from '@modules/donator/services/CreateDonatorService';
import { UpdateDonatorAvatarService } from '@modules/donator/services/UpdateUserAvatarServer';
import { UpdateProfileService } from '@modules/donator/services/UpdateProfileService';
import { ShowProfileService } from '@modules/donator/services/ShowProfileService';

export class DonatorController {

    public async createDonator(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createDonatorService = container.resolve(CreateDonatorService);
        const user = await createDonatorService.execute({ 
            name, 
            email, 
            password
        });

        return response.json(user);
    }

    public async updateAvatar(request: Request, response: Response): Promise<Response> {
        const updateDonatorService = container.resolve(UpdateDonatorAvatarService);

        const user = await updateDonatorService.execute({
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