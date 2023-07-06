import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller.js'
import { validateSignUp } from "../middlewares/signUp.middelware.js";
const router = Router();

router.post('/signin',authCtrl.signIn)


router.post('/signup',[validateSignUp],authCtrl.signUp)
export { router };
