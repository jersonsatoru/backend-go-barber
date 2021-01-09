import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensure_authenticated';
import CreateUserService from '../services/create_user_service';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const service = new CreateUserService();

    const user = await service.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  } catch (err) {
    return response.status(422).json({ message: err.message });
  }
});

routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      return response.json(true);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
);

export default routes;
