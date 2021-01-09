import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import userRoutes from './users.routes';
import sessionRoutes from './sessions.routes';

const router = Router();

router.use('/appointments', appointmentRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);

export default router;
