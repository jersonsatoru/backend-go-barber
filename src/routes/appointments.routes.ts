import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/appointment_repositories';
import CreateAppointmentService from '../services/create_appointment_service';
import ensureAuthenticated from '../middlewares/ensure_authenticated';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', async (_, response) => {
  const repo = getCustomRepository(AppointmentsRepository);
  const appointments = await repo.find();
  return response.json(appointments);
});

router.post('/', async (request, response) => {
  const { providerId, date } = request.body;
  const parsedDate = parseISO(date);

  const service = new CreateAppointmentService();
  try {
    const appointment = await service.execute({ providerId, date: parsedDate });
    return response.status(201).json(appointment);
  } catch (err) {
    return response.status(422).json({
      message: err.message,
    });
  }
});

export default router;
