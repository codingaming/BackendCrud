import { Router } from "express";
import * as authCtrl from '../controllers/auth.controller.js'
import { validateSignUp,validateSignIn } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/signin',[validateSignIn],authCtrl.signIn)

router.post('/signup',[validateSignUp],authCtrl.signUp)
export { router };
