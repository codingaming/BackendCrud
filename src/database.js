import mongoose from 'mongoose'
import { CONFIG } from './config.js'


export const connect = async () => {
    try {
        await mongoose.connect(CONFIG.db.url, CONFIG.db.options)
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}