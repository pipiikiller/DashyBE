import { cleanEnv, str } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    DATABASE_URL: str(),
    ACCESS_CODE: str(),
  })
}

export default validateEnv
