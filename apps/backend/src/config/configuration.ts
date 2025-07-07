import GLOBAL_ENV from '../../../../packages/constants/globalEnv';

const CONFIG = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  ...GLOBAL_ENV,
};

export default CONFIG;
