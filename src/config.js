import "dotenv/config.js";

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined.`);
  }
  return value;
}

const config = {
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  bcrypt: {
    salt: parseInt(required("BCRYPT_SALT"), 12),
  },
  jwt: {
    secret: required("JWT_SECRET"),
    expiresIn: required("JWT_EXPIRES_IN", "1d"),
  },
};

export default config;
