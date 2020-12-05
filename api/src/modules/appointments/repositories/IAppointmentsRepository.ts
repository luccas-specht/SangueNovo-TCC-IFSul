import { Appointment } from '../infra/typeorm/entities/appointment'

export interface IAppointmentsRepository {
  createAndSave(provider_id: string, date: Date) : Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}