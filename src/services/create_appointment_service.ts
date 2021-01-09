import startOfHour from 'date-fns/startOfHour';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/appointment_repositories';

interface RequestDTO {
  providerId: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ providerId, date }: RequestDTO): Promise<Appointment> {
    const repo = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const hasAppointmentInSameDate: Appointment | null = await repo.findByDate(
      appointmentDate
    );

    if (hasAppointmentInSameDate) {
      throw new Error('Appointment date already taken');
    }

    const appointment = repo.create({
      providerId,
      date: appointmentDate,
    });

    await repo.save(appointment);

    return appointment;
  }
}
