import {Router} from 'express';
import {postUser} from '../controllers/user';

const router = Router();

router.post('/signup', postUser);


export default router;


