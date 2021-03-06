const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
    base: {
        env,
        name: process.env.APP_NAME || 'rest-api-mongo',
        host: process.env.APP_HOST || '0.0.0.0',
        port: process.env.APP_PORT || 8080,
        mongo: {
            url: "mongodb://localhost:27017/truepizza",
            options: {
                bufferMaxEntries:   0,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            dbname: "truepizza"
        }
    },
    production: {
        port: process.env.APP_PORT || 7071,
    },
    development: {},
    test: {
        port: 7072,
    },

};
const config = Object.assign(configs.base, configs[env]);

export {config};
