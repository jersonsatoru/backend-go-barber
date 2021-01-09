import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/appointment';

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointmentOrNull = await this.findOne({
      where: { date },
    });

    return appointmentOrNull || null;
  }
}
