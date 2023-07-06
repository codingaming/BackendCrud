import 'dotenv/config'
export const CONFIG = {
  serverPort:  3000,
  db: {
    url: process.env.DBURL || 'mongodb://127.0.0.1:27017/taskApp',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    key: process.env.jwtSecret ||"secretKey",
    expiresIn: "1h",
  },
  bcrypt: {
    saltRounds: 10,
  }
}
