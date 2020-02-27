import winston = require("winston");

declare global {
    namespace NodeJS {
        interface Global {
            logger: winston.Logger;
        }
    }
}