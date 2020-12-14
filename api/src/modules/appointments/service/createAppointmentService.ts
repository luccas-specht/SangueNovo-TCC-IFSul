import { startOfHour } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import { Appointment } from '../infra/typeorm/entities/appointment';

import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository'

import { AppError } from '@shared/errors/appError';
interface Request {
  provider_id: string;
  date: Date; 
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentsRepository
    ) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
   
    const appointmentDate = startOfHour(date);

    const findAppointmentInSame = await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSame) throw new AppError('horário está ocupado');

    return await this.appointmentRepository.createAndSave(provider_id, appointmentDate);
    
  }
}

export { CreateAppointmentService };
