import { Router } from 'express';

import { AppointmentsController } from '../controllers/appointmentsController';
import { ensureAuthenticated } from '@modules/users/infra/http/middleware/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {

//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.createAppointment);

export { appointmentsRouter };
