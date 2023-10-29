// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const configs = {
  mongoUrl: process.env.MONGO_DB,
  jwtSecret: process.env.JWT_SECRET,
  saltOrRound: 10,
  host: process.env.HOST
};