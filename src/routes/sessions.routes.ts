import { Router } from 'express';
import AuthenticateUserService from '../services/authenticate_user_service';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  try {
    const service = new AuthenticateUserService();
    const { user, token } = await service.execute({ email, password });

    return response.json({
      token,
      user,
    });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default routes;
