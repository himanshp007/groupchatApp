import {Router} from 'express';
import {postUser, postLogin} from '../controllers/user';

const router = Router();

router.post('/signup', postUser);
router.post('/login', postLogin);


export default router;


