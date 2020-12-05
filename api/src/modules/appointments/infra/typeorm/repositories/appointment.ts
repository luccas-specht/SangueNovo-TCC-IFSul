import { getRepository, Repository } from 'typeorm';

import { Appointment } from '../entities/appointment';

import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor (){
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
   return await this.ormRepository.findOne({ where: { date } });
  }

  public async createAndSave(provider_id: string, date: Date): Promise<Appointment> {
   const appointment = this.ormRepository.create({ provider_id, date });
   return await this.ormRepository.save(appointment);
  }

};

export { AppointmentRepository };
