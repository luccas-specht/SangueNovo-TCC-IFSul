import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '@modules/appointments/service/createAppointmentService';
import { ListProvidersService } from '@modules/appointments/service/ListProvidersService';
class AppointmentsController {
    public async createAppointment(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;
        
        const parsedDate = parseISO(date);
        console.log('parse', parsedDate)

        const createAppointmentService = container.resolve(CreateAppointmentService);

        const appointment = await createAppointmentService.execute({
             provider_id, date: parsedDate
         });

        return response.json(appointment);
    };

    public async listProviders(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id
      
        const listProvidersService = container.resolve(ListProvidersService);

        const providers = await listProvidersService.execute({
            userId: userId
        });

        return response.json(providers);
    };
};

export { AppointmentsController };