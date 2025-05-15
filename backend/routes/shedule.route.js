import {Router} from 'express';
import { add_schedule, delete_schedule, get_schedule_by_class_id, update_schedule } from '../controller/shedule.controller.js';
export const    sheduleRouter = Router();

sheduleRouter.post('/shedule', add_schedule); 
sheduleRouter.delete('/shedule/:id', delete_schedule);
sheduleRouter.put('/shedule', update_schedule);
sheduleRouter.get('/shedule',get_schedule_by_class_id) 


 