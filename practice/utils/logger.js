import { createLogger, format, transports, addColors } from "winston";

const {combine, timestamp, colorize, printf} = format;
const logFormat = printf(({ timestamp, level, message }) => ` ${timestamp} ${level} ${message} `);

addColors({
    info: 'blue cyan',
    debug: 'green',
    error: 'red',
    warn: "yellow",

});

const logger = createLogger({
    transports: [
        new transports.File({filename: 'log/combined.log'}),
        new transports.File({filename: 'log/error.log', level: 'error'}),
        new transports.Console({format: combine(logFormat, colorize({all:true}))})
    ],
    format: combine(
        timestamp({
            format: `DD-MM-YYYY HH:mm:ss`
        }),
        logFormat,
        colorize({all:true})
    )
});

export default logger;