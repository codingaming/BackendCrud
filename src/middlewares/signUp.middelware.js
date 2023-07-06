import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import {CONFIG} from '../config.js'

export async function validateSignUp(req, res,next) {
    await body('username').notEmpty().withMessage('username is required').run(req)
    await body('firstName').notEmpty().withMessage('firstName is required').run(req)
    await body('lastName').notEmpty().withMessage('lastName is required').run(req)
    await body('email').isEmail().withMessage('email is required').run(req)
    await body('password').isLength({min: 6}).withMessage('password must be at least 6 characters long').run(req)

    if(!validationResult(req).isEmpty()){
        return res.status(400).json({
            errors: validationResult(req).array()
        })
    }
    return next()

}
