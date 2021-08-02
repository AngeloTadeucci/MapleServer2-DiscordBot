const dotenv = require('dotenv');
const client = require('./src/main');

dotenv.config();

client.login(process.env.BOT_TOKEN);
