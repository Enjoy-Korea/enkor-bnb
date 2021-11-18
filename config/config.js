require("dotenv").config();
const env = process.env;

const development = {
	username: env.devUsername,
	password: env.devUserPw,
	database: env.devDatabase,
	host: env.devHost,
	dialect: "mysql",
	operatorAliases: false
};

const production = {
	username: env.MYSQL_USERNAME,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE,
	host: env.MYSQL_HOST,
	dialect: "mysql"
	//port: env.MYSQL_PORT
};

const test = {
	username: env.devUsername,
	password: env.devUserPw,
	database: env.devDatabase,
	host: env.devHost,
	dialect: "mysql"
	//port: env.MYSQL_PORT
};

module.exports = { development, production, test };
